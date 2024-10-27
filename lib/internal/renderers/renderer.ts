import { type Container, createContainer } from "../container.ts";
import type { Node } from "../node.ts";

export interface Renderer {
  nodes: Container<Node<unknown>>;
  render: () => void;
  compileScript: () => string;
}

export type ScriptParts = Record<
  "descriptor" | "external" | "internal" | "nodes" | "connections",
  { text: string; props?: string[] }[]
>;

const defaultParts: ScriptParts = {
  descriptor: [{ text: `[gd_scene format=3]` }],
  external: [],
  internal: [],
  nodes: [],
  connections: [],
};

export function createRenderer(): Renderer {
  const nodes = createContainer<Node<unknown>>();
  const parts = structuredClone(defaultParts);

  function render() {
    Object.assign(parts, structuredClone(defaultParts));
    for (const node of nodes) {
      node.insertMe(parts);
    }
  }

  function compileScript() {
    return Object.values(parts)
      .map((part) =>
        part
          .map(
            (entry) =>
              entry.text + (entry.props ? "\n" + entry.props.join("\n") : ""),
          )
          .join("\n")
      )
      .join("\n");
  }

  return {
    nodes,
    render,
    compileScript,
  };
}
