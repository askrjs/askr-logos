import type { IconProps } from "@askrjs/askr/foundations/icon";

export type { IconProps } from "@askrjs/askr/foundations/icon";

/** Props accepted by logo components; identical to {@link IconProps}. */
export type LogoProps = IconProps;

/** SVG element tags permitted inside a {@link LogoNode}. */
export type LogoTag = "circle" | "ellipse" | "line" | "path" | "polygon" | "polyline" | "rect";

/** SVG attribute names permitted on the elements of a {@link LogoNode}. */
export type LogoAttribute =
  | "clipRule"
  | "cx"
  | "cy"
  | "d"
  | "fill"
  | "fillRule"
  | "height"
  | "opacity"
  | "points"
  | "r"
  | "rx"
  | "ry"
  | "stroke"
  | "strokeWidth"
  | "transform"
  | "width"
  | "x"
  | "x1"
  | "x2"
  | "y"
  | "y1"
  | "y2";

/** Map of allowed SVG attribute values, keyed by {@link LogoAttribute}. */
export type LogoAttributes = Readonly<Partial<Record<LogoAttribute, string>>>;

/** Ordered list of `[tag, attributes]` pairs describing a logo's SVG shapes. */
export type LogoNode = ReadonlyArray<readonly [tag: LogoTag, attrs: LogoAttributes]>;
