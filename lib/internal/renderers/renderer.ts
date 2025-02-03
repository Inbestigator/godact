import { type Container, createContainer } from "../container.ts";
import type { Node } from "../node.ts";

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

export interface ReturnProps {
  type: string;
  props: Record<string, PartProp>;
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
    let text = "\n";
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
      text += entry.props
        ? Object.entries(entry.props).map(([key, prop]) => {
          if (
            typeof prop === "string" || typeof prop === "number" ||
            typeof prop === "boolean"
          ) {
            switch (typeof prop) {
              case "string":
                return `${key} = "${prop}"`;
              case "number":
              case "boolean":
                return `${key} = ${prop}`;
            }
          }
          switch (prop.type) {
            case "SubResource":
              return `${key} = SubResource("${prop.id}")`;
            case "ExtResource":
              return `${key} = ExtResource("${prop.id}")`;
            case "Wrapped":
              return `${key} = ${prop.wrapper}(${prop.value})`;
          }
        }).join("\n") + "\n"
        : "";
    });
    return text;
  }

  function compileScript() {
    let text = "[gd_scene format=3]\n";
    text += addSection("external", parts.external);
    text += addSection("internal", parts.internal);
    text += addSection("nodes", parts.nodes);
    text += addSection("connections", parts.connections);
    return text;
  }

  return {
    nodes,
    render,
    compileScript,
  };
}
