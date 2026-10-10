import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { build } from "vite-plus";

const names = ["AppleLogo", "FacebookLogo", "GitHubLogo", "GoogleLogo", "MicrosoftLogo"];
const manifest = JSON.parse(readFileSync("package.json", "utf8"));
assert.deepEqual(Object.keys(manifest.exports).sort(), [".", "./package.json"]);
const npmCli = process.env.npm_execpath;
assert.ok(npmCli, "Run the packed consumer through npm run test:exports");
const runNpm = (args, options) => execFileSync(process.execPath, [npmCli, ...args], options);
const root = mkdtempSync(join(tmpdir(), "askr-logos-packed-"));
try {
  runNpm(["pack", "--ignore-scripts", "--pack-destination", root], { stdio: "pipe" });
  const archives = readdirSync(root).filter((file) => file.endsWith(".tgz"));
  assert.equal(archives.length, 1);
  const consumer = join(root, "consumer");
  mkdirSync(consumer);
  const floor = /^>=([^ ]+)/.exec(manifest.peerDependencies["@askrjs/askr"])?.[1];
  assert.ok(floor, "The packed consumer needs an explicit Askr peer floor");
  writeFileSync(
    join(consumer, "package.json"),
    JSON.stringify({
      name: "logos-packed-consumer",
      private: true,
      type: "module",
      dependencies: { "@askrjs/logos": `file:${join(root, archives[0])}`, "@askrjs/askr": floor },
    }),
  );
  runNpm(["install", "--no-audit", "--no-fund"], {
    cwd: consumer,
    stdio: "pipe",
  });
  writeFileSync(
    join(consumer, "runtime.mjs"),
    `
import assert from "node:assert/strict";
import * as logos from "@askrjs/logos";
import { renderToStringSync } from "@askrjs/askr/ssr";
import manifest from "@askrjs/logos/package.json" with { type: "json" };
assert.equal(manifest.name, "@askrjs/logos");
const names = ${JSON.stringify(names)};
assert.deepEqual(Object.keys(logos).sort(), names);
for (const name of names) {
  assert.equal(typeof logos[name], "function");
  assert.equal(logos[name].displayName, name);
  const html = renderToStringSync(() => logos[name]({ title: name }));
  assert.ok(html.includes("<svg") && html.includes("<title>" + name + "</title>"));
}
for (const path of ["logos/apple", "logos/facebook", "logos/github", "logos/google", "logos/microsoft", "dist/create-logo.js", "create-logo"]) {
  await assert.rejects(import("@askrjs/logos/" + path), { code: "ERR_PACKAGE_PATH_NOT_EXPORTED" });
}
`,
  );
  execFileSync(process.execPath, ["runtime.mjs"], { cwd: consumer, stdio: "inherit" });
  writeFileSync(
    join(consumer, "types.ts"),
    `
import { AppleLogo, FacebookLogo, GitHubLogo, GoogleLogo, MicrosoftLogo } from "@askrjs/logos";
import type { IconProps } from "@askrjs/askr/foundations/icon";
const props: IconProps = { title: "Brand", class: "mark", size: "lg" };
for (const Logo of [AppleLogo, FacebookLogo, GitHubLogo, GoogleLogo, MicrosoftLogo]) Logo(props);
// @ts-expect-error factory is private in 0.5
import { createLogo } from "@askrjs/logos";
// @ts-expect-error shape and duplicate prop aliases are private in 0.5
import type { LogoAttribute, LogoAttributes, LogoNode, LogoProps, LogoTag } from "@askrjs/logos";
// @ts-expect-error duplicate deep paths are not public in 0.5
import { GitHubLogo as DeepLogo } from "@askrjs/logos/logos/github";
`,
  );
  writeFileSync(
    join(consumer, "tsconfig.json"),
    JSON.stringify({
      compilerOptions: {
        target: "ES2022",
        module: "ESNext",
        moduleResolution: "Bundler",
        strict: true,
        skipLibCheck: true,
        noEmit: true,
        types: [],
      },
      files: ["types.ts"],
    }),
  );
  execFileSync(
    process.execPath,
    [resolve("node_modules/typescript/bin/tsc"), "-p", join(consumer, "tsconfig.json")],
    { stdio: "inherit" },
  );
  writeFileSync(join(consumer, "entry.js"), 'export { GitHubLogo } from "@askrjs/logos";');
  const result = await build({
    root: consumer,
    configFile: false,
    logLevel: "silent",
    build: {
      write: false,
      minify: false,
      lib: { entry: join(consumer, "entry.js"), formats: ["es"] },
      rollupOptions: { external: (id) => /^@askrjs\/askr(?:\/|$)/.test(id) },
    },
  });
  const output = (Array.isArray(result) ? result : [result]).flatMap((bundle) => bundle.output);
  const code = output
    .filter((chunk) => chunk.type === "chunk")
    .map((chunk) => chunk.code)
    .join(String.fromCharCode(10));
  assert.ok(code.includes("GitHubLogo"), "The chosen logo must remain in the consumer bundle");
  for (const name of names.filter((name) => name !== "GitHubLogo"))
    assert.ok(!code.includes(name), `${name} must tree-shake out of a GitHub-only consumer`);
  console.log("Packed logo runtime, types, removed paths, and root-import tree shaking passed.");
} finally {
  rmSync(root, { recursive: true, force: true });
}
