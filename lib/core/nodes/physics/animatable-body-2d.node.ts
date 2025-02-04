import type { ComponentDefinition } from "../../../../parseNodeDefs.ts";
import staticBody2dNode from "./static-body-2d.node.ts";

export default {
  name: "AnimatableBody2D",
  extends: "StaticBody2DProps",
  inherits: staticBody2dNode,
  props: { sync_to_physics: "true" },
  category: "PhysicsBody2D",
  docs: [
    "A 2D physics body that can't be moved by external forces. When moved manually, it affects other bodies in its path.",
    "",
    "@example",
    "```tsx",
    "<AnimatableBody2D>",
    "  <CollisionShape2D",
    "    shape={createRectangleShape2D({ size: Vector2(2, 3) })}",
    "  />",
    "</AnimatableBody2D>",
    "```",
  ],
  docsHref:
    "https://docs.godotengine.org/en/stable/classes/class_animatablebody2d.html",
} as ComponentDefinition;
