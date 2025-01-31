// @ts-types="@types/react"
import React, { type ReactNode } from "react";
import { GodotNode } from "../../../internal/element.ts";
import { createNode, type Node } from "../../../internal/node.ts";
import { addNodeEntry, createId } from "../../../internal/helpers.ts";
import type { Node2DProps, Vector2Type } from "@inbestigator/godact";

React.version; // Purely linter fix, remove once import React doesn't cause no-unused-vars and verbatim-module-syntax

/**
 * Props for a Camera2D
 *
 * @category Visual
 */
export interface Camera2DProps extends Node2DProps {
  anchor_mode?: 0 | 1;
  custom_viewport?: null;
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
 * Camera node for 2D scenes. // TODO custom_viewport
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
  const nodeName = props.name ?? createId(props);

  return {
    ...node,
    insertMe(script, parent) {
      addNodeEntry({
        type: "Camera2D",
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
