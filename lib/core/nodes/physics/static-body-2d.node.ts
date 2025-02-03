import type { ComponentDefinition } from "../../../../parseNodeDefs.ts";

export default {
  name: "StaticBody2D",
  extends: "PhysicsBody2DProps",
  props: {
    constant_angular_velocity: "number",
    constant_linear_velocity: "Vector2Type",
    physics_material_override: "PhysicsMaterial",
  },
  category: "PhysicsBody2D",
  docs: [
    "A 2D physics body that can't be moved by external forces. When moved manually, it doesn't affect other bodies in its path.",
    "",
    "@example",
    "```tsx",
    "<StaticBody2D>",
    "  <CollisionShape2D",
    "    shape={createRectangleShape2D({ size: Vector2(2, 3) })}",
    "  />",
    "</StaticBody2D>",
    "```",
  ],
  docsHref:
    "https://docs.godotengine.org/en/stable/classes/class_staticbody2d.html",
  specialProps: {},
  resources: {},
} as ComponentDefinition;
