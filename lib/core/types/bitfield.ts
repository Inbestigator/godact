/**
 * Return type for createBitField
 *
 * @category Utility
 */
export type BitFieldType = number;

/**
 * Create a bitfield resource
 *
 * @example
 * ```tsx
 * BitField(1, 2, 4);
 * ```
 *
 * @category Utility
 * @see https://google.com/search?q=bitfield+godot
 */
export function BitField(...value: number[]): BitFieldType {
  return value.reduce((a, b) => a | b, 0);
}
