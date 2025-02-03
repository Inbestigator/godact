import type {
  PartProp,
  ScriptPart,
  ScriptSections,
} from "./renderers/renderer.ts";
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

  const { name: _name, children: _children, ...rest } = props;

  return handleRsrc(rest, script);
}

function handleRsrc(
  props: Record<string, PartProp>,
  script: ScriptSections,
) {
  const newProps: Record<string, PartProp> = {};
  for (const [key, value] of Object.entries(props)) {
    if (
      typeof value !== "object" ||
      ["ExtResource", "SubResource", "Wrapped", "Verbatim"].includes(value.type)
    ) {
      newProps[key] = value;
      continue;
    }
    const extRsrcTypes = [
      "Script",
      "Texture2D",
      "Font",
      "TileSet",
    ];
    const inlineArgsProps = [
      "path",
    ];
    const resourceId = createId(value);
    const isExternal = extRsrcTypes.includes(value.type);
    newProps[key] = {
      type: isExternal ? "ExtResource" : "SubResource",
      id: resourceId,
    };
    const inlineArgs: ScriptPart["inlineArgs"] = {};
    const props: ScriptPart["props"] = {};
    for (
      const [propKey, propValue] of Object.entries(
        "props" in value ? { ...value.props as ScriptPart["props"] } : {},
      )
    ) {
      if (inlineArgsProps.includes(propKey)) {
        if (typeof propValue === "string") {
          inlineArgs[propKey] = propValue;
        }
      } else {
        props[propKey] = propValue;
      }
    }
    if (
      !script[isExternal ? "external" : "internal"].some((s) =>
        s.id === resourceId
      )
    ) {
      script[isExternal ? "external" : "internal"].push({
        type: value.type,
        id: resourceId,
        inlineArgs,
        props: addCommonProps(props, script),
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
