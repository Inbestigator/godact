import { number } from "../../../../../../../AppData/Local/deno/npm/registry.npmjs.org/@types/prop-types/15.7.13/index.d.ts";
import { createContainer, type Container } from "../container.ts";
import { Node } from "../node.ts";

export interface Renderer {
  nodes: Container<Node<unknown>>;
  render: () => void;
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

    console.log(
      Object.values(parts)
        .map((part) =>
          part
            .map(
              (entry) =>
                entry.text + (entry.props ? "\n" + entry.props.join("\n") : "")
            )
            .join("\n")
        )
        .join("\n")
    );
  }

  return {
    nodes,
    render,
  };
}

export function convertCommonTypes(value: unknown) {
  if (
    Array.isArray(value) &&
    value.length === 2 &&
    value.every((v) => typeof v === "number")
  ) {
    return `Vector2(${value[0]}, ${value[1]})`;
  }

  if (
    Array.isArray(value) &&
    value.length === 3 &&
    value.every((v) => typeof v === "number")
  ) {
    return `Vector3(${value[0]}, ${value[1]}, ${value[2]})`;
  }

  return value;
}
