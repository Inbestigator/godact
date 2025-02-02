import type { ReactNode } from "types/react";
import { GodotNode } from "../../../internal/element.ts";
import { createNode, type Node } from "../../../internal/node.ts";
import {
  addCommonProps,
  addNodeEntry,
  createId,
} from "../../../internal/helpers.ts";
import type { StaticBody2DProps } from "@inbestigator/godact";

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
  const resourceIds = new Array(100).fill(createId());
  const nodeName = props.name ?? createId(props);

  return {
    ...node,
    insertMe(script, parent) {
      addNodeEntry({
        type: "AnimatableBody2D",
        name: nodeName,
        parent,
        props: {
          ...props,
          ...(props.physics_material_override &&
            {
              physics_material_override: {
                typeSpecifier: "SubResource",
                value: `"${resourceIds[0]}"`,
              },
            }),
        },
        script,
      });

      if (props.physics_material_override) {
        script.internal.push({
          text:
            `[sub_resource type="${props.physics_material_override.type}" id="${
              resourceIds[0]
            }"]`,
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
