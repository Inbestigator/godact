import type { ComponentDefinition } from "../../../../parseNodeDefs.ts";

export default {
  name: "RigidBody2D",
  extends: "PhysicsBody2DProps",
  props: {
    angular_damp: "number",
    angular_damp_mode: "0 | 1",
    angular_velocity: "number",
    can_sleep: "boolean",
    center_of_mass: "Vector2Type",
    center_of_mass_mode: "0 | 1",
    constant_force: "Vector2Type",
    constant_torque: "number",
    contact_monitor: "boolean",
    continuous_cd: "0 | 1 | 2",
    custom_integrator: "boolean",
    freeze: "boolean",
    freeze_mode: "0 | 1",
    gravity_scale: "number",
    inertia: "number",
    linear_damp: "number",
    linear_damp_mode: "0 | 1",
    linear_velocity: "Vector2Type",
    lock_rotation: "boolean",
    mass: "number",
    max_contacts_reported: "number",
    physics_material_override: "PhysicsMaterial",
    sleeping: "boolean",
  },
  category: "PhysicsBody2D",
  docs: [
    "A 2D physics body that is moved by a physics simulation.",
    "",
    "@example",
    "```tsx",
    "<RigidBody2D>",
    "  <CollisionShape2D",
    "    shape={createRectangleShape2D({ size: Vector2(2, 3) })}",
    "  />",
    "</RigidBody2D>",
    "```",
  ],
  docsHref:
    "https://docs.godotengine.org/en/stable/classes/class_rigidbody2d.html",
  specialProps: {
    physics_material_override: {
      type: "SubResource",
    },
  },
  resources: {
    physics_material_override: {
      type: "SubResource",
    },
  },
} as ComponentDefinition;
