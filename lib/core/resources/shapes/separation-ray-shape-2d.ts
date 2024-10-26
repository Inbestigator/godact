/**
 * Returntype of createSeparationRayShape2D
 *
 * @category Shape2D
 */
export interface SeparationRayShape2D {
  type: "SeparationRayShape2D";
  props: SeparationRayShape2DProps;
}

/**
 * Props for createSeparationRayShape2D
 *
 * @category Node2D
 */
export interface SeparationRayShape2DProps {
  length?: number;
  slide_on_slope?: boolean;
}

/**
 * A 2D ray shape used for physics collision that tries to separate itself from any collider.
 *
 * @example
 * ```tsx
 * <CollisionShape2D
 *   shape={createSeparationRayShape2D({ length: 5, slide_on_slope: true })}
 * />
 * ```
 *
 * @category Shape2D
 * @see https://docs.godotengine.org/en/stable/classes/class_separationrayshape2d.html
 */
export function createSeparationRayShape2D(
  props: SeparationRayShape2DProps,
): SeparationRayShape2D {
  return {
    type: "SeparationRayShape2D",
    props,
  };
}
