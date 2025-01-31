import type { ScriptParts } from "./renderers/renderer.ts";
import { parse } from "acorn";
import { ts2gd } from "./ts2gd.ts";
import { buildSync } from "esbuild";
import { join } from "node:path";
import crypto from "node:crypto";
import { stringify } from "flatted";

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
    const origin = props.script as string;
    if (origin.endsWith(".ts")) {
      const out = join(
        (script.out ?? "").split("/").slice(0, -1).join("/"),
        origin.replace(".ts", ".gd"),
      );

      Deno.mkdirSync(out.split("/").slice(0, -1).join("/"), {
        recursive: true,
      });

      Deno.writeTextFileSync(
        out,
        transpile(origin),
      );

      props.script = `res://${origin.replace(".ts", ".gd")}`;
    }
    const scriptId = createId(props);

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
  const materialId = createId(props);
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

export function createId(data?: unknown) {
  if (data) {
    if (typeof data === "object" && "children" in data) {
      delete data.children;
    }
    const hash = crypto.createHash("sha256");
    hash.update(stringify(data));
    return hash.digest("hex").slice(0, 8);
  }

  return crypto.randomUUID().slice(0, 8);
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
