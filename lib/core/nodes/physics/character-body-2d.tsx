import type { ReactNode } from "types/react";
import { GodotNode } from "../../../internal/element.ts";
import { createNode, type Node } from "../../../internal/node.ts";
import { addNodeEntry, createId } from "../../../internal/helpers.ts";
import type { PhysicsBody2DProps, Vector2Type } from "@gdx/godact";

/**
 * Props for a CharacterBody2D
 *
 * @category PhysicsBody2D
 */
export interface CharacterBody2DProps extends PhysicsBody2DProps {
  floor_block_on_wall?: boolean;
  floor_constant_speed?: boolean;
  floor_max_angle?: number;
  floor_snap_length?: number;
  floor_stop_on_slope?: boolean;
  max_slides?: number;
  motion_mode?: 0 | 1;
  platform_floor_layers?: number;
  platform_on_leave?: 0 | 1 | 2;
  platform_wall_layers?: number;
  safe_margin?: number;
  slide_on_ceiling?: boolean;
  up_direction?: Vector2Type;
  velocity?: Vector2Type;
  wall_min_slide_angle?: number;
}

/**
 * A 2D physics body specialized for characters moved by script.
 *
 * @example
 * ```tsx
 * <CharacterBody2D name="Player">
 *   <CollisionShape2D
 *     shape={createRectangleShape2D({ size: Vector2(2, 3) })}
 *   />
 * </CharacterBody2D>
 * ```
 *
 * @category PhysicsBody2D
 * @see https://docs.godotengine.org/en/stable/classes/class_characterbody2d.html
 */
export function CharacterBody2D(props: CharacterBody2DProps): ReactNode {
  return (
    <GodotNode
      props={props}
      createNode={() => createCharacterBody2DNode(props)}
    >
      {props.children}
    </GodotNode>
  );
}

function createCharacterBody2DNode(
  props: CharacterBody2DProps,
): Node<CharacterBody2DProps> {
  const node = createNode<CharacterBody2DProps>(props);
  const nodeName = props.name ?? createId(props);

  return {
    ...node,
    insertMe(script, parent) {
      addNodeEntry({
        type: "CharacterBody2D",
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
