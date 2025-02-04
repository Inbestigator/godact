import { type Container, createContainer } from "./container.ts";
import type { Node } from "./node.ts";

export interface Renderer {
  nodes: Container<Node<unknown>>;
  render: () => void;
  compileScript: () => string;
}

export interface ScriptPart {
  type: string;
  id: string;
  inlineArgs?: Record<string, string>;
  props?: Record<string, PartProp>;
}

export type PartProp =
  | {
    type: "SubResource";
    id: string;
  }
  | {
    type: "ExtResource";
    id: string;
  }
  | {
    type: "Wrapped";
    value: string;
    wrapper: string;
  }
  | {
    type: "Verbatim";
    value: string;
  }
  | PartProp[]
  | { [key: string]: PartProp }
  | string
  | number
  | boolean;

export type ScriptSections =
  & { out?: string }
  & Record<
    "external" | "internal" | "nodes" | "connections",
    ScriptPart[]
  >;

const defaultParts: ScriptSections = {
  external: [],
  internal: [],
  nodes: [],
  connections: [],
};

function stringifyProp(prop: PartProp): string {
  if (
    typeof prop === "string" || typeof prop === "number" ||
    typeof prop === "boolean"
  ) {
    switch (typeof prop) {
      case "string":
        return `"${prop}"`;
      default:
        return prop.toString();
    }
  }
  if (Array.isArray(prop)) {
    return `[${prop.map((p) => stringifyProp(p)).join(", ")}]`;
  }
  switch (prop.type) {
    case "SubResource":
      return `SubResource("${prop.id}")`;
    case "ExtResource":
      return `ExtResource("${prop.id}")`;
    case "Wrapped":
      return `${prop.wrapper}(${prop.value})`;
  }
  return `{${
    Object.entries(prop)
      .map(([key, value]) => `"${key}": ${stringifyProp(value)}`)
      .join(", ")
  }}`;
}

export function createRenderer(out?: string): Renderer {
  const nodes = createContainer<Node<unknown>>();
  const parts = structuredClone(defaultParts);
  parts.out = out;

  function render() {
    Object.assign(parts, structuredClone(defaultParts));
    for (const node of nodes) {
      node.insertMe(parts);
    }
  }

  function addSection(section: keyof ScriptSections, part: ScriptPart[]) {
    let text = "";
    const entryType = section === "external"
      ? "ext_resource"
      : section === "internal"
      ? "sub_resource"
      : section === "nodes"
      ? "node"
      : "connection";
    part.forEach((entry) => {
      text += `[${entryType} type="${entry.type}" ${
        section === "nodes" ? "name" : "id"
      }="${entry.id}"${
        Object.entries(entry.inlineArgs ?? {}).map(([key, value]) =>
          ` ${key}="${value}"`
        ).join("")
      }]\n`;
      if (entry.props && Object.keys(entry.props).length) {
        text += Object.entries(entry.props).map(([key, prop]) => {
          return `${key} = ${stringifyProp(prop)}`;
        }).join("\n") + "\n";
      }
    });
    return text;
  }

  function compileScript() {
    let text = "[gd_scene format=3]\n";
    for (
      const key of ["external", "internal", "nodes", "connections"] as const
    ) {
      text += addSection(key, parts[key]);
    }
    return text;
  }

  return {
    nodes,
    render,
    compileScript,
  };
}
