/**
 * Returntype of createCircleShape2D
 *
 * @category Shape2D
 */
export interface CircleShape2D {
  type: "CircleShape2D";
  props: {
    radius?: number;
  };
}

/**
 * A 2D circle shape used for physics collision.
 *
 * @example
 * ```tsx
 * <CollisionShape2D
 *   shape={createCircleShape2D(5)}
 * />
 * ```
 *
 * @category Shape2D
 * @see https://docs.godotengine.org/en/stable/classes/class_circleshape2d.html
 */
export function createCircleShape2D(
  radius?: number,
): CircleShape2D {
  return {
    type: "CircleShape2D",
    props: {
      radius,
    },
  };
}
