import { type Container, createContainer } from "../container.ts";
import type { Node } from "../node.ts";

export interface Renderer {
  nodes: Container<Node<unknown>>;
  render: () => void;
  compileScript: () => string;
}

interface ScriptPart {
  type: string;
  id: string;
  inlineArgs?: Record<string, string>;
  props?: string[];
}

interface PartProp {
}

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

  function inlineArgs(args: Record<string, string>) {
    return Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(
      " ",
    );
  }

  function compileScript() {
    let text = "[gd_scene format=3]\n";
    parts.external.forEach((entry) => {
      text += `[ext_resource type="${entry.type}" ${
        entry.inlineArgs ? inlineArgs(entry.inlineArgs) : ""
      } id="${entry.id}"]\n`;
      text += entry.props ? entry.props.join("\n") : "";
    });
    parts.internal.forEach((entry) => {
      text += `[sub_resource type="${entry.type}" ${
        entry.inlineArgs ? inlineArgs(entry.inlineArgs) : ""
      } id="${entry.id}"]\n`;
      text += entry.props ? entry.props.join("\n") : "";
    });
    return text;
    // return Object.values(parts)
    //   .filter(Array.isArray)
    //   .map((part: ScriptLine[]) =>
    //     part
    //       .map(
    //         (entry) =>
    //           entry.text + (entry.props ? "\n" + entry.props.join("\n") : ""),
    //       )
    //       .join("\n")
    //   )
    //   .join("\n");
  }

  return {
    nodes,
    render,
    compileScript,
  };
}
