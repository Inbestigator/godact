/**
 * Returntype of createTexture2D
 *
 * @category Shape2D
 */
export interface Texture2D {
  type: "Texture2D";
  props: Texture2DProps;
}

/**
 * Props for createTexture2D
 *
 * @category Node2D
 */
export interface Texture2DProps {
  path: string;
}

/**
 * Texture for 2D and 3D.
 *
 * @example
 * ```tsx
 * <Sprite2D
 *   material={createTexture2D({ path: "res://icon.svg" })}
 * />
 * ```
 *
 * @category Physics
 * @see https://docs.godotengine.org/en/stable/classes/class_texture2d.html
 */
export function createTexture2D(props: Texture2DProps): Texture2D {
  return {
    type: "Texture2D",
    props,
  };
}
