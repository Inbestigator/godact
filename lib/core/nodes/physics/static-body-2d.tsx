// @ts-types="@types/react"
import React, { type ReactNode } from "react";
import { GodotNode } from "../../../internal/element.ts";
import { createNode, type Node } from "../../../internal/node.ts";
import { addCommonProps, convertCommonTypes, createId } from "../node.ts";
import type { PhysicsBody2DProps } from "./physics-props.ts";
import type { Vector2Type } from "../../types/vectors.ts";
import type { PhysicsMaterial } from "../../resources/physics/physics-material.ts";

React.version; // Purely linter fix, remove once import React doesn't cause no-unused-vars and verbatim-module-syntax

/**
 * Props for a StaticBody2D
 *
 * @category PhysicsBody2D
 */
export interface StaticBody2DProps extends PhysicsBody2DProps {
  constant_angular_velocity?: number;
  constant_linear_velocity?: Vector2Type;
  physics_material_override?: PhysicsMaterial;
}

/**
 * A 2D physics body that can't be moved by external forces. When moved manually, it doesn't affect other bodies in its path.
 *
 * @example
 * ```tsx
 * <StaticBody2D>
 *   <CollisionShape2D
 *     shape={createRectangleShape2D({ size: Vector2(2, 3) })}
 *   />
 * </StaticBody2D>
 * ```
 *
 * @category PhysicsBody2D
 * @see https://docs.godotengine.org/en/stable/classes/class_staticbody2d.html
 */
export function StaticBody2D(props: StaticBody2DProps): ReactNode {
  return (
    <GodotNode
      props={props}
      createNode={() => createStaticBody2DNode(props)}
    >
      {props.children}
    </GodotNode>
  );
}

function createStaticBody2DNode(
  props: StaticBody2DProps,
): Node<StaticBody2DProps> {
  const node = createNode<StaticBody2DProps>(props);
  const materialId = createId();
  const nodeName = props.name ?? createId();

  return {
    ...node,
    insertMe(script, parent) {
      script.nodes.push({
        text: `[node name="${nodeName}" type="StaticBody2D"${
          parent ? ` parent="${parent}"` : ""
        }]`,
        props: addCommonProps({
          ...props,
          ...(props.physics_material_override && {
            physics_material_override: {
              typeSpecifier: "SubResource",
              value: `"${materialId}"`,
            },
          }),
        }, script),
      });

      if (props.physics_material_override) {
        script.internal.push({
          text:
            `[sub_resource type="${props.physics_material_override.type}" id="${materialId}"]`,
          props: Object.entries(props.physics_material_override.props).map(
            ([key, value]) => `${key} = ${convertCommonTypes(value)}`,
          ),
        });
      }

      for (const child of node.children) {
        child.insertMe(script, parent ? `${parent}/${nodeName}` : ".");
      }
    },
  };
}
