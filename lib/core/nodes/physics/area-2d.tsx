import type { ReactNode } from "types/react";
import { GodotNode } from "../../../internal/element.ts";
import { createNode, type Node } from "../../../internal/node.ts";
import { addNodeEntry, createId } from "../../../internal/helpers.ts";
import type { CollisionObject2DProps, Vector2Type } from "@inbestigator/godact";

/**
 * Props for a Area2D
 *
 * @category PhysicsBody2D
 */
export interface Area2DProps extends CollisionObject2DProps {
  angular_damp?: number;
  angular_damp_space_override?: 0 | 1 | 2 | 3 | 4;
  audio_bus_name?: string;
  audio_bus_override?: boolean;
  gravity?: number;
  gravity_direction?: Vector2Type;
  gravity_point?: boolean;
  gravity_point_center?: Vector2Type;
  gravity_point_unit_distance?: number;
  gravity_space_override?: 0 | 1 | 2 | 3 | 4;
  linear_damp?: number;
  linear_damp_space_override?: 0 | 1 | 2 | 3 | 4;
  monitorable?: boolean;
  monitoring?: boolean;
  priority?: number;
}

/**
 * A region of 2D space that detects other CollisionObject2Ds entering or exiting it.
 *
 * @example
 * ```tsx
 * <Area2D>
 *   <CollisionShape2D
 *     shape={createRectangleShape2D({ size: Vector2(2, 3) })}
 *   />
 * </Area2D>
 * ```
 *
 * @category PhysicsBody2D
 * @see https://docs.godotengine.org/en/stable/classes/class_area2d.html
 */
export function Area2D(props: Area2DProps): ReactNode {
  return (
    <GodotNode props={props} createNode={() => createArea2DNode(props)}>
      {props.children}
    </GodotNode>
  );
}

function createArea2DNode(props: Area2DProps): Node<Area2DProps> {
  const node = createNode<Area2DProps>(props);
  const nodeName = props.name ?? createId(props);

  return {
    ...node,
    insertMe(script, parent) {
      addNodeEntry({
        type: "Area2D",
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
