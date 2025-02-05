import type { ColorType, Vector2Type } from "../types/vectors.ts";
import type { Font } from "./font.ts";

/**
 * Returntype of createLabelSettings
 *
 * @category Visual
 */
export interface LabelSettings {
  type: "LabelSettings";
  props: LabelSettingsProps;
}

/**
 * Props for createLabelSettings
 *
 * @category Visual
 */
export interface LabelSettingsProps {
  font?: Font;
  font_color?: ColorType;
  font_size?: number;
  line_spacing?: number;
  outline_color?: ColorType;
  outline_size?: number;
  shadow_color?: ColorType;
  shadow_offset?: Vector2Type;
  shadow_size?: number;
}

/**
 * A color transition.
 *
 * @example
 * ```tsx
 * createLabelSettings({ path: "res://icon.svg" })
 * ```
 *
 * @category Visual
 * @see https://docs.godotengine.org/en/stable/classes/class_labelsettings.html
 */
export function createLabelSettings(
  props: LabelSettingsProps = {},
): LabelSettings {
  return {
    type: "LabelSettings",
    props,
  };
}
