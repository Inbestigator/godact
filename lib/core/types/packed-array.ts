/**
 * Return type for PackedArray
 *
 * @category Utility
 */
export interface PackedArrayType<T> {
  typeSpecifier: string;
  value: string;
}

/**
 * Pack many variables of the same type into a single array
 *
 * @example
 * ```tsx
 * PackedArray({ typeSpecifier: "Int", value: "0" }, { typeSpecifier: "Int", value: "1" });
 * ```
 *
 * @category Utility
 * @see https://docs.godotengine.org/en/stable/classes/class_packedarray.html
 */
export function PackedArray<T extends { typeSpecifier: string; value: string }>(
  ...props: T[]
): PackedArrayType<T> {
  if (!("typeSpecifier" in props[0]) || !("value" in props[0])) {
    throw new Error(
      "Not a valid packable type. Please provide a type specifier and value.",
    );
  }
  return {
    typeSpecifier: `Packed${props[0].typeSpecifier}Array`,
    value: props.map((prop) => prop.value).join(", "),
  };
}
