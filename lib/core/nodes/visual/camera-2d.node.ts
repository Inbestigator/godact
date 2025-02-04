import type { ComponentDefinition } from "../../../../parseNodeDefs.ts";
import node2dNode from "../node-2d.node.ts";

export default {
  name: "Camera2D",
  extends: "Node2DProps",
  inherits: node2dNode,
  props: {
    anchor_mode: "0 | 1",
    // custom_viewport?: Node; AFAIK this is not in the editor, so it will be ommitted for now
    drag_bottom_margin: "number",
    drag_horizontal_enabled: "boolean",
    drag_horizontal_offset: "number",
    drag_left_margin: "number",
    drag_right_margin: "number",
    drag_top_margin: "number",
    drag_vertical_enabled: "boolean",
    drag_vertical_offset: "number",
    editor_draw_drag_margin: "boolean",
    editor_draw_limits: "boolean",
    editor_draw_screen: "boolean",
    enabled: "boolean",
    ignore_rotation: "boolean",
    limit_bottom: "number",
    limit_left: "number",
    limit_right: "number",
    limit_smoothed: "boolean",
    limit_top: "number",
    offset: "Vector2Type",
    position_smoothing_enabled: "boolean",
    position_smoothing_speed: "number",
    zoom: "Vector2Type",
  },
  category: "Visual",
  docs: [
    "Camera node for 2D scenes.",
    "",
    "@example",
    "```tsx",
    "<Camera2D />",
    "```",
  ],
  docsHref:
    "https://docs.godotengine.org/en/stable/classes/class_camera2d.html",
} as ComponentDefinition;
