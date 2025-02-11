// TODO - Heavy TODO, will revisit later to add more methods

import type {
  Node2DProps,
  PhysicsBody2DProps,
  Vector2Type,
  Vector3Type,
} from "./exports.ts";

export interface NodeMethods
  extends Required<Node2DProps>, Required<PhysicsBody2DProps>, PhysicsMethods {
  get_child: (index: number) => NodeMethods;
  get_child_count: () => number;
  move_toward: (from: number, to: number, delta: number) => number;
}

interface PhysicsMethods {
  move_and_slide: () => boolean;
  is_on_floor: () => boolean;
  velocity: Vector3Type | Vector2Type;
  get_gravity: () => Vector3Type | Vector2Type;
}

interface GlobalMethods extends NodeMethods {
  Vector2: (x: number, y: number) => Vector2Type;
  Vector3: (x: number, y: number, z: number) => Vector3Type;
  Input: {
    is_action_just_pressed: (action: string) => boolean;
    get_axis: (left: string, right: string) => number;
  };
}

export const GDMethods: GlobalMethods = null as unknown as GlobalMethods;

// Will eventually turn into individual exports (maybe)
