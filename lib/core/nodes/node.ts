export interface Node2DProps {
  name?: string;
}

export interface Node3DProps {
  name?: string;
}

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
