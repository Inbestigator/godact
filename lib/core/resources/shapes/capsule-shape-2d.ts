/**
 * Returntype of createCapsuleShape2D
 *
 * @category Shape2D
 */
export interface CapsuleShape2D {
  type: "CapsuleShape2D";
  props: CapsuleShape2DProps;
}

/**
 * Props for createCapsuleShape2D
 *
 * @category Node2D
 */
export interface CapsuleShape2DProps {
  height?: number;
  radius?: number;
}

/**
 * A 2D capsule shape used for physics collision.
 *
 * @example
 * ```tsx
 * <CollisionShape2D
 *   shape={createCapsuleShape2D({ height: 2, radius: 3 })}
 * />
 * ```
 *
 * @category Shape2D
 * @see https://docs.godotengine.org/en/stable/classes/class_capsuleshape2d.html
 */
export function createCapsuleShape2D(
  props: CapsuleShape2DProps = {},
): CapsuleShape2D {
  return {
    type: "CapsuleShape2D",
    props,
  };
}
