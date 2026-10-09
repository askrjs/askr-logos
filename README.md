# @askrjs/logos

[![CI](https://github.com/askrjs/askr-logos/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/askrjs/askr-logos/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/%40askrjs%2Flogos.svg)](https://www.npmjs.com/package/@askrjs/logos)

Thin Askr wrappers for a small set of brand logos.

`@askrjs/logos` keeps brand marks aligned with the shared Askr icon contract.
Use it when you need a known logo rather than a general icon registry.

## Install

```bash
npm install @askrjs/logos @askrjs/askr
```

## Included Logos

- GitHub
- Facebook
- Microsoft
- Apple
- Google

## Use

```tsx
import { FacebookLogo, GitHubLogo, GoogleLogo } from "@askrjs/logos";

export function Header() {
  return (
    <div>
      <FacebookLogo title="Facebook" />
      <GitHubLogo title="GitHub" />
      <GoogleLogo title="Google" size={24} />
    </div>
  );
}
```

Pass a `title` for meaningful branding and omit it when the mark is purely
decorative. The logos inherit the same sizing and accessibility behavior as the
rest of the Askr icon surface.

Apple and GitHub follow the surrounding text color via `currentColor`.
Facebook, Google, and Microsoft keep their brand colors so the marks stay
recognizable.

## 0.5 migration

Import the five curated components by name from `@askrjs/logos`. Individual
`@askrjs/logos/logos/*` paths are removed. Root imports support tree shaking;
a packed GitHub-only consumer is checked to exclude the other four marks.

`createLogo`, `LogoAttribute`, `LogoAttributes`, `LogoNode`, `LogoProps`, and
`LogoTag` are private implementation details in 0.5. Use `IconBase` and
`IconProps` from `@askrjs/askr/foundations/icon` when building or typing a custom
mark. Curated components own their SVG shapes and `data-icon` identity. `title`
controls their decorative/accessibility defaults; an `aria-label` alone does
not make an untitled mark non-decorative.

The complete export decisions and executed hardening matrix are recorded in
[the 0.5 contract review](docs/0.5-contract-review.md).
