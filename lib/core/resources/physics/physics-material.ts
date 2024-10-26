/**
 * Returntype of createPhysicsMaterial
 *
 * @category Shape2D
 */
export interface PhysicsMaterial {
  type: "PhysicsMaterial";
  props: PhysicsMaterialProps;
}

/**
 * Props for createPhysicsMaterial
 *
 * @category Node2D
 */
export interface PhysicsMaterialProps {
  absorbent?: boolean;
  bounce?: number;
  friction?: number;
  rough?: boolean;
}

/**
 * Holds physics-related properties of a surface, namely its roughness and bounciness.
 *
 * @example
 * ```tsx
 * <RigidBody2D
 *   physics_material_override={createPhysicsMaterial({ absorbent: true })}
 * />
 * ```
 *
 * @category Physics
 * @see https://docs.godotengine.org/en/stable/classes/class_physicsmaterial.html
 */
export function createPhysicsMaterial(
  props: PhysicsMaterialProps,
): PhysicsMaterial {
  return {
    type: "PhysicsMaterial",
    props,
  };
}
