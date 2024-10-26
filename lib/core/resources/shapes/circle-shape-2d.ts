/**
 * Returntype of createCircleShape2D
 *
 * @category Shape2D
 */
export interface CircleShape2D {
  type: "CircleShape2D";
  props: CircleShape2DProps;
}

/**
 * Props for createCircleShape2D
 *
 * @category Node2D
 */
export interface CircleShape2DProps {
  radius?: number;
}

/**
 * A 2D circle shape used for physics collision.
 *
 * @example
 * ```tsx
 * <CollisionShape2D
 *   shape={createCircleShape2D({ radius: 5 })}
 * />
 * ```
 *
 * @category Shape2D
 * @see https://docs.godotengine.org/en/stable/classes/class_circleshape2d.html
 */
export function createCircleShape2D(props: CircleShape2DProps): CircleShape2D {
  return {
    type: "CircleShape2D",
    props,
  };
}
