import type { ColorType } from "../types/vectors.ts";

/**
 * Returntype of createSyntaxHighlighter
 *
 * @category Visual
 */
export interface SyntaxHighlighter {
  type: "SyntaxHighlighter" | "CodeHighlighter";
  props?: CodeHighlighterProps;
}

/**
 * Props for createSyntaxHighlighter
 *
 * @category Visual
 */
export interface CodeHighlighterProps {
  color_regions?: Record<string, string>;
  function_color?: ColorType;
  keyword_colors?: Record<string, ColorType>;
  member_keyword_colors?: Record<string, ColorType>;
  member_variable_colors?: ColorType;
  number_color?: ColorType;
  symbol_color?: ColorType;
}

/**
 * Base class for syntax highlighters. Provides syntax highlighting data to a TextEdit.
 *
 * @example
 * ```tsx
 * createSyntaxHighlighter()
 * ```
 *
 * @category Visual
 * @see https://docs.godotengine.org/en/stable/classes/class_syntaxhighlighter.html
 */
export function createSyntaxHighlighter<
  T extends "SyntaxHighlighter" | "CodeHighlighter",
>(
  type: T,
  props: T extends "CodeHighlighter" ? CodeHighlighterProps
    : Record<string, never> = {},
): SyntaxHighlighter {
  return {
    type,
    props,
  };
}
