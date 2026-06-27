import { afterEach, describe, expect, it } from "vite-plus/test";
import { AppleLogo } from "../../src";
import { mount, unmount } from "./test-utils";

describe("AppleLogo", () => {
  let container: HTMLElement | undefined;

  afterEach(() => {
    unmount(container);
  });

  it("should render the apple logo contract", () => {
    container = mount(<AppleLogo />);
    const svg = container.querySelector("svg")!;

    expect(svg.getAttribute("data-slot")).toBe("icon");
    expect(svg.getAttribute("data-icon")).toBe("AppleLogo");
    expect(svg.querySelectorAll("path").length).toBe(1);
    expect(svg.querySelector("path")!.getAttribute("fill")).toBe("currentColor");
    expect(svg.querySelector("path")!.getAttribute("d")).toContain(
      "c-.948 0-2.415-1.078-3.96-1.04",
    );
  });
});
