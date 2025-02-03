/**
 * Return type for PackedArray
 *
 * @category Utility
 */
export interface PackedArrayType<T> {
  type: "Wrapped";
  wrapper: string;
  value: string;
}

/**
 * Pack many variables of the same type into a single array
 *
 * @example
 * ```tsx
 * PackedArray({ wrapper: "Int", value: "0" }, { wrapper: "Int", value: "1" });
 * ```
 *
 * @category Utility
 * @see https://docs.godotengine.org/en/stable/classes/class_packedarray.html
 */
export function PackedArray<T extends { wrapper: string; value: string }>(
  ...props: T[]
): PackedArrayType<T> {
  if (!("wrapper" in props[0]) || !("value" in props[0])) {
    throw new Error(
      "Not a valid packable type. Please provide a type specifier and value.",
    );
  }
  return {
    type: "Wrapped",
    wrapper: `Packed${props[0].wrapper}Array`,
    value: props.map((prop) => prop.value).join(", "),
  };
}
