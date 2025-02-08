import type { PartProp, ScriptPart, ScriptSections } from "./renderer.ts";
import { parse } from "acorn";
import { ts2gd } from "./ts2gd.ts";
import { buildSync } from "esbuild";
import { join } from "node:path";
import crypto from "node:crypto";
import { stringify } from "flatted";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { cwd } from "node:process";
import eventPropNums from "./events-props.json" with { type: "json" };

const importMatch =
  /(?:(?:const|let|var)(.+?)=\s*(?:await\s+)?)?import\([`'"]([^`'"]+)[`'"].*/g;

function extractDI(funcString: string): Record<string, string> {
  const matches = [...funcString.matchAll(importMatch)];
  return Object.fromEntries(
    matches.map(([_, imported, mod]) => [imported, mod]),
  );
}

export function addCommonProps(
  props: Record<string, PartProp>,
  script: ScriptSections,
  name: string,
): Record<string, PartProp> {
  const events = Object.entries(props).filter(
    ([k, v]) => k.startsWith("on") && typeof v === "function",
  ).map(([k, v]) => [k, v.toString()]);
  const fileId = `${name}-${createId(events)}`;
  const gdOutDir = "./." + createId(script.out);
  mkdirSync(gdOutDir, { recursive: true });

  if (!props.script && events.length) {
    const gdParts: { imports: string[]; fns: string[] } = {
      imports: [`"extends ${name}"`],
      fns: [],
    };
    for (let [k, v] of events) {
      const dependencies = extractDI(v);

      const imports = Object.entries(dependencies)
        .map(
          ([key, value]) =>
            `import ${key} from "${
              value.startsWith(".") ? join(cwd(), value) : value
            }";`,
        );

      gdParts.imports.concat(imports);
      const funcName = k.replace("on", "").replaceAll(
        /[A-Z]/g,
        (m) => `_${m.toLowerCase()}`,
      );
      const firstLine = v.split("\n")[0];
      if ((/\(.*\)=>/).test(firstLine)) {
        const match = firstLine.match(/\((.*)\)=>({)?(.+)/);
        if (!match || !(funcName in eventPropNums)) {
          continue;
        }
        const numProps = eventPropNums[funcName as keyof typeof eventPropNums];
        let functionProps = match[1].split(",").filter(
          (p) => p.trim(),
        );
        if (functionProps.length < numProps) {
          const padding = Array(numProps - functionProps.length)
            .fill(null).map((
              _,
              index,
            ) => `_${index + 1}`).join(",");
          functionProps = functionProps.concat(padding);
        }
        v = [
          `function ${funcName}(${functionProps.join(",")}) ${
            match[2] ? "" : "{"
          }`,
          match[3],
          ...v.split("\n").slice(1),
          match[2] ? "" : "}",
        ].join("\n");
      }
      gdParts.fns.push(
        `${v.replaceAll(importMatch, "")}\n${funcName}();`,
      );
    }

    writeFileSync(
      `${gdOutDir}/${fileId}.ts`,
      `${gdParts.imports.join("\n")}\n${gdParts.fns.join("\n")}`,
    );

    props.script = `${gdOutDir}/${fileId}.ts`;
  }

  if (props.script && typeof props.script === "string") {
    const origin = props.script;
    if (origin.endsWith(".ts") || origin.endsWith(".js")) {
      const out = join(
        (script.out ?? "").split("/").slice(0, -1).join("/"),
        origin.replace(/\.(?:ts|js)/, ".gd"),
      );

      mkdirSync(out.split("/").slice(0, -1).join("/"), {
        recursive: true,
      });

      writeFileSync(
        out,
        transpile(origin),
      );

      props.script = {
        type: "Script",
        props: { path: `res://${origin.replace(/\.(?:ts|js)/, ".gd")}` },
      } as unknown as PartProp;
    }
  }

  rmSync(gdOutDir, { recursive: true });

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
    if (Array.isArray(value)) {
      newProps[key] = value.map((v) => handleRsrcs({ v }, script).v);
      continue;
    }
    if (
      typeof value !== "object" || ("type" in value &&
        typeof value.type === "string" &&
        ["ExtResource", "SubResource", "Wrapped", "Verbatim"].includes(
          value.type,
        ))
    ) {
      newProps[key] = value;
      continue;
    }
    if (
      !("type" in value) ||
      typeof value.type !== "string"
    ) {
      newProps[key] = {};
      Object.entries(value).forEach(([k, v]) => {
        (newProps[key] as Record<string, PartProp>)[k] =
          handleRsrcs({ v }, script).v;
      });
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
        props: !isExternal ? addCommonProps(props, script, value.type) : {},
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
  props: unknown;
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
      type,
    ),
  });
}

export function createId(data?: unknown) {
  if (data) {
    if (typeof data === "object" && "children" in data) {
      const { children: _, ...rest } = data;
      data = rest;
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
  const original = readFileSync(filePath, "utf-8");
  // Silliest fix ever lmfao
  writeFileSync(
    filePath,
    original.replace(
      /import([\s\S]+?)from\s+['"`]@gdx\/godact\/methods['"`].*/,
      "const $1 = null;",
    ),
  );

  const { outputFiles: [{ text }] } = buildSync({
    entryPoints: [filePath],
    bundle: true,
    write: false,
  });
  writeFileSync(
    filePath,
    original,
  );
  const ast = parse(
    text.replace("(() => {", "").replace(/}\)\(\);\s*$/, ""),
    { ecmaVersion: "latest", sourceType: "module" },
  );

  return ts2gd(ast).replace(/"extends (.+)"/, "extends $1").replaceAll(
    /(?:[A-Z][A-Za-z\d]+Methods|Math)\.|\n_.+?\(\)/g,
    "",
  ).replaceAll(/console\.(?:log|warn|error)/g, "print");
}
