import {
  Fragment,
  jsx as createSvgNode,
  jsxs as createSvgFragment,
} from "@askrjs/askr/jsx-runtime";
import type { JSXElement } from "@askrjs/askr/jsx-runtime";
import { IconBase } from "@askrjs/askr/foundations/icon";
import type { LogoAttribute, LogoNode, LogoProps, LogoTag } from "./types";

const createDynamicSvgNode = createSvgNode as (
  type: string,
  props: Record<string, unknown>,
  key?: string | number,
) => JSXElement;

const SAFE_TAGS = new Set<LogoTag>([
  "circle",
  "ellipse",
  "line",
  "path",
  "polygon",
  "polyline",
  "rect",
]);
const SAFE_ATTRIBUTES = new Set<LogoAttribute>([
  "clipRule",
  "cx",
  "cy",
  "d",
  "fill",
  "fillRule",
  "height",
  "opacity",
  "points",
  "r",
  "rx",
  "ry",
  "stroke",
  "strokeWidth",
  "transform",
  "width",
  "x",
  "x1",
  "x2",
  "y",
  "y1",
  "y2",
]);

function safeLogoNode(logoNode: LogoNode): LogoNode {
  return Object.freeze(
    logoNode.map(([tag, attrs]) => {
      if (!SAFE_TAGS.has(tag)) {
        throw new TypeError(`Unsupported logo SVG tag: ${tag}`);
      }
      const safeAttrs: Record<string, string> = {};
      for (const [name, value] of Object.entries(attrs)) {
        if (!SAFE_ATTRIBUTES.has(name as LogoAttribute)) {
          throw new TypeError(`Unsupported logo SVG attribute: ${name}`);
        }
        if ((name === "fill" || name === "stroke") && /\burl\s*\(/i.test(value)) {
          throw new TypeError(`Logo SVG ${name} cannot contain a URL reference.`);
        }
        safeAttrs[name] = value;
      }
      return Object.freeze([tag, Object.freeze(safeAttrs)] as const);
    }),
  );
}

export function createLogo(displayName: string, logoNode: LogoNode) {
  const safeNode = safeLogoNode(logoNode);
  function Logo(props: LogoProps) {
    const children = createSvgFragment(Fragment, {
      children: safeNode.map(([tag, attrs], index) =>
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
