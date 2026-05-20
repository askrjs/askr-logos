import { defineConfig } from "vite-plus";

const externalPackagePattern = /^@askrjs\/askr(?:\/.*)?$/;

export default defineConfig({
  pack: {
    dts: true,
    deps: {
      neverBundle: [externalPackagePattern],
    },
    entry: [
      "src/index.ts",
      "src/logos/apple.tsx",
      "src/logos/facebook.tsx",
      "src/logos/github.tsx",
      "src/logos/google.tsx",
      "src/logos/microsoft.tsx",
    ],
    format: ["esm"],
    outDir: "dist",
    platform: "neutral",
    sourcemap: true,
    unbundle: true,
  },
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "@askrjs/askr",
  },
  build: {
    minify: false,
    sourcemap: true,
    lib: {
      entry: "src/index.ts",
    },
    rollupOptions: {
      external: (id) => externalPackagePattern.test(id),
      output: [
        {
          dir: "dist",
          entryFileNames: "[name].js",
          exports: "named",
          format: "es",
          preserveModules: true,
          preserveModulesRoot: "src",
        },
      ],
    },
  },
});
