import type { ReactNode } from "types/react";
import { GodotNode } from "../../../internal/element.ts";
import { createNode, type Node } from "../../../internal/node.ts";
import { addNodeEntry, createId } from "../../../internal/helpers.ts";
import type { RigidBody2DProps } from "@inbestigator/godact";

/**
 * Props for a PhysicalBone2D
 *
 * @category PhysicsBody2D
 */
export interface PhysicalBone2DProps extends RigidBody2DProps {
}

/**
 * A RigidBody2D-derived node used to make Bone2Ds in a Skeleton2D react to physics.
 *
 * @example
 * ```tsx
 * <PhysicalBone2D>
 *   <CollisionShape2D
 *     shape={createRectangleShape2D({ size: Vector2(2, 3) })}
 *   />
 * </PhysicalBone2D>
 * ```
 *
 * @category PhysicsBody2D
 * @see https://docs.godotengine.org/en/stable/classes/class_physicalbone2d.html
 */
export function PhysicalBone2D(props: PhysicalBone2DProps): ReactNode {
  return (
    <GodotNode
      props={props}
      createNode={() => createPhysicalBone2DNode(props)}
    >
      {props.children}
    </GodotNode>
  );
}

function createPhysicalBone2DNode(
  props: PhysicalBone2DProps,
): Node<PhysicalBone2DProps> {
  const node = createNode<PhysicalBone2DProps>(props);
  const nodeName = props.name ?? createId(props);

  return {
    ...node,
    insertMe(script, parent) {
      addNodeEntry({
        type: "PhysicalBone2D",
        name: nodeName,
        parent,
        props: {
          ...props,
        },
        script,
      });

      for (const child of node.children) {
        child.insertMe(script, parent ? `${parent}/${nodeName}` : ".");
      }
    },
  };
}
