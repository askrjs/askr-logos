import type { IconProps } from "@askrjs/askr/foundations/icon";

export type { IconProps } from "@askrjs/askr/foundations/icon";

export type LogoProps = IconProps;

export type LogoNode = ReadonlyArray<
  readonly [tag: string, attrs: Readonly<Record<string, string>>]
>;
