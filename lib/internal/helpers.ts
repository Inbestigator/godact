import type { ScriptParts } from "./renderers/renderer.ts";

export function convertCommonTypes(value: unknown) {
  if (
    value &&
    typeof value === "object" &&
    "typeSpecifier" in value &&
    typeof value.typeSpecifier === "string" &&
    "value" in value &&
    typeof value.value === "string"
  ) {
    if (value.typeSpecifier === "Verbatim") {
      return value.value;
    }
    return `${value.typeSpecifier}(${value.value})`;
  }

  if (typeof value === "string") {
    return `"${value}"`;
  }

  return value;
}

export function addCommonProps(
  props: Record<string, unknown>,
  script: ScriptParts,
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

export function addNodeEntry({
  type,
  name,
  parent,
  props,
  script,
}: {
  type: string;
  name: string;
  parent?: string;
  props: Record<string, unknown>;
  script: ScriptParts;
}) {
  script.nodes.push({
    text: `[node name="${name}" type="${type}"${
      parent ? ` parent="${parent}"` : ""
    }]`,
    props: addCommonProps(props, script),
  });
}

export function createId() {
  return crypto.randomUUID().replaceAll("-", "_");
}
