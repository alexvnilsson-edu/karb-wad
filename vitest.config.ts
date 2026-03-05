// Learn more about Vitest configuration options at https://vitest.dev/config/

import path from 'path';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  test: {
    globals: true,
    browser: {
      provider: playwright(),
      enabled: true,
      instances: [{ browser: 'chromium' }],
    },
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'src/app'),
    },
  },
});
