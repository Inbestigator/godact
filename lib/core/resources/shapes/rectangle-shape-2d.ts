import type { Shape2DProps } from "./shape-2d.ts";

/**
 * Returntype of createRectangleShape2D()
 *
 * @category Shape2D
 */
export interface RectangleShape2D {
  type: "RectangleShape2D";
  props: RectangleShape2DProps;
}

/**
 * Props for a CollisionShape2D
 *
 * @category Node2D
 */
export interface RectangleShape2DProps extends Shape2DProps {}

/**
 * A 2D rectangle shape used for physics collision.
 *
 * ```tsx
 * <CollisionShape2D
 *   shape={createRectangleShape2D({ size: [2, 3] })}
 * />
 * ```
 *
 * @category Shape2D
 * @see https://docs.godotengine.org/en/stable/classes/class_rectangleshape2d.html
 */
export function createRectangleShape2D(
  props: RectangleShape2DProps,
): RectangleShape2D {
  return {
    type: "RectangleShape2D",
    props,
  };
}
