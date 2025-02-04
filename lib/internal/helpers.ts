import type { PartProp, ScriptPart, ScriptSections } from "./renderer.ts";
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

      props.script = {
        type: "Script",
        props: { path: `res://${origin.replace(/\.(?:ts|js)/, ".gd")}` },
      } as unknown as PartProp;
    }
  }

  const { name: _name, children: _children, ...rest } = props;

  return handleRsrcs(rest, script);
}

function handleRsrcs(
  props: Record<string, PartProp>,
  script: ScriptSections,
) {
  const newProps: Record<string, PartProp> = {};
  for (const [key, value] of Object.entries(props)) {
    const extRsrcTypes = [
      "Script",
      "Texture2D",
      "Font",
      "TileSet",
    ];
    if (Array.isArray(value) && typeof value[0] === "object") {
      newProps[key] = value.map((v) => handleRsrcs({ v }, script).v);
      continue;
    }
    if (
      typeof value !== "object" || Array.isArray(value) ||
      ["ExtResource", "SubResource", "Wrapped", "Verbatim"].includes(
        value.type,
      )
    ) {
      newProps[key] = value;
      continue;
    }
    const resourceId = createId(value);
    const isExternal = extRsrcTypes.includes(value.type);
    newProps[key] = {
      type: isExternal ? "ExtResource" : "SubResource",
      id: resourceId,
    };
    const inlineArgs: ScriptPart["inlineArgs"] = "inlineArgs" in value
      ? { ...value.inlineArgs as ScriptPart["inlineArgs"] }
      : {};
    const props: ScriptPart["props"] = "props" in value
      ? { ...value.props as ScriptPart["props"] }
      : {};
    if (
      !script[isExternal ? "external" : "internal"].some((s) =>
        s.id === resourceId
      )
    ) {
      script[isExternal ? "external" : "internal"].push({
        type: value.type,
        id: resourceId,
        inlineArgs: {
          ...inlineArgs,
          ...(isExternal &&
            Object.fromEntries(
              Object.entries(props).filter(([_, value]) =>
                typeof value === "string"
              ),
            ) as ScriptPart["inlineArgs"]),
        },
        props: !isExternal ? addCommonProps(props, script) : {},
      });
    }
  }
  return newProps;
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
  script.nodes.push({
    type,
    id: name,
    inlineArgs: parent ? { parent } : {},
    props: addCommonProps(
      {
        ...props as Record<string, PartProp>,
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
