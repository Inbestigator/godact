import type { ComponentDefinition } from "../../../parseNodeDefs.ts";
import node2dNode from "./node-2d.node.ts";

export default {
  name: "CollisionShape2D",
  extends: "Node2DProps",
  inherits: node2dNode,
  props: [
    {
      name: "debug_color",
      type: "ColorType",
    },
    {
      name: "disabled",
      type: "boolean",
    },
    {
      name: "one_way_collision",
      type: "boolean",
    },
    {
      name: "one_way_collision_margin",
      type: "number",
    },
    {
      name: "shape",
      type: "Shape2DTypes",
      required: true,
    },
  ],
  category: "Node2D",
  docs: [
    "A 2D game object, inherited by all 2D-related nodes. Has a position, rotation, scale, and Z index.",
    "",
    "@example",
    "```tsx",
    "<Node2D />",
    "```",
  ],
  docsHref:
    "https://docs.godotengine.org/en/stable/classes/class_collisionshape2d.html",
  specialProps: {
    shape: {
      type: "SubResource",
    },
  },
  resources: {
    shape: {
      type: "SubResource",
    },
  },
} as ComponentDefinition;
