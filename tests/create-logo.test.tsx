import { afterEach, describe, expect, it } from "vite-plus/test";
import { createLogo, type LogoNode } from "../src";
import { mount, unmount } from "./logos/test-utils";

describe("createLogo", () => {
  let container: HTMLElement | undefined;

  afterEach(() => {
    unmount(container);
  });

  it.each([
    { node: [["script", {}]] },
    { node: [["path", { onload: "alert(1)" }]] },
    { node: [["path", { href: "javascript:alert(1)" }]] },
    { node: [["path", { fill: "url(https://attacker.test/image.svg#paint)" }]] },
    { node: [["rect", { width: 24 }]] },
  ])("should reject executable SVG node definitions", ({ node }) => {
    expect(() => createLogo("HostileLogo", node as unknown as LogoNode)).toThrow(
      /HostileLogo.*(?:unsupported logo SVG|URL reference|must be a string)/i,
    );
  });

  it.each([null, [["path"]], [["path", null]], [["path", []]]])(
    "should identify the logo when rejecting malformed definitions",
    (node) => {
      expect(() => createLogo("BrokenBrandLogo", node as unknown as LogoNode)).toThrow(
        /BrokenBrandLogo/,
      );
    },
  );

  it("should accept every supported SVG tag and attribute", () => {
    const tags = ["circle", "ellipse", "line", "path", "polygon", "polyline", "rect"];
    const attributes = [
      "clipRule",
      "cx",
      "cy",
      "d",
      "fill",
      "fillRule",
      "height",
      "opacity",
      "points",
      "r",
      "rx",
      "ry",
      "stroke",
      "strokeWidth",
      "transform",
      "width",
      "x",
      "x1",
      "x2",
      "y",
      "y1",
      "y2",
    ];
    const node = tags.map((tag, index) => [
      tag,
      Object.fromEntries(attributes.map((attribute) => [attribute, String(index)])),
    ]);
    expect(() => createLogo("CompleteLogo", node as LogoNode)).not.toThrow();
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

  it("should render many instances without shared props or SVG children", () => {
    const ManyLogo = createLogo("ManyLogo", [["circle", { cx: "12", cy: "12", r: "10" }]]);
    container = mount(
      <div>
        {Array.from({ length: 100 }, (_, index) => (
          <ManyLogo title={`Brand ${index}`} data-instance={String(index)} />
        ))}
      </div>,
    );
    const logos = [...container.querySelectorAll("svg")];
    expect(logos).toHaveLength(100);
    expect(logos[0].getAttribute("data-instance")).toBe("0");
    expect(logos[99].getAttribute("data-instance")).toBe("99");
    expect(logos[0].querySelector("title")?.textContent).toBe("Brand 0");
    expect(logos[99].querySelector("title")?.textContent).toBe("Brand 99");
    expect(new Set(logos.map((logo) => logo.querySelector("circle"))).size).toBe(100);
  });
});
