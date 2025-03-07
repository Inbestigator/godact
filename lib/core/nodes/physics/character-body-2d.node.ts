import type { ComponentDefinition } from "../../../../parseNodeDefs.ts";

export default {
  name: "CharacterBody2D",
  extends: "PhysicsBody2DProps",
  props: {
    floor_block_on_wall: "boolean",
    floor_constant_speed: "boolean",
    floor_max_angle: "number",
    floor_snap_length: "number",
    floor_stop_on_slope: "boolean",
    max_slides: "number",
    motion_mode: "0 | 1",
    platform_floor_layers: "number",
    platform_on_leave: "0 | 1 | 2",
    platform_wall_layers: "number",
    safe_margin: "number",
    slide_on_ceiling: "boolean",
    up_direction: "Vector2Type",
    velocity: "Vector2Type",
    wall_min_slide_angle: "number",
  },
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
} as ComponentDefinition;
