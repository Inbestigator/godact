// @ts-types="@types/react"
import React, { type ReactNode } from "react";
import { GodotNode } from "../../internal/element.ts";
import { createNode, type Node } from "../../internal/node.ts";
import { addCommonProps, createId } from "./node.ts";
import type { Node2DProps } from "./node-2d.tsx";
import type { Vector2Type } from "../types/vectors.ts";

React.version; // Purely linter fix, remove once import React doesn't cause no-unused-vars and verbatim-module-syntax

/**
 * Props for a Camera2D
 *
 * @category Primitive
 */
export interface Camera2DProps extends Node2DProps {
  anchor_mode?: 0 | 1;
  custom_viewport?: null; // TODO createNode
  drag_bottom_margin?: number;
  drag_horizontal_enabled?: boolean;
  drag_horizontal_offset?: number;
  drag_left_margin?: number;
  drag_right_margin?: number;
  drag_top_margin?: number;
  drag_vertical_enabled?: boolean;
  drag_vertical_offset?: number;
  editor_draw_drag_margin?: boolean;
  editor_draw_limits?: boolean;
  editor_draw_screen?: boolean;
  enabled?: boolean;
  ignore_rotation?: boolean;
  limit_bottom?: number;
  limit_left?: number;
  limit_right?: number;
  limit_smoothed?: boolean;
  limit_top?: number;
  offset?: Vector2Type;
  position_smoothing_enabled?: boolean;
  position_smoothing_speed?: number;
  zoom?: Vector2Type;
}

/**
 * Camera node for 2D scenes.
 *
 * @example
 * ```tsx
 * <Camera2D />
 * ```
 *
 * @category Visual
 * @see https://docs.godotengine.org/en/stable/classes/class_camera2d.html
 */
export function Camera2D(props: Camera2DProps): ReactNode {
  return (
    <GodotNode props={props} createNode={() => createCamera2DNode(props)}>
      {props.children}
    </GodotNode>
  );
}

function createCamera2DNode(props: Camera2DProps): Node<Camera2DProps> {
  const node = createNode<Camera2DProps>(props);
  const nodeName = props.name ?? createId();

  return {
    ...node,
    insertMe(script, parent) {
      script.nodes.push({
        text: `[node name="${nodeName}" type="Camera2D"${
          parent ? ` parent="${parent}"` : ""
        }]`,
        props: addCommonProps({ ...props }, script),
      });

      for (const child of node.children) {
        child.insertMe(script, parent ? `${parent}/${nodeName}` : ".");
      }
    },
  };
}