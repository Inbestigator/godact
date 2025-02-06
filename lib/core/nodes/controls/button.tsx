import type { ReactNode } from "types/react";
import { GodotNode } from "../../../internal/element.ts";
import { createNode, type Node } from "../../../internal/node.ts";
import { addNodeEntry, createId } from "../../../internal/helpers.ts";
import type { BaseButtonProps, Texture2D } from "@gdx/godact";

/**
 * Props for a Button
 *
 * @category Control
 */
export interface ButtonProps extends BaseButtonProps {
  alignment?: 0 | 1 | 2 | 3;
  autowrap_mode?: 0 | 1 | 2 | 3;
  clip_text?: boolean;
  expand_icon?: boolean;
  flat?: boolean;
  icon?: Texture2D;
  icon_alignment?: 0 | 1 | 2 | 3;
  language?: string;
  text?: string;
  text_direction?: 0 | 1 | 2 | 3;
  text_overrun_behavior?: 0 | 1 | 2 | 3 | 4;
  vertical_icon_alignment?: 0 | 1 | 2 | 3;
}

/**
 * A themed button that can contain text and an icon.
 *
 * @example
 * ```tsx
 * <Button/>
 * ```
 *
 * @category Control
 * @see https://docs.godotengine.org/en/stable/classes/class_button.html
 */
export function Button(props: ButtonProps): ReactNode {
  return (
    <GodotNode props={props} createNode={() => createButtonNode(props)}>
      {props.children}
    </GodotNode>
  );
}

function createButtonNode(props: ButtonProps): Node<ButtonProps> {
  const node = createNode<ButtonProps>(props);
  const nodeName = props.name ?? createId(props);

  return {
    ...node,
    insertMe(script, parent) {
      addNodeEntry({
        type: "Button",
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
