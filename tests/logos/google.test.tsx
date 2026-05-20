import { afterEach, describe, expect, it } from "vite-plus/test";
import { GoogleLogo } from "../../src";
import { mount, unmount } from "./test-utils";

describe("GoogleLogo", () => {
  let container: HTMLElement | undefined;

  afterEach(() => {
    unmount(container);
  });

  it("renders the google logo contract", () => {
    container = mount(<GoogleLogo />);
    const svg = container.querySelector("svg")!;

    expect(svg.getAttribute("data-slot")).toBe("icon");
    expect(svg.getAttribute("data-icon")).toBe("GoogleLogo");
    expect(svg.querySelectorAll("circle").length).toBe(4);
  });
});
