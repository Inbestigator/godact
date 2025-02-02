import type { ComponentDefinition } from "../../../../parseNodeDefs.ts";
import node2dNode from "../node-2d.node.ts";

export default {
  name: "TileMapLayer",
  extends: "Node2DProps",
  inherits: node2dNode,
  props: [
    {
      name: "collision_enabled",
      type: "boolean",
    },
    {
      name: "collision_visibility_mode",
      type: "0 | 1 | 2",
    },
    {
      name: "enabled",
      type: "boolean",
    },
    {
      name: "navigation_enabled",
      type: "boolean",
    },
    {
      name: "navigation_visibility_mode",
      type: "0 | 1 | 2",
    },
    {
      name: "rendering_quadrant_size",
      type: "number",
    },
    {
      name: "tile_map_data",
      type: "PackedArrayType<ByteType>",
    },
    {
      name: "tile_set",
      type: "TileSet",
    },
    {
      name: "use_kinematic_bodies",
      type: "boolean",
    },
    {
      name: "x_draw_order_reversed",
      type: "boolean",
    },
    {
      name: "y_sort_origin",
      type: "number",
    },
  ],
  category: "Visual",
  docs: [
    "A region of 2D space that detects other CollisionObject2Ds entering or exiting it.",
    "",
    "@example",
    "```tsx",
    "<TileMapLayer />",
    "```",
  ],
  docsHref:
    "https://docs.godotengine.org/en/stable/classes/class_tilemaplayer.html",
  specialProps: {
    tile_set: {
      type: "ExtResource",
    },
  },
  resources: {
    tile_set: {
      type: "Custom",

      value:
        'script.external.push({text:`[ext_resource type="TileSet" path="${props.tile_set.props.path}" id="${resourceIds[0]}"]`,});',
    },
  },
} as ComponentDefinition;
