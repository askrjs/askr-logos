import {
  Fragment,
  jsx as createSvgNode,
  jsxs as createSvgFragment,
} from "@askrjs/askr/jsx-runtime";
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
    const children = createSvgFragment(Fragment, {
      children: logoNode.map(([tag, attrs], index) =>
        createDynamicSvgNode(tag, attrs as Record<string, unknown>, index),
      ),
    });

    return IconBase({
      ...props,
      iconName: displayName,
      children,
    });
  }

  Logo.displayName = displayName;
  return Logo;
}
