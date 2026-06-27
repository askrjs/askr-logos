import { afterEach, describe, expect, it } from "vite-plus/test";
import { GoogleLogo } from "../../src";
import { mount, unmount } from "./test-utils";

describe("GoogleLogo", () => {
  let container: HTMLElement | undefined;

  afterEach(() => {
    unmount(container);
  });

  it("should render the google logo contract", () => {
    container = mount(<GoogleLogo />);
    const svg = container.querySelector("svg")!;

    expect(svg.getAttribute("data-slot")).toBe("icon");
    expect(svg.getAttribute("data-icon")).toBe("GoogleLogo");
    expect(svg.querySelectorAll("path").length).toBe(4);
    expect(
      Array.from(svg.querySelectorAll("path")).map((path) => path.getAttribute("fill")),
    ).toEqual(["#4285F4", "#34A853", "#FBBC05", "#EA4335"]);
  });
});
