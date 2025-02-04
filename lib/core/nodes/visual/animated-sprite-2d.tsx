import type { ReactNode } from "types/react";
import { GodotNode } from "../../../internal/element.ts";
import { createNode, type Node } from "../../../internal/node.ts";
import { addNodeEntry, createId } from "../../../internal/helpers.ts";
import type {
  Node2DProps,
  SpriteFrames,
  Vector2Type,
} from "@inbestigator/godact";

/**
 * Props for a AnimatedSprite2D
 *
 * @category Visual
 */
export interface AnimatedSprite2DProps extends Node2DProps {
  animation?: string;
  autoplay?: string;
  centered?: boolean;
  flip_h?: boolean;
  flip_v?: boolean;
  frame?: number;
  frame_progress?: number;
  offset?: Vector2Type;
  speed_scale?: number;
  sprite_frames?: SpriteFrames;
}

/**
 * Sprite node that contains multiple textures as frames to play for animation.
 *
 * @prop animation
 * **Must** be placed after the `sprite_frames` prop to take effect.
 *
 * @example
 * ```tsx
 * <AnimatedSprite2D
 *   sprite_frames={createSpriteFrames(...)}
 *   animation="icon"
 * />
 * ```
 *
 * @category Visual
 * @see https://docs.godotengine.org/en/stable/classes/class_animatedsprite2d.html
 */
export function AnimatedSprite2D(props: AnimatedSprite2DProps): ReactNode {
  return (
    <GodotNode
      props={props}
      createNode={() => createAnimatedSprite2DNode(props)}
    >
      {props.children}
    </GodotNode>
  );
}

function createAnimatedSprite2DNode(
  props: AnimatedSprite2DProps,
): Node<AnimatedSprite2DProps> {
  const node = createNode<AnimatedSprite2DProps>(props);
  const nodeName = props.name ?? createId(props);

  return {
    ...node,
    insertMe(script, parent) {
      addNodeEntry({
        type: "AnimatedSprite2D",
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
