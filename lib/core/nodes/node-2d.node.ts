import type { ComponentDefinition } from "../../../parseNodeDefs.ts";

export default {
  name: "Node2D",
  extends: "CanvasItemProps",
  props: {
    position: "Vector2Type",
    rotation: "number",
    scale: "Vector2Type",
    skew: "number",
    children: "ReactNode",
    transform: "Transform2D",
  },
  category: "Primitive",
  docs: [
    "A 2D game object, inherited by all 2D-related nodes. Has a position, rotation, scale, and Z index.",
    "",
    "@example",
    "```tsx",
    "<Node2D />",
    "```",
  ],
  docsHref: "https://docs.godotengine.org/en/stable/classes/class_node2d.html",
  specialProps: {},
  resources: {},
} as ComponentDefinition;
