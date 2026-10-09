# Changelog

## [Unreleased]

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
