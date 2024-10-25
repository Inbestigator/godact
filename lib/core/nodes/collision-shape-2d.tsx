// @ts-types="@types/react"
import type { ReactNode } from "react";
import { GodotNode } from "../../internal/element.ts";
import { createNode, type Node } from "../../internal/node.ts";
import { type RectangleShape2D } from "../resources/shapes/rectangle-shape-2d.ts";
import {
  addCommonProps,
  convertCommonTypes,
  createId,
  type Node2DProps,
} from "./node.ts";

/**
 * Props for a CollisionShape2D
 *
 * @category Node2D
 */
export interface CollisionShape2DProps extends Node2DProps {
  shape: RectangleShape2D;
  position?: [number, number];
  children?: ReactNode;
}

/**
 * A node that provides a Shape2D to a CollisionObject2D parent.
 *
 * ```tsx
  <CharacterBody2D name="Player">
    <CollisionShape2D
      shape={createRectangleShape2D({ size: [2, 3] })}
    >
      Player
    </CollisionShape2D>
  </CharacterBody2D>
 * ```
 *
 * @category Node2D
 * @see https://docs.godotengine.org/en/stable/classes/class_collisionshape2d.html
 */
export function CollisionShape2D(props: CollisionShape2DProps) {
  return (
    <GodotNode
      props={props}
      createNode={() => createCollisionShape2DNode(props)}
    >
      {props.children}
    </GodotNode>
  );
}

function createCollisionShape2DNode(
  props: CollisionShape2DProps
): Node<CollisionShape2DProps> {
  const node = createNode<CollisionShape2DProps>(props);
  const shapeId = createId();
  const nodeName = props.name ?? createId();

  return {
    ...node,
    insertMe(script, parent) {
      script.nodes.push({
        text: `[node name="${nodeName}" type="CollisionShape2D"${
          parent ? ` parent="${parent}"` : ""
        }]`,
        props: addCommonProps({
          ...props,
          shape: `SubResource("${shapeId}")`,
        }),
      });

      script.internal.push({
        text: `[sub_resource type="${props.shape.type}" id="${shapeId}"]`,
        props: Object.entries(props.shape.props).map(
          ([key, value]) => `${key} = ${convertCommonTypes(value)}`
        ),
      });

      for (const child of node.children) {
        child.insertMe(script, parent ? `${parent}/${nodeName}` : nodeName);
      }
    },
  };
}
