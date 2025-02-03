import type { PartProp, ScriptSections } from "./renderers/renderer.ts";
import { parse } from "acorn";
import { ts2gd } from "./ts2gd.ts";
import { buildSync } from "esbuild";
import { join } from "node:path";
import crypto from "node:crypto";
import { stringify } from "flatted";
import fs from "node:fs";

export function addCommonProps(
  props: Record<string, PartProp>,
  script: ScriptSections,
): Record<string, PartProp> {
  if (props.script && typeof props.script === "string") {
    const origin = props.script;
    if (origin.endsWith(".ts") || origin.endsWith(".js")) {
      const out = join(
        (script.out ?? "").split("/").slice(0, -1).join("/"),
        origin.replace(/\.(?:ts|js)/, ".gd"),
      );

      fs.mkdirSync(out.split("/").slice(0, -1).join("/"), {
        recursive: true,
      });

      fs.writeFileSync(
        out,
        transpile(origin),
      );

      const scriptId = createId(props);

      script.external.push({
        type: "Script",
        inlineArgs: { path: `res://${origin.replace(/\.(?:ts|js)/, ".gd")}` },
        id: scriptId,
      });

      props.script = {
        type: "ExtResource",
        id: scriptId,
      };
    }
  }

  delete props.name;
  delete props.children;

  return props;
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
  script: ScriptSections;
}) {
  const materialId = createId(props);
  if (props.material) {
    script.internal.push({
      type: "Material",
      id: materialId,
    });
  }
  script.nodes.push({
    type,
    id: name,
    inlineArgs: parent ? { parent } : {},
    props: addCommonProps(
      {
        ...props,
        ...(props.material
          ? {
            material: {
              type: "SubResource",
              id: materialId,
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

/**
 * Transpiles a TypeScript file into a GDScript format.
 *
 * @param filePath - The path to the TypeScript file to be transpiled.
 * @returns The transpiled script as a string.
 */
export function transpile(filePath: string): string {
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
    /(?:Godot|Math)\./g,
    "",
  ).replaceAll(/console\.(?:log|warn|error)/g, "print");
}
