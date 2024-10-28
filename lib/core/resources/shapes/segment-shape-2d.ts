import type { Vector2Type } from "../../types/vectors.ts";

/**
 * Returntype of createSegmentShape2D
 *
 * @category Shape2D
 */
export interface SegmentShape2D {
  type: "SegmentShape2D";
  props: SegmentShape2DProps;
}

/**
 * Props for createSegmentShape2D
 *
 * @category Node2D
 */
export interface SegmentShape2DProps {
  a?: Vector2Type;
  b?: Vector2Type;
}

/**
 * A 2D line segment shape used for physics collision.
 *
 * @example
 * ```tsx
 * <CollisionShape2D
 *   shape={createSegmentShape2D({ a: Vector2(1, 2), b: Vector2(3, 4) })}
 * />
 * ```
 *
 * @category Shape2D
 * @see https://docs.godotengine.org/en/stable/classes/class_segmentshape2d.html
 */
export function createSegmentShape2D(
  props: SegmentShape2DProps = {},
): SegmentShape2D {
  return {
    type: "SegmentShape2D",
    props,
  };
}
