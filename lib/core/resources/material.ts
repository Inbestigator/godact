/**
 * Returntype of createMaterial
 *
 * @category Visual
 */
export interface Material {
  type: "Material";
  props: MaterialProps;
}

/**
 * Props for createMaterial
 *
 * @category Visual
 */
export interface MaterialProps {
  next_pass?: Material;
  render_priority?: number;
}

/**
 * Virtual base class for applying visual properties to an object, such as color and roughness.
 *
 * @example
 * ```tsx
 * <Node2D material={createMaterial()} />
 * ```
 *
 * @category Visual
 * @see https://docs.godotengine.org/en/stable/classes/class_material.html
 */
export function createMaterial(props: MaterialProps = {}): Material {
  return {
    type: "Material",
    props,
  };
}
