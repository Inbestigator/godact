export interface NodeProps {
  auto_translate_mode?: 0 | 1 | 2;
  disabled?: boolean;
  editor_description?: string;
  multiplayer?: null; // TODO MultiplayerAPI ?!?
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
}

export interface CanvasItem extends NodeProps {
  clip_children?: 0 | 1 | 2;
  light_mask?: number;
  material?: null; // TODO Material
  modulate?: [number, number, number, number]; // TODO Color
  self_modulate?: [number, number, number, number]; // TODO Color
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
//   position?: [number, number, number];
//   rotation?: [number, number];
//   skew?: [number, number];
//   scale?: [number, number, number];
// }

export function convertCommonTypes(value: unknown) {
  if (
    Array.isArray(value) &&
    value.length === 2 &&
    value.every((v) => typeof v === "number")
  ) {
    return `Vector2(${value[0]}, ${value[1]})`;
  }

  if (
    Array.isArray(value) &&
    value.length === 3 &&
    value.every((v) => typeof v === "number")
  ) {
    return `Vector3(${value[0]}, ${value[1]}, ${value[2]})`;
  }

  return value;
}

export function addCommonProps(props: Record<string, unknown>) {
  return Object.entries(props)
    .filter(([key, _value]) => key !== "children" && key !== "name")
    .map(([key, value]) => `${key} = ${convertCommonTypes(value)}`);
}

export function createId() {
  return crypto.randomUUID().replaceAll("-", "_");
}
