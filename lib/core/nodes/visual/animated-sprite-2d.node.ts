import type { ComponentDefinition } from "../../../../parseNodeDefs.ts";
import node2dNode from "../node-2d.node.ts";

export default {
  name: "AnimatedSprite2D",
  extends: "Node2DProps",
  inherits: node2dNode,
  props: [
    {
      name: "animation",
      type: "string",
    },
    {
      name: "autoplay",
      type: "string",
    },
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
      name: "frame_progress",
      type: "number",
    },
    {
      name: "offset",
      type: "Vector2Type",
    },
    {
      name: "speed_scale",
      type: "number",
    },
    {
      name: "sprite_frames",
      type: "SpriteFrames",
    },
  ],
  category: "Visual",
  docs: [
    "Sprite node that contains multiple textures as frames to play for animation.",
    "",
    "@prop animation",
    "**Must** be placed after the `sprite_frames` prop to take effect.",
    "",
    "@example",
    "```tsx",
    "<AnimatedSprite2D",
    "  sprite_frames={createSpriteFrames([...])}",
    '  animation="icon"',
    "/>",
    "```",
  ],
  docsHref:
    "https://docs.godotengine.org/en/stable/classes/class_animatedsprite2d.html",
  specialProps: {
    sprite_frames: {
      type: "SubResource",
    },
  },
  resources: {
    sprite_frames: {
      type: "Custom",

      value:
        'script.internal.push({ text: `[sub_resource type="SpriteFrames" id="${{ID}}"]`, props: addCommonProps({ ...(props.sprite_frames && { animations: { typeSpecifier: "Verbatim", value: `[${props.sprite_frames.props.map((animation) => { const ids = animation.frames.map(() => createId()); animation.frames.forEach((frame, i) => { script.external.push({ text: `[ext_resource type="Texture2D" path="${frame.texture.props.path}" id="${ids[i]}"]`, }); }); return `{"frames":[${animation.frames.map((frame, i) => (`{"duration":${frame.duration},"texture":ExtResource("${ids[i]}")}`)).join(",")}],"loop":${animation.loop},"name":"${animation.name}","speed":${animation.speed}}`; }).join(",")}]`, }, }), }, script), });',
    },
  },
} as ComponentDefinition;
