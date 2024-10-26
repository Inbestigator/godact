// @ts-types="@types/react"
import React, { type ReactNode } from "react";
import { GodotNode } from "../../internal/element.ts";
import { createNode, type Node } from "../../internal/node.ts";
import { addCommonProps, type CanvasItemProps, createId } from "./node.ts";
import type { Transform2D } from "../types/transform.ts";
import type { Vector2Type } from "../types/vectors.ts";

React.version; // Purely linter fix, remove once import React doesn't cause no-unused-vars and verbatim-module-syntax

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
  const nodeName = props.name ?? createId();

  return {
    ...node,
    insertMe(script, parent) {
      script.nodes.push({
        text: `[node name="${nodeName}" type="Node2D"${
          parent ? ` parent="${parent}"` : ""
        }]`,
        props: addCommonProps({ ...props }, script),
      });

      for (const child of node.children) {
        child.insertMe(script, parent ? `${parent}/${nodeName}` : ".");
      }
    },
  };
}
