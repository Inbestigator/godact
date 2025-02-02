import type { ComponentDefinition } from "../../../../parseNodeDefs.ts";
import node2dNode from "../node-2d.node.ts";

export default {
  name: "Camera2D",
  extends: "Node2DProps",
  inherits: node2dNode,
  props: [
    {
      name: "anchor_mode",
      type: "0 | 1",
    },
    {
      name: "custom_viewport",
      type: "null",
    },
    {
      name: "drag_bottom_margin",
      type: "number",
    },
    {
      name: "drag_horizontal_enabled",
      type: "boolean",
    },
    {
      name: "drag_horizontal_offset",
      type: "number",
    },
    {
      name: "drag_left_margin",
      type: "number",
    },
    {
      name: "drag_right_margin",
      type: "number",
    },
    {
      name: "drag_top_margin",
      type: "number",
    },
    {
      name: "drag_vertical_enabled",
      type: "boolean",
    },
    {
      name: "drag_vertical_offset",
      type: "number",
    },
    {
      name: "editor_draw_drag_margin",
      type: "boolean",
    },
    {
      name: "editor_draw_limits",
      type: "boolean",
    },
    {
      name: "editor_draw_screen",
      type: "boolean",
    },
    {
      name: "enabled",
      type: "boolean",
    },
    {
      name: "ignore_rotation",
      type: "boolean",
    },
    {
      name: "limit_bottom",
      type: "number",
    },
    {
      name: "limit_left",
      type: "number",
    },
    {
      name: "limit_right",
      type: "number",
    },
    {
      name: "limit_smoothed",
      type: "boolean",
    },
    {
      name: "limit_top",
      type: "number",
    },
    {
      name: "offset",
      type: "Vector2Type",
    },
    {
      name: "position_smoothing_enabled",
      type: "boolean",
    },
    {
      name: "position_smoothing_speed",
      type: "number",
    },
    {
      name: "zoom",
      type: "Vector2Type",
    },
  ],
  category: "Visual",
  docs: [
    "Camera node for 2D scenes. // TODO custom_viewport",
    "",
    "@example",
    "```tsx",
    "<Camera2D />",
    "```",
  ],
  docsHref:
    "https://docs.godotengine.org/en/stable/classes/class_camera2d.html",
  specialProps: {},
  resources: {},
} as ComponentDefinition;
