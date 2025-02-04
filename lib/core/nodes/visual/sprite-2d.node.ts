import type { ComponentDefinition } from "../../../../parseNodeDefs.ts";
import node2dNode from "../node-2d.node.ts";

export default {
  name: "Sprite2D",
  extends: "Node2DProps",
  inherits: node2dNode,
  props: {
    centered: "boolean",
    flip_h: "boolean",
    flip_v: "boolean",
    frame: "number",
    frame_coords: "Vector2Type",
    hframes: "number",
    offset: "Vector2Type",
    region_enabled: "boolean",
    region_filter_clip_enabled: "boolean",
    region_rect: "Rect2Type",
    texture: "Texture2D",
    vframes: "number",
  },
  category: "Visual",
  docs: [
    "General-purpose sprite node.",
    "",
    "@example",
    "```tsx",
    "<Sprite2D",
    '  material={createTexture2D({ path: "res://icon.svg" })}',
    "/>",
    "```",
  ],
  docsHref:
    "https://docs.godotengine.org/en/stable/classes/class_sprite2d.html",
} as ComponentDefinition;
