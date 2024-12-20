// @ts-types="@types/react"
import React, { type ReactNode } from "react";
import { GodotNode } from "../../../internal/element.ts";
import { createNode, type Node } from "../../../internal/node.ts";
import { addNodeEntry, createId } from "../../../internal/helpers.ts";
import type { Node2DProps } from "../node-2d.tsx";
import type { PackedArrayType } from "../../types/packed-array.ts";
import type { ByteType } from "../../types/byte.ts";
import type { TileSet } from "../../resources/tile-set.ts";

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
  tile_map_data?: PackedArrayType<ByteType>;
  tile_set?: TileSet;
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
  const resourceIds = new Array(100).fill(createId());
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
          ...(props.tile_set &&
            {
              tile_set: {
                typeSpecifier: "ExtResource",
                value: `"${resourceIds[0]}"`,
              },
            }),
        },
        script,
      });

      if (props.tile_set) {
        script.external.push({
          text:
            `[ext_resource type="TileSet" path="${props.tile_set.props.path}" id="${
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
