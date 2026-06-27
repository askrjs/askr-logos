import { jsx as createSvgNode } from "@askrjs/askr/jsx-runtime";
import type { JSXElement } from "@askrjs/askr/jsx-runtime";
import { IconBase } from "@askrjs/askr/foundations/icon";
import type { LogoNode, LogoProps } from "./types";

const createDynamicSvgNode = createSvgNode as (
  type: string,
  props: Record<string, unknown>,
  key?: string | number,
) => JSXElement;

export function createLogo(displayName: string, logoNode: LogoNode) {
  function Logo(props: LogoProps) {
    return IconBase({
      ...props,
      iconName: displayName,
      children: logoNode.map(([tag, attrs], index) =>
        createDynamicSvgNode(tag, attrs as Record<string, unknown>, index),
      ),
    });
  }

  Logo.displayName = displayName;
  return Logo;
}
