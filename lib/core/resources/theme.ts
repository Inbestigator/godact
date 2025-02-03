/**
 * Returntype of createTheme
 *
 * @category Visual
 */
export interface Theme {
  type: "Theme";
  props: ThemeProps;
}

/**
 * Props for createTheme
 *
 * @category Visual
 */
export interface ThemeProps {
  default_base_scale: number;
  default_font: never; // TODO Font
  default_font_size: number;
}

/**
 * A resource used for styling/skinning Controls and Windows.
 *
 * @example
 * ```tsx
 * createTheme({ default_base_scale: 0.1 });
 * ```
 *
 * @category Visual
 * @see https://docs.godotengine.org/en/stable/classes/class_theme.html
 */
export function createTheme(props: ThemeProps): Theme {
  return {
    type: "Theme",
    props,
  };
}
