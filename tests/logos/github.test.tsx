import { afterEach, describe, expect, it } from "vite-plus/test";
import { GitHubLogo } from "../../src";
import { mount, unmount } from "./test-utils";

describe("GitHubLogo", () => {
  let container: HTMLElement | undefined;

  afterEach(() => {
    unmount(container);
  });

  it("renders the github logo contract", () => {
    container = mount(<GitHubLogo />);
    const svg = container.querySelector("svg")!;

    expect(svg.getAttribute("data-slot")).toBe("icon");
    expect(svg.getAttribute("data-icon")).toBe("GitHubLogo");
    expect(svg.getAttribute("aria-hidden")).toBe("true");
  });
});
