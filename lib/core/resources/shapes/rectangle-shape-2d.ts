import type { Vector2Type } from "../../types/vectors.ts";

/**
 * Returntype of createRectangleShape2D
 *
 * @category Shape2D
 */
export interface RectangleShape2D {
  type: "RectangleShape2D";
  props: {
    size?: Vector2Type;
  };
}

/**
 * A 2D rectangle shape used for physics collision.
 *
 * @example
 * ```tsx
 * <CollisionShape2D
 *   shape={createRectangleShape2D({ size: Vector2(2, 3) })}
 * />
 * ```
 *
 * @category Shape2D
 * @see https://docs.godotengine.org/en/stable/classes/class_rectangleshape2d.html
 */
export function createRectangleShape2D(
  size?: Vector2Type,
): RectangleShape2D {
  return {
    type: "RectangleShape2D",
    props: { size },
  };
}
