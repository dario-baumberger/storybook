import React, { FunctionComponent, useEffect } from 'react';
import { document, window } from 'global';
import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider, ensure as ensureTheme } from '@storybook/theming';
import { DocsWrapper, DocsContent } from '@storybook/components';
import { components as htmlComponents } from '@storybook/components/html';
import { DocsContextProps, DocsContext } from './DocsContext';
import { anchorBlockIdFromId } from './Anchor';
import { storyBlockIdFromId } from './Story';
import { CodeOrSourceMdx, AnchorMdx } from './mdx';
import { scrollToElement } from './utils';

interface DocsContainerProps {
  context: DocsContextProps;
}

const defaultComponents = {
  ...htmlComponents,
  code: CodeOrSourceMdx,
  a: AnchorMdx,
};

export const DocsContainer: FunctionComponent<DocsContainerProps> = ({ context, children }) => {
  const { id: storyId = null, parameters = {} } = context || {};
  const options = parameters.options || {};
  const theme = ensureTheme(options.theme);
  const { components: userComponents = null } = parameters.docs || {};
  const allComponents = { ...defaultComponents, ...userComponents };

  useEffect(() => {
    const url = new URL(window.parent.location);
    if (url.hash) {
      const element = document.getElementById(url.hash.substring(1));
      if (element) {
        scrollToElement(element);
      }
    } else {
      let element = document.getElementById(anchorBlockIdFromId(storyId));
      if (!element) {
        element = document.getElementById(storyBlockIdFromId(storyId));
      }
      if (element) {
        const allStories = element.parentElement.querySelectorAll('[id|="anchor-"]');
        let block = 'start';
        if (allStories && allStories[0] === element) {
          block = 'end'; // first story should be shown with the intro content above
        }
        scrollToElement(element, block);
      }
    }
  }, [storyId]);

  return (
    <DocsContext.Provider value={context}>
      <ThemeProvider theme={theme}>
        <MDXProvider components={allComponents}>
          <DocsWrapper className="sbdocs sbdocs-wrapper">
            <DocsContent className="sbdocs sbdocs-content">{children}</DocsContent>
          </DocsWrapper>
        </MDXProvider>
      </ThemeProvider>
    </DocsContext.Provider>
  );
};
