import { PackedArray, type PackedArrayType } from "../../types/packed-array.ts";
import type { Vector2Type } from "../../types/vectors.ts";

/**
 * Returntype of createConcavePolygonShape2D
 *
 * @category Shape2D
 */
export interface ConcavePolygonShape2D {
  type: "ConcavePolygonShape2D";
  props: {
    segments: PackedArrayType<Vector2Type>;
  };
}

/**
 * A 2D polyline shape used for physics collision.
 *
 * @example
 * ```tsx
 * <CollisionShape2D
 *   shape={createConcavePolygonShape2D(Vector2(1, 2), Vector2(3, 4))}
 * />
 * ```
 *
 * @category Shape2D
 * @see https://docs.godotengine.org/en/stable/classes/class_concavepolygonshape2d.html
 */
export function createConcavePolygonShape2D(
  ...segments: Vector2Type[]
): ConcavePolygonShape2D {
  return {
    type: "ConcavePolygonShape2D",
    props: { segments: PackedArray<Vector2Type>(...segments) },
  };
}
