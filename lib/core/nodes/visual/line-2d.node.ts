import type { ComponentDefinition } from "../../../../parseNodeDefs.ts";
import node2dNode from "../node-2d.node.ts";

export default {
  name: "Line2D",
  extends: "Node2DProps",
  inherits: node2dNode,
  props: {
    antialiased: "boolean",
    begin_cap_mode: "0 | 1 | 2",
    closed: "boolean",
    default_color: "ColorType",
    end_cap_mode: "0 | 1 | 2",
    gradient: "Gradient",
    joint_mode: "0 | 1 | 2",
    points: "PackedArrayType<Vector2Type>",
    round_precision: "number",
    sharp_limit: "number",
    width: "number",
    width_curve: "Curve",
  },
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
} as ComponentDefinition;
