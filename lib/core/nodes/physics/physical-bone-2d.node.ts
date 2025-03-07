import type { ComponentDefinition } from "../../../../parseNodeDefs.ts";
import rigidBody2dNode from "./rigid-body-2d.node.ts";

export default {
  name: "PhysicalBone2D",
  extends: "RigidBody2DProps",
  inherits: rigidBody2dNode,
  props: {
    auto_configure_joint: "boolean",
    bone2d_index: "number",
    bone2d_nodepath: "NodePathType",
    follow_bone_when_simulating: "boolean",
    simulate_physics: "boolean",
  },
  category: "PhysicsBody2D",
  docs: [
    "A RigidBody2D-derived node used to make Bone2Ds in a Skeleton2D react to physics.",
    "",
    "@example",
    "```tsx",
    "<PhysicalBone2D>",
    "  <CollisionShape2D",
    "    shape={createRectangleShape2D({ size: Vector2(2, 3) })}",
    "  />",
    "</PhysicalBone2D>",
    "```",
  ],
  docsHref:
    "https://docs.godotengine.org/en/stable/classes/class_physicalbone2d.html",
} as ComponentDefinition;
