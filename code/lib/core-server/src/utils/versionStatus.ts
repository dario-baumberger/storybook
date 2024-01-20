import type { VersionCheck } from '@storybook/core/dist/modules/types/index';

export const versionStatus = (versionCheck: VersionCheck) => {
  if (versionCheck.error) return 'error';
  if (versionCheck.cached) return 'cached';
  return 'success';
};
