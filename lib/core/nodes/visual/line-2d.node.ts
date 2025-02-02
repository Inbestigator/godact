import type { ComponentDefinition } from "../../../../parseNodeDefs.ts";
import node2dNode from "../node-2d.node.ts";

export default {
  name: "Line2D",
  extends: "Node2DProps",
  inherits: node2dNode,
  props: [
    {
      name: "antialiased",
      type: "boolean",
    },
    {
      name: "begin_cap_mode",
      type: "0 | 1 | 2",
    },
    {
      name: "closed",
      type: "boolean",
    },
    {
      name: "default_color",
      type: "ColorType",
    },
    {
      name: "end_cap_mode",
      type: "0 | 1 | 2",
    },
    {
      name: "gradient",
      type: "Gradient",
    },
    {
      name: "joint_mode",
      type: "0 | 1 | 2",
    },
    {
      name: "points",
      type: "PackedArrayType<Vector2Type>",
    },
    {
      name: "round_precision",
      type: "number",
    },
    {
      name: "sharp_limit",
      type: "number",
    },
    {
      name: "width",
      type: "number",
    },
    {
      name: "width_curve",
      type: "Curve",
    },
  ],
  category: "Visual",
  docs: [
    "A 2D polyline that can optionally be textured.",
    "",
    "@example",
    "```tsx",
    "<Line2D />",
    "```",
  ],
  docsHref: "https://docs.godotengine.org/en/stable/classes/class_line2d.html",
  specialProps: {
    gradient: {
      type: "SubResource",
    },
    width_curve: {
      type: "SubResource",
    },
  },
  resources: {
    gradient: {
      type: "SubResource",
    },
    width_curve: {
      type: "SubResource",
    },
  },
} as ComponentDefinition;
