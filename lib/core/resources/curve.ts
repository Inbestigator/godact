/**
 * Returntype of createCurve
 *
 * @category Visual
 */
export interface Curve {
  type: "Curve";
  props: CurveProps;
}

/**
 * Props for createCurve
 *
 * @category Visual
 */
export interface CurveProps {
  bake_resolution?: number;
  max_value?: number;
  min_value?: number;
  point_count?: number;
}

/**
 * A mathematical curve.
 *
 * @example
 * ```tsx
 * createCurve({ path: "res://icon.svg" })
 * ```
 *
 * @category Visual
 * @see https://docs.godotengine.org/en/stable/classes/class_curve.html
 */
export function createCurve(props: CurveProps = {}): Curve {
  return {
    type: "Curve",
    props,
  };
}
