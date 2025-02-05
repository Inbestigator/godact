import type { ReactNode } from "types/react";
import { GodotNode } from "../../../internal/element.ts";
import { createNode, type Node } from "../../../internal/node.ts";
import { addNodeEntry, createId } from "../../../internal/helpers.ts";
import type { ControlProps, SyntaxHighlighter } from "@inbestigator/godact";

/**
 * Props for a TextEdit
 *
 * @category Control
 */
export interface TextEditProps extends ControlProps {
  autowrap_mode?: 0 | 1 | 2 | 3;
  caret_blink?: boolean;
  caret_blink_numbererval?: number;
  caret_draw_when_editable_disabled?: boolean;
  caret_mid_grapheme?: boolean;
  caret_move_on_right_click?: boolean;
  caret_multiple?: boolean;
  caret_type?: 0 | 1;
  clip_contents?: boolean;
  context_menu_enabled?: boolean;
  custom_word_separators?: string;
  deselect_on_focus_loss_enabled?: boolean;
  drag_and_drop_selection_enabled?: boolean;
  draw_control_chars?: boolean;
  draw_spaces?: boolean;
  draw_tabs?: boolean;
  editable?: boolean;
  focus_mode?: 0 | 1 | 2;
  highlight_all_occurrences?: boolean;
  highlight_current_line?: boolean;
  indent_wrapped_lines?: boolean;
  language?: string;
  middle_mouse_paste_enabled?: boolean;
  minimap_draw?: boolean;
  minimap_width?: number;
  mouse_default_cursor_shape?:
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16;
  placeholder_text?: string;
  scroll_fit_content_height?: boolean;
  scroll_horizontal?: number;
  scroll_past_end_of_file?: boolean;
  scroll_smooth?: boolean;
  scroll_v_scroll_speed?: number;
  scroll_vertical?: number;
  selecting_enabled?: boolean;
  shortcut_keys_enabled?: boolean;
  structured_text_bidi_override?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  structured_text_bidi_override_options?: string[];
  syntax_highlighter?: SyntaxHighlighter;
  text?: string;
  text_direction?: 0 | 1 | 2 | 3;
  use_custom_word_separators?: boolean;
  use_default_word_separators?: boolean;
  virtual_keyboard_enabled?: boolean;
  wrap_mode?: 0 | 1;
}

/**
 * A multiline text editor.
 *
 * @example
 * ```tsx
 * <TextEdit text="Hello World" />
 * ```
 *
 * @category Control
 * @see https://docs.godotengine.org/en/stable/classes/class_textedit.html
 */
export function TextEdit(props: TextEditProps): ReactNode {
  return (
    <GodotNode props={props} createNode={() => createTextEditNode(props)}>
      {props.children}
    </GodotNode>
  );
}

function createTextEditNode(props: TextEditProps): Node<TextEditProps> {
  const node = createNode<TextEditProps>(props);
  const nodeName = props.name ?? createId(props);

  return {
    ...node,
    insertMe(script, parent) {
      addNodeEntry({
        type: "TextEdit",
        name: nodeName,
        parent,
        props,
        script,
      });

      for (const child of node.children) {
        child.insertMe(script, parent ? `${parent}/${nodeName}` : ".");
      }
    },
  };
}
