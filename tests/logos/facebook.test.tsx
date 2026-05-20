import { afterEach, describe, expect, it } from "vite-plus/test";
import { FacebookLogo } from "../../src";
import { mount, unmount } from "./test-utils";

describe("FacebookLogo", () => {
  let container: HTMLElement | undefined;

  afterEach(() => {
    unmount(container);
  });

  it("renders the facebook logo contract", () => {
    container = mount(<FacebookLogo />);
    const svg = container.querySelector("svg")!;

    expect(svg.getAttribute("data-slot")).toBe("icon");
    expect(svg.getAttribute("data-icon")).toBe("FacebookLogo");
    expect(svg.querySelectorAll("path").length).toBe(1);
    expect(svg.querySelector("path")!.getAttribute("fill")).toBe("#0866FF");
  });
});
