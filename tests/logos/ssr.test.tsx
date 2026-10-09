import { renderToStringSync } from "@askrjs/askr/ssr";
import { afterEach, describe, expect, it } from "vite-plus/test";
import type { IconProps } from "@askrjs/askr/foundations/icon";
import { AppleLogo, FacebookLogo, GitHubLogo, GoogleLogo, MicrosoftLogo } from "../../src";
import { mount, unmount } from "./test-utils";

describe("logo SSR", () => {
  let container: HTMLElement | undefined;
  afterEach(() => unmount(container));

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

  it.each([
    { props: { "aria-label": "Custom brand", "aria-hidden": false }, hidden: "true", title: null },
    {
      props: { title: "Brand", "aria-label": "Custom label", "aria-hidden": true },
      hidden: null,
      title: "Brand",
    },
    { props: { title: "", "aria-hidden": false }, hidden: "true", title: null },
    {
      props: { title: '<brand & "name">', "data-note": '<note & "value">' },
      hidden: null,
      title: '<brand & "name">',
    },
  ])(
    "should match client and server accessibility and escaped attribute contracts",
    ({ props, hidden, title }) => {
      container = mount(<GitHubLogo {...props} />);
      const client = container.querySelector("svg")!;
      const serverContainer = document.createElement("div");
      serverContainer.innerHTML = renderToStringSync(() => <GitHubLogo {...props} />);
      const server = serverContainer.querySelector("svg")!;
      for (const svg of [client, server]) {
        expect(svg.namespaceURI).toBe("http://www.w3.org/2000/svg");
        expect(svg.getAttribute("role")).toBe("img");
        expect(svg.getAttribute("aria-hidden")).toBe(hidden);
        expect(svg.querySelector("title")?.textContent ?? null).toBe(title);
        expect(svg.getAttribute("aria-label")).toBe(props["aria-label"] ?? null);
        expect(svg.getAttribute("data-note")).toBe(props["data-note"] ?? null);
        expect(svg.querySelectorAll("path")).toHaveLength(1);
      }
    },
  );

  it("should forward class, style, ref and custom attributes while retaining logo-owned metadata", () => {
    let ref: SVGSVGElement | null = null;
    const props: IconProps = {
      class: "brand-mark",
      style: { marginInlineStart: "4px", opacity: 0.5 },
      ref: (element) => {
        ref = element;
      },
      "data-note": "brand",
      "data-icon": "override",
      xmlns: "invalid",
      iconName: "override",
      children: "override",
    };
    container = mount(<GoogleLogo {...props} />);
    const svg = container.querySelector("svg")!;
    expect(ref).toBe(svg);
    expect(svg.getAttribute("class")).toBe("brand-mark");
    expect(svg.style.marginInlineStart).toBe("4px");
    expect(svg.style.opacity).toBe("0.5");
    expect(svg.getAttribute("data-note")).toBe("brand");
    expect(svg.getAttribute("data-icon")).toBe("GoogleLogo");
    expect(svg.getAttribute("xmlns")).toBe("http://www.w3.org/2000/svg");
    expect(svg.textContent).not.toContain("override");
    expect(svg.querySelectorAll("path")).toHaveLength(4);
  });
});
