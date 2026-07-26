import type { IconProps } from "@askrjs/askr/foundations/icon";

export type { IconProps } from "@askrjs/askr/foundations/icon";

export type LogoProps = IconProps;

export type LogoTag = "circle" | "ellipse" | "line" | "path" | "polygon" | "polyline" | "rect";

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

export type LogoAttributes = Readonly<Partial<Record<LogoAttribute, string>>>;

export type LogoNode = ReadonlyArray<readonly [tag: LogoTag, attrs: LogoAttributes]>;
