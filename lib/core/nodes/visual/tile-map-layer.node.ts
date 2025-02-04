import type { ComponentDefinition } from "../../../../parseNodeDefs.ts";
import node2dNode from "../node-2d.node.ts";

export default {
  name: "TileMapLayer",
  extends: "Node2DProps",
  inherits: node2dNode,
  props: {
    collision_enabled: "boolean",
    collision_visibility_mode: "0 | 1 | 2",
    enabled: "boolean",
    navigation_enabled: "boolean",
    navigation_visibility_mode: "0 | 1 | 2",
    rendering_quadrant_size: "number",
    tile_map_data: "PackedArrayType<ByteType>",
    tile_set: "TileSet",
    use_kinematic_bodies: "boolean",
    x_draw_order_reversed: "boolean",
    y_sort_origin: "number",
  },
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
} as ComponentDefinition;
