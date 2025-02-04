import type { ReactNode } from "types/react";
import { GodotNode } from "../../internal/element.ts";
import { createNode, type Node } from "../../internal/node.ts";
import { addNodeEntry, createId } from "../../internal/helpers.ts";
import type {
  BitFieldType,
  CanvasItemProps,
  NodePathType,
  Theme,
  Vector2Type,
} from "@inbestigator/godact";

/**
 * Props for a Control
 *
 * @category Primitive
 */
export interface ControlProps extends CanvasItemProps {
  anchor_bottom?: number;
  anchor_left?: number;
  anchor_right?: number;
  anchor_top?: number;
  auto_translate?: boolean;
  clip_contents?: boolean;
  custom_minimum_size?: Vector2Type;
  focus_mode?: 0 | 1 | 2;
  focus_neighbour_bottom?: NodePathType;
  focus_neighbour_left?: NodePathType;
  focus_neighbour_right?: NodePathType;
  focus_neighbour_top?: NodePathType;
  focus_next?: NodePathType;
  focus_previous?: NodePathType;
  global_position?: Vector2Type;
  grow_horizontal?: 0 | 1 | 2;
  grow_vertical?: 0 | 1 | 2;
  layout_direction?: 0 | 1 | 2 | 3;
  localize_numeral_system?: boolean;
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
  mouse_filter?: 0 | 1 | 2;
  mouse_force_pass_scroll_events?: boolean;
  offset_bottom?: number;
  offset_left?: number;
  offset_right?: number;
  offset_top?: number;
  pivot_offset?: Vector2Type;
  position?: Vector2Type;
  rotation?: number;
  rotation_degrees?: number;
  scale?: Vector2Type;
  shortcut_context?: NodePathType;
  size?: Vector2Type;
  size_flags_horizontal?: BitFieldType;
  size_flags_stretch_ratio?: number;
  size_flags_vertical?: BitFieldType;
  theme?: Theme;
  theme_type_variation?: string;
  tooltip_text?: string;
}

/**
 * Base class for all GUI controls. Adapts its position and size based on its parent control.
 *
 * @example
 * ```tsx
 * <Control />
 * ```
 *
 * @category Primitive
 * @see https://docs.godotengine.org/en/stable/classes/class_control.html
 */
export function Control(props: ControlProps): ReactNode {
  return (
    <GodotNode props={props} createNode={() => createControlNode(props)}>
      {props.children}
    </GodotNode>
  );
}

function createControlNode(props: ControlProps): Node<ControlProps> {
  const node = createNode<ControlProps>(props);
  const nodeName = props.name ?? createId(props);

  return {
    ...node,
    insertMe(script, parent) {
      addNodeEntry({
        type: "Control",
        name: nodeName,
        parent,
        props: {
          ...props,
        },
        script,
      });

      for (const child of node.children) {
        child.insertMe(script, parent ? `${parent}/${nodeName}` : ".");
      }
    },
  };
}
