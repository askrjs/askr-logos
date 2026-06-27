import { afterEach, describe, expect, it } from "vite-plus/test";
import { MicrosoftLogo } from "../../src";
import { mount, unmount } from "./test-utils";

describe("MicrosoftLogo", () => {
  let container: HTMLElement | undefined;

  afterEach(() => {
    unmount(container);
  });

  it("should render the microsoft logo contract", () => {
    container = mount(<MicrosoftLogo />);
    const svg = container.querySelector("svg")!;

    expect(svg.getAttribute("data-slot")).toBe("icon");
    expect(svg.getAttribute("data-icon")).toBe("MicrosoftLogo");
    expect(svg.querySelectorAll("rect").length).toBe(4);
    expect(Array.from(svg.querySelectorAll("rect")).map((rect) => rect.getAttribute("rx"))).toEqual(
      [null, null, null, null],
    );
    expect(
      Array.from(svg.querySelectorAll("rect")).map((rect) => rect.getAttribute("fill")),
    ).toEqual(["#f25022", "#7fba00", "#00a4ef", "#ffb900"]);
  });
});
