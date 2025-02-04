import { PackedArray, type PackedArrayType } from "../../types/packed-array.ts";
import type { Vector2Type } from "../../types/vectors.ts";

/**
 * Returntype of createConvexPolygonShape2D
 *
 * @category Shape2D
 */
export interface ConvexPolygonShape2D {
  type: "ConvexPolygonShape2D";
  props: {
    points: PackedArrayType<Vector2Type>;
  };
}

/**
 * A 2D convex polygon shape used for physics collision.
 *
 * @example
 * ```tsx
 * <CollisionShape2D
 *   shape={createConvexPolygonShape2D(Vector2(1, 2), Vector2(3, 4))}
 * />
 * ```
 *
 * @category Shape2D
 * @see https://docs.godotengine.org/en/stable/classes/class_convexpolygonshape2d.html
 */
export function createConvexPolygonShape2D(
  ...points: Vector2Type[]
): ConvexPolygonShape2D {
  return {
    type: "ConvexPolygonShape2D",
    props: { points: PackedArray<Vector2Type>(...points) },
  };
}
