// @ts-types="@types/react"
import React, { type ReactNode } from "react";
import { GodotNode } from "../../../internal/element.ts";
import { createNode, type Node } from "../../../internal/node.ts";
import {
  addCommonProps,
  addNodeEntry,
  createId,
} from "../../../internal/helpers.ts";
import type { Vector2Type } from "../../types/vectors.ts";
import type { Node2DProps } from "../node-2d.tsx";
import type { SpriteFrames } from "../../resources/sprite-frames.ts";

React.version; // Purely linter fix, remove once import React doesn't cause no-unused-vars and verbatim-module-syntax

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
 * General-purpose sprite node.
 *
 * @prop animation
 *
 * **Must** be placed after the `sprite_frames` prop to take effect.
 *
 * @example
 * ```tsx
 * <AnimatedSprite2D
 *   sprite_frames={createSpriteFrames([...])}
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
  const framesId = createId();
  const nodeName = props.name ?? createId();

  return {
    ...node,
    insertMe(script, parent) {
      addNodeEntry({
        type: "AnimatedSprite2D",
        name: nodeName,
        parent,
        props: {
          ...props,
          ...(props.sprite_frames && {
            sprite_frames: {
              typeSpecifier: "SubResource",
              value: `"${framesId}"`,
            },
          }),
        },
        script,
      });

      if (props.sprite_frames) {
        script.internal.push({
          text: `[sub_resource type="SpriteFrames" id="${framesId}"]`,
          props: addCommonProps({
            ...(props.sprite_frames && {
              animations: {
                typeSpecifier: "Verbatim",
                value: `[${
                  props.sprite_frames.props.map(
                    (animation) => {
                      const ids = animation.frames.map(() => createId());
                      animation.frames.forEach((frame, i) => {
                        script.external.push({
                          text:
                            `[ext_resource type="Texture2D" path="${frame.texture.props.path}" id="${
                              ids[i]
                            }"]`,
                        });
                      });

                      return `{"frames":[${
                        animation.frames.map((
                          frame,
                          i,
                        ) => (`{"duration":${frame.duration},"texture":ExtResource("${
                          ids[i]
                        }")}`)).join(",")
                      }],"loop":${animation.loop},"name":"${animation.name}","speed":${animation.speed}}`;
                    },
                  ).join(",")
                }]`,
              },
            }),
          }, script),
        });
      }

      for (const child of node.children) {
        child.insertMe(script, parent ? `${parent}/${nodeName}` : ".");
      }
    },
  };
}
