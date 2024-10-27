// @ts-types="@types/react"
import React, { type ReactNode } from "react";
import { GodotNode } from "../../internal/element.ts";
import { createNode, type Node } from "../../internal/node.ts";
import { addNodeEntry, createId } from "../../internal/helpers.ts";
import type { Node2DProps } from "./node-2d.tsx";

React.version; // Purely linter fix, remove once import React doesn't cause no-unused-vars and verbatim-module-syntax

/**
 * Props for a TileMapLayer
 *
 * @category Visual
 */
export interface TileMapLayerProps extends Node2DProps {
  collision_enabled?: boolean;
  collision_visibility_mode?: 0 | 1 | 2;
  enabled?: boolean;
  navigation_enabled?: boolean;
  navigation_visibility_mode?: 0 | 1 | 2;
  rendering_quadrant_size?: number;
  tile_map_data?: null; // TODO Type: PackedByteArray
  tile_set?: null; // TODO Type: TileSet
  use_kinematic_bodies?: boolean;
  x_draw_order_reversed?: boolean;
  y_sort_origin?: number;
}

/**
 * A region of 2D space that detects other CollisionObject2Ds entering or exiting it.
 *
 * @example
 * ```tsx
 * <TileMapLayer />
 * ```
 *
 * @category Visual
 * @see https://docs.godotengine.org/en/stable/classes/class_tilemaplayer.html
 */
export function TileMapLayer(props: TileMapLayerProps): ReactNode {
  return (
    <GodotNode
      props={props}
      createNode={() => createTileMapLayerNode(props)}
    >
      {props.children}
    </GodotNode>
  );
}

function createTileMapLayerNode(
  props: TileMapLayerProps,
): Node<TileMapLayerProps> {
  const node = createNode<TileMapLayerProps>(props);
  const nodeName = props.name ?? createId();

  return {
    ...node,
    insertMe(script, parent) {
      addNodeEntry({
        type: "TileMapLayer",
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
