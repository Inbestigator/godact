import type { ComponentDefinition } from "../../../../parseNodeDefs.ts";

export default {
  name: "Area2D",
  extends: "CollisionObject2DProps",
  props: {
    angular_damp: "number",
    angular_damp_space_override: "0 | 1 | 2 | 3 | 4",
    audio_bus_name: "string",
    audio_bus_override: "boolean",
    gravity: "number",
    gravity_direction: "Vector2Type",
    gravity_point: "boolean",
    gravity_point_center: "Vector2Type",
    gravity_point_unit_distance: "number",
    gravity_space_override: "0 | 1 | 2 | 3 | 4",
    linear_damp: "number",
    linear_damp_space_override: "0 | 1 | 2 | 3 | 4",
    monitorable: "boolean",
    monitoring: "boolean",
    priority: "number",
  },
  events: [
    { name: "_area_entered", props: { area: "NodeMethods" } },
    {
      name: "_area_exited",
      props: { area: "NodeMethods" },
    },
    {
      name: "_area_shape_entered",
      props: {
        area_rid: "RID",
        area: "NodeMethods",
        area_shape_index: "number",
        local_shape_index: "number",
      },
    },
    {
      name: "_area_shape_exited",
      props: {
        area_rid: "RID",
        area: "NodeMethods",
        area_shape_index: "number",
        local_shape_index: "number",
      },
    },
    { name: "_body_entered", props: { body: "NodeMethods" } },
    {
      name: "_body_exited",
      props: { body: "NodeMethods" },
    },
    {
      name: "_body_shape_entered",
      props: {
        body_rid: "RID",
        body: "NodeMethods",
        body_shape_index: "number",
        local_shape_index: "number",
      },
    },
    {
      name: "_body_shape_exited",
      props: {
        body_rid: "RID",
        body: "NodeMethods",
        body_shape_index: "number",
        local_shape_index: "number",
      },
    },
  ],
  category: "PhysicsBody2D",
  docs: [
    "A region of 2D space that detects other CollisionObject2Ds entering or exiting it.",
    "",
    "@example",
    "```tsx",
    "<Area2D>",
    "  <CollisionShape2D",
    "    shape={createRectangleShape2D({ size: Vector2(2, 3) })}",
    "  />",
    "</Area2D>",
    "```",
  ],
  docsHref: "https://docs.godotengine.org/en/stable/classes/class_area2d.html",
} as ComponentDefinition;
