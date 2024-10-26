/**
 * Returntype for Vector2
 *
 * @category Vectors
 */
export interface Vector2Type {
  typeSpecifier: "Vector2";
  value: string;
}

/**
 * Returntype for Vector3
 *
 * @category Vectors
 */
export interface Vector3Type {
  typeSpecifier: "Vector3";
  value: string;
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
    typeSpecifier: "Vector2",
    value: `${x}, ${y}`,
  };
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
    typeSpecifier: "Vector3",
    value: `${x}, ${y}, ${z}`,
  };
}

/**
 * Returntype for Color
 *
 * @category Vectors
 */
export interface ColorType {
  typeSpecifier: "Color";
  value: string;
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
  return {
    typeSpecifier: "Color",
    value: `${r}, ${g}, ${b}, ${a}`,
  };
}
