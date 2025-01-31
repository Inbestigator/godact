import type { ScriptParts } from "./renderers/renderer.ts";
import { parse } from "acorn";
import { ts2gd } from "./ts2gd.ts";
import { buildSync } from "esbuild";

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
    if ((props.script as string).endsWith(".ts")) {
      const origin = props.script as string;

      Deno.writeTextFileSync(
        origin.replace(".ts", ".gd"),
        transpile(origin),
      );

      props.script = `res://${origin.replace(".ts", ".gd")}`;
    }
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
  const materialId = createId();
  if (props.material) {
    script.internal.push({
      text: `[sub_resource type="Material" id="${materialId}"]`,
    });
  }
  script.nodes.push({
    text: `[node name="${name}" type="${type}"${
      parent ? ` parent="${parent}"` : ""
    }]`,
    props: addCommonProps(
      {
        ...props,
        ...(props.material
          ? {
            material: {
              typeSpecifier: "SubResource",
              value: `"${materialId}"`,
            },
          }
          : {}),
      },
      script,
    ),
  });
}

export function createId() {
  return crypto.randomUUID().replaceAll("-", "_");
}

function transpile(filePath: string): string {
  const { outputFiles } = buildSync({
    entryPoints: [filePath],
    bundle: true,
    write: false,
  });
  const ast = parse(
    outputFiles[0].text.replace("(() => {", "").replace(/}\)\(\);\s*$/, ""),
    { ecmaVersion: "latest" },
  );

  return ts2gd(ast).replace(/"extends (.+)"/, "extends $1").replaceAll(
    "Godot.",
    "",
  ).replaceAll(/console\.(?:log|warn|error)/g, "print");
}
