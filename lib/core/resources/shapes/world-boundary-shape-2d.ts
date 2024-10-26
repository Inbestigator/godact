import type { Vector2Type } from "../../types/vectors.ts";

/**
 * Returntype of createWorldBoundaryShape2D
 *
 * @category Shape2D
 */
export interface WorldBoundaryShape2D {
  type: "WorldBoundaryShape2D";
  props: WorldBoundaryShape2DProps;
}

/**
 * Props for createWorldBoundaryShape2D
 *
 * @category Node2D
 */
export interface WorldBoundaryShape2DProps {
  distance?: number;
  normal?: Vector2Type;
}

/**
 * A 2D world boundary (half-plane) shape used for physics collision.
 *
 * @example
 * ```tsx
 * <CollisionShape2D
 *   shape={createWorldBoundaryShape2D({ distance: 5, normal: Vector2(2, 3) })}
 * />
 * ```
 *
 * @category Shape2D
 * @see https://docs.godotengine.org/en/stable/classes/class_worldboundaryshape2d.html
 */
export function createWorldBoundaryShape2D(
  props: WorldBoundaryShape2DProps,
): WorldBoundaryShape2D {
  return {
    type: "WorldBoundaryShape2D",
    props,
  };
}
