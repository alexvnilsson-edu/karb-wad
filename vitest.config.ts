// Learn more about Vitest configuration options at https://vitest.dev/config/

import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true
  },
  resolve: {
    alias: {
      "app": path.resolve(__dirname, "src/app")
    }
  }
});
