# @askrjs/logos

Manual Askr components for a small set of brand logos.

## Included logos

- GitHub
- Facebook
- Microsoft
- Apple
- Google

## Usage

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

Each logo is a thin wrapper around `@askrjs/askr`'s icon contract, so it keeps the same sizing and accessibility behavior as the rest of the Askr icon surface.

Apple and GitHub follow the surrounding text color via `currentColor`. Facebook, Google, and Microsoft keep their brand colors so the marks stay recognizable.
