// @ts-types="@types/react"
import React, { type ReactNode } from "react";
import { GodotNode } from "../../internal/element.ts";
import { createNode, type Node } from "../../internal/node.ts";
import {
  addCommonProps,
  addNodeEntry,
  createId,
} from "../../internal/helpers.ts";
import type { Node2DProps } from "./node-2d.tsx";
import type { ColorType } from "../types/vectors.ts";
import type { Shape2DTypes } from "../types/shape.ts";

React.version; // Purely linter fix, remove once import React doesn't cause no-unused-vars and verbatim-module-syntax

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
 * A 2D game object, inherited by all 2D-related nodes. Has a position, rotation, scale, and Z index.
 *
 * @example
 * ```tsx
 * <Node2D />
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
  const resourceIds = new Array(100).fill(createId());
  const nodeName = props.name ?? createId();

  return {
    ...node,
    insertMe(script, parent) {
      addNodeEntry({
        type: "CollisionShape2D",
        name: nodeName,
        parent,
        props: {
          ...props,
          ...(props.shape &&
            {
              shape: {
                typeSpecifier: "SubResource",
                value: `"${resourceIds[0]}"`,
              },
            }),
        },
        script,
      });

      if (props.shape) {
        script.internal.push({
          text: `[sub_resource type="${props.shape.type}" id="${
            resourceIds[0]
          }"]`,
          props: addCommonProps({ ...props.shape.props }, script),
        });
      }

      for (const child of node.children) {
        child.insertMe(script, parent ? `${parent}/${nodeName}` : ".");
      }
    },
  };
}
