/**
 * Returntype of createFont
 *
 * @category Visual
 */
export interface Font {
  type: "Font";
  props: {
    path: string;
  };
}

/**
 * A font resource.
 *
 * @example
 * ```tsx
 * createFont("res://myfont.tres")
 * ```
 *
 * @category Control
 * @see https://docs.godotengine.org/en/stable/classes/class_font.html
 */
export function createFont(path: string): Font {
  return {
    type: "Font",
    props: { path },
  };
}
