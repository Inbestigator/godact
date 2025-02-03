/**
 * Return type for NodePath
 *
 * @category Utility
 */
export interface NodePathType {
  type: "Wrapped";
  wrapper: "NodePath";
  value: string;
}

/**
 * A pre-parsed scene tree path.
 *
 * @example
 * ```tsx
 * <Control focus_next={NodePath("../Button")} />
 * ```
 *
 * @category Utility
 * @see https://docs.godotengine.org/en/stable/classes/class_nodepath.html
 */
export function NodePath(value: string): NodePathType {
  return {
    type: "Wrapped",
    wrapper: "NodePath",
    value,
  };
}
