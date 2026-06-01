import assert from "node:assert/strict";

const rootModule = await import("@askrjs/logos");

for (const exportName of [
  "createLogo",
  "AppleLogo",
  "FacebookLogo",
  "GitHubLogo",
  "GoogleLogo",
  "MicrosoftLogo",
]) {
  assert.equal(
    typeof rootModule[exportName],
    "function",
    `${exportName} should be exported from @askrjs/logos`,
  );
}

for (const [exportName, specifier] of [
  ["AppleLogo", "@askrjs/logos/logos/apple"],
  ["FacebookLogo", "@askrjs/logos/logos/facebook"],
  ["GitHubLogo", "@askrjs/logos/logos/github"],
  ["GoogleLogo", "@askrjs/logos/logos/google"],
  ["MicrosoftLogo", "@askrjs/logos/logos/microsoft"],
]) {
  const logoModule = await import(specifier);

  assert.equal(
    typeof logoModule[exportName],
    "function",
    `${specifier} should export ${exportName}`,
  );
  assert.equal(
    logoModule[exportName].displayName,
    exportName,
    `${specifier} should preserve ${exportName} displayName`,
  );
}
