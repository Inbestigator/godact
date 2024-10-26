// @ts-types="@types/react"
import React, { type ReactNode } from "react";
import { GodotNode } from "../../internal/element.ts";
import { createNode, type Node } from "../../internal/node.ts";
import { addCommonProps, convertCommonTypes, createId } from "./node.ts";
import type { Node2DProps } from "./node-2d.tsx";
import type { ColorType } from "../types/vectors.ts";
import type { Shape2DTypes } from "../types/shape.ts";

React.version;

/**
 * Props for a CollisionShape2D
 *
 * @category Node2D
 */
export interface CollisionShape2DProps extends Node2DProps {
  debug_color?: ColorType;
  disabled?: boolean;
  one_way_collision?: boolean;
  one_way_collision_margin?: number;
  shape: Shape2DTypes;
}

/**
 * A node that provides a Shape2D to a CollisionObject2D parent.
 *
 * @example
 * ```tsx
 * <CollisionShape2D
 *   shape={createRectangleShape2D({ size: Vector2(2, 3) })}
 *   position={Vector2(1, 2)}
 * />
 * ```
 *
 * @category Node2D
 * @see https://docs.godotengine.org/en/stable/classes/class_collisionshape2d.html
 */
export function CollisionShape2D(props: CollisionShape2DProps): ReactNode {
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
  props: CollisionShape2DProps,
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
          shape: { typeSpecifier: "SubResource", value: `"${shapeId}"` },
        }, script),
      });

      script.internal.push({
        text: `[sub_resource type="${props.shape.type}" id="${shapeId}"]`,
        props: Object.entries(props.shape.props).map(
          ([key, value]) => `${key} = ${convertCommonTypes(value)}`,
        ),
      });

      for (const child of node.children) {
        child.insertMe(script, parent ? `${parent}/${nodeName}` : nodeName);
      }
    },
  };
}
