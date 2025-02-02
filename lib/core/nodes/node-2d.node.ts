import type { ComponentDefinition } from "../../../parseNodeDefs.ts";

export default {
  name: "Node2D",
  extends: "CanvasItemProps",
  props: [
    {
      name: "position",
      type: "Vector2Type",
    },
    {
      name: "rotation",
      type: "number",
    },
    {
      name: "scale",
      type: "Vector2Type",
    },
    {
      name: "skew",
      type: "number",
    },
    {
      name: "children",
      type: "ReactNode",
    },
    {
      name: "transform",
      type: "Transform2D",
    },
  ],
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
