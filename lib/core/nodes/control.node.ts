import type { ComponentDefinition } from "../../../parseNodeDefs.ts";

export default {
  name: "Control",
  extends: "CanvasItemProps",
  props: [
    {
      name: "anchor_bottom",
      type: "number",
    },
    {
      name: "anchor_left",
      type: "number",
    },
    {
      name: "anchor_right",
      type: "number",
    },
    {
      name: "anchor_top",
      type: "number",
    },
    {
      name: "auto_translate",
      type: "boolean",
    },
    {
      name: "clip_contents",
      type: "boolean",
    },
    {
      name: "custom_minimum_size",
      type: "Vector2Type",
    },
    {
      name: "focus_mode",
      type: "0 | 1 | 2",
    },
    {
      name: "focus_neighbour_bottom",
      type: "NodePathType",
    },
    {
      name: "focus_neighbour_left",
      type: "NodePathType",
    },
    {
      name: "focus_neighbour_right",
      type: "NodePathType",
    },
    {
      name: "focus_neighbour_top",
      type: "NodePathType",
    },

    {
      name: "focus_next",
      type: "NodePathType",
    },
    {
      name: "focus_previous",
      type: "NodePathType",
    },
    {
      name: "global_position",
      type: "Vector2Type",
    },
    {
      name: "grow_horizontal",
      type: "0 | 1 | 2",
    },
    {
      name: "grow_vertical",
      type: "0 | 1 | 2",
    },
    {
      name: "layout_direction",
      type: "0 | 1 | 2 | 3",
    },
    {
      name: "localize_numeral_system",
      type: "boolean",
    },
    {
      name: "mouse_default_cursor_shape",
      type:
        "0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16",
    },
    {
      name: "mouse_filter",
      type: "0 | 1 | 2",
    },
    {
      name: "mouse_force_pass_scroll_events",
      type: "boolean",
    },
    {
      name: "offset_bottom",
      type: "number",
    },
    {
      name: "offset_left",
      type: "number",
    },
    {
      name: "offset_right",
      type: "number",
    },
    {
      name: "offset_top",
      type: "number",
    },
    {
      name: "pivot_offset",
      type: "Vector2Type",
    },
    {
      name: "position",
      type: "Vector2Type",
    },
    {
      name: "rotation",
      type: "number",
    },
    {
      name: "rotation_degrees",
      type: "number",
    },
    {
      name: "scale",
      type: "Vector2Type",
    },
    {
      name: "shortcut_context",
      type: "NodePathType",
    },
    {
      name: "size",
      type: "Vector2Type",
    },
    {
      name: "size_flags_horizontal",
      type: "number", // TODO Bitfield
    },
    {
      name: "size_flags_stretch_ratio",
      type: "number",
    },
    {
      name: "size_flags_vertical",
      type: "number", // TODO Bitfield
    },
    {
      name: "theme",
      type: "Theme",
    },
    {
      name: "theme_type_variation",
      type: "string",
    },
    {
      name: "tooltip_text",
      type: "string",
    },
  ],
  category: "Primitive",
  docs: [
    "Base class for all GUI controls. Adapts its position and size based on its parent control.",
    "",
    "@example",
    "```tsx",
    "<Control />",
    "```",
  ],
  docsHref: "https://docs.godotengine.org/en/stable/classes/class_control.html",
  specialProps: {
    theme: {
      type: "ExtResource",
    },
  },
  resources: {
    theme: {
      type: "ExtResource",
    },
  },
} as ComponentDefinition;
