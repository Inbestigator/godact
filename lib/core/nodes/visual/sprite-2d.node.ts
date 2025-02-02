import type { ComponentDefinition } from "../../../../parseNodeDefs.ts";
import node2dNode from "../node-2d.node.ts";

export default {
  name: "Sprite2D",
  extends: "Node2DProps",
  inherits: node2dNode,
  props: [
    {
      name: "centered",
      type: "boolean",
    },
    {
      name: "flip_h",
      type: "boolean",
    },
    {
      name: "flip_v",
      type: "boolean",
    },
    {
      name: "frame",
      type: "number",
    },
    {
      name: "frame_coords",
      type: "Vector2Type",
    },
    {
      name: "hframes",
      type: "number",
    },
    {
      name: "offset",
      type: "Vector2Type",
    },
    {
      name: "region_enabled",
      type: "boolean",
    },
    {
      name: "region_filter_clip_enabled",
      type: "boolean",
    },
    {
      name: "region_rect",
      type: "Rect2Type",
    },
    {
      name: "texture",
      type: "Texture2D",
    },
    {
      name: "vframes",
      type: "number",
    },
  ],
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
  specialProps: {
    texture: {
      type: "ExtResource",
    },
  },
  resources: {
    texture: {
      type: "Custom",

      value:
        'script.external.push({text:`[ext_resource type="Texture2D" path="${props.texture.props.path}" id="${resourceIds[0]}"]`,});',
    },
  },
} as ComponentDefinition;
