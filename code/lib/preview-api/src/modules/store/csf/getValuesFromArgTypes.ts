import type { ArgTypes } from '@storybook/core/dist/modules/types/index';

export const getValuesFromArgTypes = (argTypes: ArgTypes = {}) =>
  Object.entries(argTypes).reduce((acc, [arg, { defaultValue }]) => {
    if (typeof defaultValue !== 'undefined') {
      acc[arg] = defaultValue;
    }
    return acc;
  }, {} as ArgTypes);
