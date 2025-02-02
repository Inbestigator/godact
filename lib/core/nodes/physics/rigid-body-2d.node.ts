import type { ComponentDefinition } from "../../../../parseNodeDefs.ts";

export default {
  name: "RigidBody2D",
  extends: "PhysicsBody2DProps",
  props: [
    {
      name: "angular_damp",
      type: "number",
    },
    {
      name: "angular_damp_mode",
      type: "0 | 1",
    },
    {
      name: "angular_velocity",
      type: "number",
    },
    {
      name: "can_sleep",
      type: "boolean",
    },
    {
      name: "center_of_mass",
      type: "Vector2Type",
    },
    {
      name: "center_of_mass_mode",
      type: "0 | 1",
    },
    {
      name: "constant_force",
      type: "Vector2Type",
    },
    {
      name: "constant_torque",
      type: "number",
    },
    {
      name: "contact_monitor",
      type: "boolean",
    },
    {
      name: "continuous_cd",
      type: "0 | 1 | 2",
    },
    {
      name: "custom_integrator",
      type: "boolean",
    },
    {
      name: "freeze",
      type: "boolean",
    },
    {
      name: "freeze_mode",
      type: "0 | 1",
    },
    {
      name: "gravity_scale",
      type: "number",
    },
    {
      name: "inertia",
      type: "number",
    },
    {
      name: "linear_damp",
      type: "number",
    },
    {
      name: "linear_damp_mode",
      type: "0 | 1",
    },
    {
      name: "linear_velocity",
      type: "Vector2Type",
    },
    {
      name: "lock_rotation",
      type: "boolean",
    },
    {
      name: "mass",
      type: "number",
    },
    {
      name: "max_contacts_reported",
      type: "number",
    },
    {
      name: "physics_material_override",
      type: "PhysicsMaterial",
    },
    {
      name: "sleeping",
      type: "boolean",
    },
  ],
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
