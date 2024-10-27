// @ts-types="@types/react"
import React, { type ReactNode } from "react";
import { GodotNode } from "../../../internal/element.ts";
import { createNode, type Node } from "../../../internal/node.ts";
import {
  addCommonProps,
  addNodeEntry,
  createId,
} from "../../../internal/helpers.ts";
import type { StaticBody2DProps } from "./static-body-2d.tsx";

React.version; // Purely linter fix, remove once import React doesn't cause no-unused-vars and verbatim-module-syntax

/**
 * Props for a AnimatableBody2D
 *
 * @category PhysicsBody2D
 */
export interface AnimatableBody2DProps extends StaticBody2DProps {
  sync_to_physics?: true;
}

/**
 * A 2D physics body that can't be moved by external forces. When moved manually, it affects other bodies in its path.
 *
 * @example
 * ```tsx
 * <AnimatableBody2D>
 *   <CollisionShape2D
 *     shape={createRectangleShape2D({ size: Vector2(2, 3) })}
 *   />
 * </AnimatableBody2D>
 * ```
 *
 * @category PhysicsBody2D
 * @see https://docs.godotengine.org/en/stable/classes/class_animatablebody2d.html
 */
export function AnimatableBody2D(props: AnimatableBody2DProps): ReactNode {
  return (
    <GodotNode
      props={props}
      createNode={() => createAnimatableBody2DNode(props)}
    >
      {props.children}
    </GodotNode>
  );
}

function createAnimatableBody2DNode(
  props: AnimatableBody2DProps,
): Node<AnimatableBody2DProps> {
  const node = createNode<AnimatableBody2DProps>(props);
  const materialId = createId();
  const nodeName = props.name ?? createId();

  return {
    ...node,
    insertMe(script, parent) {
      addNodeEntry({
        type: "AnimatableBody2D",
        name: nodeName,
        parent,
        props: {
          ...props,
          ...(props.physics_material_override && {
            physics_material_override: {
              typeSpecifier: "SubResource",
              value: `"${materialId}"`,
            },
          }),
        },
        script,
      });

      if (props.physics_material_override) {
        script.internal.push({
          text:
            `[sub_resource type="${props.physics_material_override.type}" id="${materialId}"]`,
          props: addCommonProps(
            { ...props.physics_material_override.props },
            script,
          ),
        });
      }

      for (const child of node.children) {
        child.insertMe(script, parent ? `${parent}/${nodeName}` : ".");
      }
    },
  };
}
