# Changelog

## [Unreleased]

## [0.5.0] - 2026-10-10

### Removed

- **Breaking for 0.5:** remove the `./logos/*` import paths. Import
  `AppleLogo`, `FacebookLogo`, `GitHubLogo`, `GoogleLogo`, and `MicrosoftLogo`
  by name from `@askrjs/logos`; root imports support tree shaking.
- **Breaking for 0.5:** make `createLogo`, `LogoAttribute`, `LogoAttributes`,
  `LogoNode`, `LogoProps`, and `LogoTag` private. Use `IconBase` and `IconProps`
  from `@askrjs/askr/foundations/icon` for custom wrappers and prop annotations.

### Changed

- Qualify the curated runtime and type surface from an installed tarball,
  including rejected deep imports and a GitHub-only tree-shaken bundle.
- Extend SVG sanitization, accessibility precedence, class/style/ref forwarding,
  and server/client parity coverage. The probes found no runtime defect.

### Development

- Refresh the locked development toolchain within its existing ranges: Vite+ 0.3.3 uses patched Tinypool 2.1.2, and source-map-js resolves to 1.2.2. Package runtime dependencies and public contracts are unchanged.

- First-party development workflows use Vite+; specialized compiler, runtime,
  browser, and package checks remain part of validation.
