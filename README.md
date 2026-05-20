# @askrjs/logos

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
