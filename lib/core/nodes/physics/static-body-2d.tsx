import type { ReactNode } from "types/react";
import { GodotNode } from "../../../internal/element.ts";
import { createNode, type Node } from "../../../internal/node.ts";
import { addNodeEntry, createId } from "../../../internal/helpers.ts";
import type {
  PhysicsBody2DProps,
  PhysicsMaterial,
  Vector2Type,
} from "@inbestigator/godact";

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
  const nodeName = props.name ?? createId(props);

  return {
    ...node,
    insertMe(script, parent) {
      addNodeEntry({
        type: "StaticBody2D",
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
