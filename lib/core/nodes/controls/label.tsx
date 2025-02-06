import type { ReactNode } from "types/react";
import { GodotNode } from "../../../internal/element.ts";
import { createNode, type Node } from "../../../internal/node.ts";
import { addNodeEntry, createId } from "../../../internal/helpers.ts";
import type { BitFieldType, ControlProps, LabelSettings } from "@gdx/godact";

/**
 * Props for a Label
 *
 * @category Control
 */
export interface LabelProps extends ControlProps {
  autowrap_mode?: 0 | 1 | 2 | 3;
  clip_text?: boolean;
  ellipsis_char?: string;
  horizontal_alignment?: 0 | 1 | 2 | 3;
  justification_flags?: BitFieldType;
  label_settings?: LabelSettings;
  language?: string;
  lines_skipped?: number;
  max_lines_visible?: number;
  mouse_filter?: 0 | 1 | 2;
  size_flags_vertical?: BitFieldType;
  structured_text_bidi_override?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  structured_text_bidi_override_options?: string[];
  tab_stops?: number[];
  text?: string;
  text_direction?: 0 | 1 | 2 | 3;
  text_overrun_behavior?: 0 | 1 | 2 | 3 | 4;
  uppercase?: boolean;
  vertical_alignment?: 0 | 1 | 2 | 3;
  visible_characters?: number;
  visible_characters_behavior?: 0 | 1 | 2 | 3 | 4;
  visible_ratio?: number;
}

/**
 * A control for displaying plain text.
 *
 * @example
 * ```tsx
 * <Label text="Hello World" />
 * ```
 *
 * @category Control
 * @see https://docs.godotengine.org/en/stable/classes/class_label.html
 */
export function Label(props: LabelProps): ReactNode {
  return (
    <GodotNode props={props} createNode={() => createLabelNode(props)}>
      {props.children}
    </GodotNode>
  );
}

function createLabelNode(props: LabelProps): Node<LabelProps> {
  const node = createNode<LabelProps>(props);
  const nodeName = props.name ?? createId(props);

  return {
    ...node,
    insertMe(script, parent) {
      addNodeEntry({
        type: "Label",
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
