import type { ColorType } from "../types/vectors.ts";

export interface NodeProps {
  auto_translate_mode?: 0 | 1 | 2;
  editor_description?: string;
  multiplayer?: null; // TODO Type: MultiplayerAPI ?!?
  name?: string;
  physics_interpolation_mode?: 0 | 1 | 2;
  process_mode?: 0 | 1 | 2 | 3 | 4;
  process_physics_priority?: number;
  process_priority?: number;
  process_thread_group?: {
    group: 1 | 2;
    order: number;
    messages: 0 | 1 | 2;
  };
  script?: string;
}

export interface CanvasItemProps extends NodeProps {
  clip_children?: 0 | 1 | 2;
  light_mask?: number;
  material?: null; // TODO Type: Material
  modulate?: ColorType;
  self_modulate?: ColorType;
  show_behind_parent?: boolean;
  texture_filter?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  texture_repeat?: 0 | 1 | 2 | 3;
  top_level?: boolean;
  use_parent_material?: boolean;
  visibility_layer?: number;
  visible?: boolean;
  y_sort_enabled?: boolean;
  z_as_relative?: boolean;
  z_index?: number;
}

// export interface Node3DProps extends NodeProps {
//   position?: Vector3Type;
//   rotation?: Vector2Type;
//   skew?: Vector2Type;
//   scale?: Vector3Type;
// }
