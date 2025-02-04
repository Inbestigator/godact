import type { InputEventType } from "../types/input-events.ts";

/**
 * Returntype of createShortcut
 *
 * @category Keyboard
 */
export interface Shortcut {
  type: "Shortcut";
  props: {
    events: InputEventType[];
  };
}

/**
 * Props for createShortcut
 *
 * @category Keyboard
 */
export type ShortcutProps = InputEventType[];

/**
 * A color transition.
 *
 * @example
 * ```tsx
 * createShortcut({ path: "res://icon.svg" })
 * ```
 *
 * @category Keyboard
 * @see https://docs.godotengine.org/en/stable/classes/class_shortcut.html
 */
export function createShortcut(...props: ShortcutProps): Shortcut {
  return {
    type: "Shortcut",
    props: {
      events: props,
    },
  };
}
