/**
 * Returntype of createTexture2D
 *
 * @category Visual
 */
export interface Texture2D {
  type: "Texture2D";
  props: { path: string };
}

/**
 * Texture for 2D and 3D.
 *
 * @example
 * ```tsx
 * createTexture2D("res://icon.svg")
 * ```
 *
 * @category Visual
 * @see https://docs.godotengine.org/en/stable/classes/class_texture2d.html
 */
export function createTexture2D(path: string): Texture2D {
  return {
    type: "Texture2D",
    props: { path },
  };
}
