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

  if (
    value &&
    typeof value === "object" &&
    "typeSpecifier" in value &&
    typeof value.typeSpecifier === "string" &&
    "value" in value &&
    typeof value.value === "string"
  ) {
    return `${value.typeSpecifier}(${value.value})`;
  }

  if (typeof value === "string") {
    return `"${value}"`;
  }

  return value;
}

export function addCommonProps(
  props: Record<string, unknown>,
  script: Record<string, { text: string; props?: string[] }[]>,
) {
  if (props.script) {
    const scriptId = createId();

    script.external.push({
      text:
        `[ext_resource type="Script" path="${props.script}" id="${scriptId}"]`,
    });

    props.script = {
      typeSpecifier: "ExtResource",
      value: `"${scriptId}"`,
    };
  }

  return Object.entries(props)
    .filter(([key, _value]) => key !== "children" && key !== "name")
    .map(([key, value]) => `${key} = ${convertCommonTypes(value)}`);
}

export function createId() {
  return crypto.randomUUID().replaceAll("-", "_");
}
