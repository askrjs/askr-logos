import { afterEach, describe, expect, it } from "vite-plus/test";
import { MicrosoftLogo } from "../../src";
import { mount, unmount } from "./test-utils";

describe("MicrosoftLogo", () => {
  let container: HTMLElement | undefined;

  afterEach(() => {
    unmount(container);
  });

  it("renders the microsoft logo contract", () => {
    container = mount(<MicrosoftLogo />);
    const svg = container.querySelector("svg")!;

    expect(svg.getAttribute("data-slot")).toBe("icon");
    expect(svg.getAttribute("data-icon")).toBe("MicrosoftLogo");
    expect(svg.querySelectorAll("rect").length).toBe(4);
  });
});
