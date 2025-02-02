import type { ComponentDefinition } from "../../../../parseNodeDefs.ts";

export default {
  name: "CharacterBody2D",
  extends: "PhysicsBody2DProps",
  props: [
    {
      name: "floor_block_on_wall",
      type: "boolean",
    },
    {
      name: "floor_constant_speed",
      type: "boolean",
    },
    {
      name: "floor_max_angle",
      type: "number",
    },
    {
      name: "floor_snap_length",
      type: "number",
    },
    {
      name: "floor_stop_on_slope",
      type: "boolean",
    },
    {
      name: "max_slides",
      type: "number",
    },
    {
      name: "motion_mode",
      type: "0 | 1",
    },
    {
      name: "platform_floor_layers",
      type: "number",
    },
    {
      name: "platform_on_leave",
      type: "0 | 1 | 2",
    },
    {
      name: "platform_wall_layers",
      type: "number",
    },
    {
      name: "safe_margin",
      type: "number",
    },
    {
      name: "slide_on_ceiling",
      type: "boolean",
    },
    {
      name: "up_direction",
      type: "Vector2Type",
    },
    {
      name: "velocity",
      type: "Vector2Type",
    },
    {
      name: "wall_min_slide_angle",
      type: "number",
    },
  ],
  category: "PhysicsBody2D",
  docs: [
    "A 2D physics body specialized for characters moved by script.",
    "",
    "@example",
    "```tsx",
    '<CharacterBody2D name="Player">',
    "  <CollisionShape2D",
    "    shape={createRectangleShape2D({ size: Vector2(2, 3) })}",
    "  />",
    "</CharacterBody2D>",
    "```",
  ],
  docsHref:
    "https://docs.godotengine.org/en/stable/classes/class_characterbody2d.html",
  specialProps: {},
  resources: {},
} as ComponentDefinition;
