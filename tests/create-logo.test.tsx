import { afterEach, describe, expect, it } from "vite-plus/test";
import { createLogo, type LogoNode } from "../src";
import { mount, unmount } from "./logos/test-utils";

describe("createLogo", () => {
  let container: HTMLElement | undefined;

  afterEach(() => {
    unmount(container);
  });

  it.each([
    [["script", {}]],
    [["path", { onload: "alert(1)" }]],
    [["path", { href: "javascript:alert(1)" }]],
    [["path", { fill: "url(https://attacker.test/image.svg#paint)" }]],
  ])("should reject executable SVG node definitions", (node) => {
    expect(() => createLogo("HostileLogo", node as unknown as LogoNode)).toThrow(
      /Unsupported logo SVG|URL reference/,
    );
  });

  it("should copy validated definitions before rendering", () => {
    const attrs: Record<string, string> = {
      d: "M0 0h24v24H0z",
      fill: "currentColor",
    };
    const SafeLogo = createLogo("SafeLogo", [["path", attrs]] as LogoNode);
    attrs.onload = "alert(1)";

    container = mount(<SafeLogo />);
    const path = container.querySelector("path");
    expect(path?.getAttribute("d")).toBe("M0 0h24v24H0z");
    expect(path?.getAttribute("onload")).toBeNull();
  });
});
