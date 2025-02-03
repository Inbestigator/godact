import type { ComponentDefinition } from "../../../../parseNodeDefs.ts";
import node2dNode from "../node-2d.node.ts";

export default {
  name: "AnimatedSprite2D",
  extends: "Node2DProps",
  inherits: node2dNode,
  props: {
    animation: "string",
    autoplay: "string",
    centered: "boolean",
    flip_h: "boolean",
    flip_v: "boolean",
    frame: "number",
    frame_progress: "number",
    offset: "Vector2Type",
    speed_scale: "number",
    sprite_frames: "SpriteFrames",
  },
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
        'script.internal.push({ type: "SpriteFrames", id: {ID}, props: addCommonProps({ ...(props.sprite_frames && { animations: { type: "Verbatim", value: `[${props.sprite_frames.props.map((animation) => { const ids = animation.frames.map(() => createId()); animation.frames.forEach((frame, i) => { script.external.push({ type: "Texture2D", id: ids[i], inlineArgs: { path: frame.texture.props.path } }); }); return `{"frames":[${animation.frames.map((frame, i) => (`{"duration":${frame.duration},"texture":ExtResource("${ids[i]}")}`)).join(",")}],"loop":${animation.loop},"name":"${animation.name}","speed":${animation.speed}}`; }).join(",")}]`, }, }), }, script), });',
    },
  },
} as ComponentDefinition;
