// @ts-types="@types/react"
import React, { type ReactNode } from "react";
import { GodotNode } from "../../../internal/element.ts";
import { createNode, type Node } from "../../../internal/node.ts";
import { addNodeEntry, createId } from "../../../internal/helpers.ts";
import type { Rect2Type, Vector2Type } from "../../types/vectors.ts";
import type { Texture2D } from "../../resources/texture-2d.ts";
import type { Node2DProps } from "../node-2d.tsx";

React.version; // Purely linter fix, remove once import React doesn't cause no-unused-vars and verbatim-module-syntax

/**
 * Props for a Sprite2D
 *
 * @category Visual
 */
export interface Sprite2DProps extends Node2DProps {
  centered?: boolean;
  flip_h?: boolean;
  flip_v?: boolean;
  frame?: number;
  frame_coords?: Vector2Type;
  hframes?: number;
  offset?: Vector2Type;
  region_enabled?: boolean;
  region_filter_clip_enabled?: boolean;
  region_rect?: Rect2Type;
  texture?: Texture2D;
  vframes?: number;
}

/**
 * General-purpose sprite node.
 *
 * @example
 * ```tsx
 * <Sprite2D
 *   material={createTexture2D({ path: "res://icon.svg" })}
 * />
 * ```
 *
 * @category Visual
 * @see https://docs.godotengine.org/en/stable/classes/class_sprite2d.html
 */
export function Sprite2D(props: Sprite2DProps): ReactNode {
  return (
    <GodotNode props={props} createNode={() => createSprite2DNode(props)}>
      {props.children}
    </GodotNode>
  );
}

function createSprite2DNode(props: Sprite2DProps): Node<Sprite2DProps> {
  const node = createNode<Sprite2DProps>(props);
  const resourceIds = new Array(100).fill(createId());
  const nodeName = props.name ?? createId();

  return {
    ...node,
    insertMe(script, parent) {
      addNodeEntry({
        type: "Sprite2D",
        name: nodeName,
        parent,
        props: {
          ...props,
          ...(props.texture &&
            {
              texture: {
                typeSpecifier: "ExtResource",
                value: `"${resourceIds[0]}"`,
              },
            }),
        },
        script,
      });

      if (props.texture) {
        script.external.push({
          text:
            `[ext_resource type="Texture2D" path="${props.texture.props.path}" id="${
              resourceIds[0]
            }"]`,
        });
      }

      for (const child of node.children) {
        child.insertMe(script, parent ? `${parent}/${nodeName}` : ".");
      }
    },
  };
}
