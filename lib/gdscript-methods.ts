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
  add_child: (
    node: NodeMethods,
    force_readable_name?: boolean,
    internal?: 0 | 1 | 2,
  ) => void;
  add_sibling: (node: NodeMethods, force_readable_name?: boolean) => void;
  move_toward: (from: number, to: number, delta: number) => number;
  get_node: (path: string) => NodeMethods;
  get_tree: () => SceneTreeMethods;
  get_tree_string: () => string;
  get_tree_string_pretty: () => string;
}

interface SceneTreeMethods extends SceneTreeProps {
  change_scene_to_file: (path: string) => Error;
  change_scene_to_packed: (packed_scene: string) => Error;
  get_frame: () => number;
  get_node_count: () => number;
  get_nodes_in_group: (group: string) => NodeMethods[];
  reload_current_scene: () => Error;
  unload_current_scene: () => void;
  quit: () => void;
}

interface SceneTreeProps {
  root: never;
}

interface SceneMethods {
  instantiate: () => NodeMethods;
}

interface MathMethods {
  randf: () => number;
  randi: () => number;
  randi_range: (min: number, max: number) => number;
  randf_range: (min: number, max: number) => number;
}

interface PhysicsMethods {
  move_and_slide: () => boolean;
  is_on_floor: () => boolean;
  velocity: Vector3Type | Vector2Type;
  get_gravity: () => Vector3Type | Vector2Type;
}

interface GlobalMethods extends NodeMethods, MathMethods {
  Vector2: (x: number, y: number) => Vector2Type;
  Vector3: (x: number, y: number, z: number) => Vector3Type;
  Input: {
    is_action_just_pressed: (action: string) => boolean;
    get_axis: (left: string, right: string) => number;
  };
  str: (v: unknown) => string;
  int: (v: unknown) => number;
  float: (v: unknown) => number;
  connect: (signal: string, callback: (...args: unknown[]) => unknown) => void;
  load: (path: string) => SceneMethods;
  preload: (path: string) => SceneMethods;
}

export const GDMethods: GlobalMethods = null as unknown as GlobalMethods;

// Will eventually turn into individual exports (maybe)
