import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import { readPackRecord } from "./pack-result.js";

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const result = readPackRecord(
  JSON.parse(
    execFileSync(npm, ["pack", "--ignore-scripts", "--dry-run", "--json"], {
      encoding: "utf8",
    }),
  ),
);

const packedFiles = new Set(result.files.map(({ path }) => normalize(path)));
const sourceMappingPattern = /[#@]\s*sourceMappingURL=([^\s*]+)/gu;

for (const file of result.files) {
  if (!/\.(?:css|d\.ts|js)$/u.test(file.path)) continue;

  const source = readFileSync(file.path, "utf8");
  for (const match of source.matchAll(sourceMappingPattern)) {
    const reference = match[1];
    if (reference.startsWith("data:")) continue;
    if (/^[a-z][a-z\d+.-]*:/iu.test(reference)) {
      throw new Error(`${file.path} references external source map ${reference}.`);
    }

    const mapPath = normalize(join(dirname(file.path), decodeURIComponent(reference)));
    if (!packedFiles.has(mapPath)) {
      throw new Error(`${file.path} references missing packed source map ${mapPath}.`);
    }
  }
}
