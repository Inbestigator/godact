/**
 * Returntype for Vector2
 *
 * @category Vectors
 */
export interface Vector2Type {
  type: "Wrapped";
  wrapper: "Vector2";
  value: string;
  x: number;
  y: number;
}

/**
 * A 2D vector using floating-point coordinates.
 *
 * @example
 * ```ts
 * Vector2(1, 2);
 * ```
 *
 * @category Vectors
 * @see https://docs.godotengine.org/en/stable/classes/class_vector2.html
 */
export function Vector2(x: number, y: number): Vector2Type {
  return {
    type: "Wrapped",
    wrapper: "Vector2",
    value: `${x}, ${y}`,
    x,
    y,
  };
}

/**
 * Returntype for Vector3
 *
 * @category Vectors
 */
export interface Vector3Type {
  type: "Wrapped";
  wrapper: "Vector3";
  value: string;
  x: number;
  y: number;
  z: number;
}

/**
 * A 3D vector using floating-point coordinates.
 *
 * @example
 * ```ts
 * Vector3(1, 2, 3);
 * ```
 *
 * @category Vectors
 * @see https://docs.godotengine.org/en/stable/classes/class_vector3.html
 */
export function Vector3(x: number, y: number, z: number): Vector3Type {
  return {
    type: "Wrapped",
    wrapper: "Vector3",
    value: `${x}, ${y}, ${z}`,
    x,
    y,
    z,
  };
}

/**
 * Returntype for Color
 *
 * @category Vectors
 */
export interface ColorType {
  type: "Wrapped";
  wrapper: "Color";
  value: string;
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * A color represented in RGBA format.
 *
 * @example
 * ```ts
 * Color(70, 140, 191, 255);
 * ```
 *
 * @category Vectors
 * @see https://docs.godotengine.org/en/stable/classes/class_color.html
 */
export function Color(r: number, g: number, b: number, a: number): ColorType {
  const normalizedR = Math.max(0, Math.min(r / 255, 1));
  const normalizedG = Math.max(0, Math.min(g / 255, 1));
  const normalizedB = Math.max(0, Math.min(b / 255, 1));
  const normalizedA = Math.max(0, Math.min(a / 255, 1));

  return {
    type: "Wrapped",
    wrapper: "Color",
    value: `${normalizedR}, ${normalizedG}, ${normalizedB}, ${normalizedA}`,
    r: normalizedR,
    g: normalizedG,
    b: normalizedB,
    a: normalizedA,
  };
}

/**
 * Returntype for Rect2
 *
 * @category Vectors
 */
export interface Rect2Type {
  type: "Wrapped";
  wrapper: "Rect2";
  value: string;
}

/**
 * A 2D axis-aligned bounding box using floating-point coordinates.
 *
 * @example
 * ```ts
 * Rect2(0, 0, 0, 0);
 * ```
 *
 * @category Vectors
 * @see https://docs.godotengine.org/en/stable/classes/class_rect2.html
 */
export function Rect2(r: number, g: number, b: number, a: number): Rect2Type {
  return {
    type: "Wrapped",
    wrapper: "Rect2",
    value: `${r}, ${g}, ${b}, ${a}`,
  };
}

/**
 * Returntype for Float32
 *
 * @category Vectors
 */
export interface Float32Type {
  type: "Wrapped";
  wrapper: "Float32";
  value: number;
  n: number;
}

/**
 * A 1D vector using floating-point coordinates.
 *
 * @example
 * ```ts
 * Float32(1);
 * ```
 *
 * @category Vectors
 * @see https://docs.godotengine.org/en/stable/classes/class_vector2.html
 */
export function Float32(n: number): Float32Type {
  return {
    type: "Wrapped",
    wrapper: "Float32",
    value: n,
    n,
  };
}
