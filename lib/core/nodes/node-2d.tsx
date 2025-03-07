import type { ReactNode } from "types/react";
import { GodotNode } from "../../internal/element.ts";
import { createNode, type Node } from "../../internal/node.ts";
import { addNodeEntry, createId } from "../../internal/helpers.ts";
import type { CanvasItemProps, Transform2D, Vector2Type } from "@gdx/godact";

/**
 * Props for a Node2D
 *
 * @category Primitive
 */
export interface Node2DProps extends CanvasItemProps {
  position?: Vector2Type;
  rotation?: number;
  scale?: Vector2Type;
  skew?: number;
  children?: ReactNode;
  transform?: Transform2D;
  onReady?: () => void;
  onPhysicsProcess?: (delta: number) => void;
  onProcess?: (delta: number) => void;
}

/**
 * A 2D game object, inherited by all 2D-related nodes. Has a position, rotation, scale, and Z index.
 *
 * @example
 * ```tsx
 * <Node2D />
 * ```
 *
 * @category Primitive
 * @see https://docs.godotengine.org/en/stable/classes/class_node2d.html
 */
export function Node2D(props: Node2DProps): ReactNode {
  return (
    <GodotNode props={props} createNode={() => createNode2DNode(props)}>
      {props.children}
    </GodotNode>
  );
}

function createNode2DNode(props: Node2DProps): Node<Node2DProps> {
  const node = createNode<Node2DProps>(props);
  const nodeName = props.name ?? createId(props);

  return {
    ...node,
    insertMe(script, parent) {
      addNodeEntry({
        type: "Node2D",
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
