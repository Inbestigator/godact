import type { PackedArray } from "../types/packed-array.ts";
import type { ColorType, Float32Type } from "../types/vectors.ts";

/**
 * Returntype of createGradient
 *
 * @category Visual
 */
export interface Gradient {
  type: "Gradient";
  props: GradientProps;
}

/**
 * Props for createGradient
 *
 * @category Visual
 */
export interface GradientProps {
  colors?: PackedArray<ColorType>;
  interpolation_color_space?: 0 | 1 | 2;
  interpolation_mode?: 0 | 1 | 2;
  offset?: PackedArray<Float32Type>;
}

/**
 * A color transition.
 *
 * @example
 * ```tsx
 * createGradient({ path: "res://icon.svg" })
 * ```
 *
 * @category Visual
 * @see https://docs.godotengine.org/en/stable/classes/class_gradient.html
 */
export function createGradient(props: GradientProps): Gradient {
  return {
    type: "Gradient",
    props,
  };
}
