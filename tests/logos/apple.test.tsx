import { afterEach, describe, expect, it } from "vite-plus/test";
import { AppleLogo } from "../../src";
import { mount, unmount } from "./test-utils";

describe("AppleLogo", () => {
  let container: HTMLElement | undefined;

  afterEach(() => {
    unmount(container);
  });

  it("renders the apple logo contract", () => {
    container = mount(<AppleLogo />);
    const svg = container.querySelector("svg")!;

    expect(svg.getAttribute("data-slot")).toBe("icon");
    expect(svg.getAttribute("data-icon")).toBe("AppleLogo");
    expect(svg.querySelectorAll("path").length).toBeGreaterThanOrEqual(2);
  });
});
