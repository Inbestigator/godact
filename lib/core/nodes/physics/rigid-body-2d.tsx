// @ts-types="@types/react"
import React, { type ReactNode } from "react";
import { GodotNode } from "../../../internal/element.ts";
import { createNode, type Node } from "../../../internal/node.ts";
import {
  addNodeEntry,
  convertCommonTypes,
  createId,
} from "../../../internal/helpers.ts";
import type { PhysicsBody2DProps } from "./physics-props.ts";
import type { Vector2Type } from "../../types/vectors.ts";
import type { PhysicsMaterial } from "../../resources/physics/physics-material.ts";

React.version; // Purely linter fix, remove once import React doesn't cause no-unused-vars and verbatim-module-syntax

/**
 * Props for a RigidBody2D
 *
 * @category PhysicsBody2D
 */
export interface RigidBody2DProps extends PhysicsBody2DProps {
  angular_damp?: number;
  angular_damp_mode?: 0 | 1;
  angular_velocity?: number;
  can_sleep?: boolean;
  center_of_mass?: Vector2Type;
  center_of_mass_mode?: 0 | 1;
  constant_force?: Vector2Type;
  constant_torque?: number;
  contact_monitor?: boolean;
  continuous_cd?: 0 | 1 | 2;
  custom_integrator?: boolean;
  freeze?: boolean;
  freeze_mode?: 0 | 1;
  gravity_scale?: number;
  inertia?: number;
  linear_damp?: number;
  linear_damp_mode?: 0 | 1;
  linear_velocity?: Vector2Type;
  lock_rotation?: boolean;
  mass?: number;
  max_contacts_reported?: number;
  physics_material_override?: PhysicsMaterial;
  sleeping?: boolean;
}

/**
 * A 2D physics body that is moved by a physics simulation.
 *
 * @example
 * ```tsx
 * <RigidBody2D>
 *   <CollisionShape2D
 *     shape={createRectangleShape2D({ size: Vector2(2, 3) })}
 *   />
 * </RigidBody2D>
 * ```
 *
 * @category PhysicsBody2D
 * @see https://docs.godotengine.org/en/stable/classes/class_rigidbody2d.html
 */
export function RigidBody2D(props: RigidBody2DProps): ReactNode {
  return (
    <GodotNode
      props={props}
      createNode={() => createRigidBody2DNode(props)}
    >
      {props.children}
    </GodotNode>
  );
}

function createRigidBody2DNode(
  props: RigidBody2DProps,
): Node<RigidBody2DProps> {
  const node = createNode<RigidBody2DProps>(props);
  const materialId = createId();
  const nodeName = props.name ?? createId();

  return {
    ...node,
    insertMe(script, parent) {
      addNodeEntry({
        type: "RigidBody2D",
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
