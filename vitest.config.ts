import { defineConfig } from "vite-plus";

export default defineConfig({
  optimizeDeps: {
    include: ["@askrjs/askr", "@askrjs/askr/jsx-runtime", "@askrjs/askr/jsx-dev-runtime"],
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["tests/**/*.test.{ts,tsx}"],
  },
  oxc: {
    jsx: {
      runtime: "automatic",
      importSource: "@askrjs/askr",
    },
    jsxInject: "import { jsx, jsxs, Fragment } from '@askrjs/askr/jsx-runtime';",
  },
});
