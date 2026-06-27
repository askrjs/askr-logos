import { renderToStringSync } from "@askrjs/askr/ssr";
import { describe, expect, it } from "vite-plus/test";
import { AppleLogo, FacebookLogo, GitHubLogo, GoogleLogo, MicrosoftLogo } from "../../src";

describe("logo SSR", () => {
  it("should preserve logo nodes when rendering titled icons", () => {
    const cases = [
      { name: "AppleLogo", Logo: AppleLogo, node: "<path" },
      { name: "FacebookLogo", Logo: FacebookLogo, node: "<path" },
      { name: "GitHubLogo", Logo: GitHubLogo, node: "<path" },
      { name: "GoogleLogo", Logo: GoogleLogo, node: 'fill="#4285F4"' },
      { name: "MicrosoftLogo", Logo: MicrosoftLogo, node: "<rect" },
    ];

    for (const { name, Logo, node } of cases) {
      const html = renderToStringSync(() => <Logo title={name} />);

      expect(html).toContain(`<title>${name}</title>`);
      expect(html).toContain(node);
    }
  });
});
