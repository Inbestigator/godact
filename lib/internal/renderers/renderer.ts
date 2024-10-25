import { type Container, createContainer } from "../container.ts";
import { Node } from "../node.ts";

export interface Renderer {
  nodes: Container<Node<unknown>>;
  render: () => void;
  compileScript: () => string;
}

export function createRenderer(): Renderer {
  const nodes = createContainer<Node<unknown>>();
  const parts: Record<string, { text: string; props?: string[] }[]> = {
    descriptor: [{ text: `[gd_scene format=3]` }],
    external: [],
    internal: [],
    nodes: [],
    connections: [],
  };

  function render() {
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
              entry.text + (entry.props ? "\n" + entry.props.join("\n") : "")
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
