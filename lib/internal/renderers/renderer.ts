import { createContainer, type Container } from "../container.ts";
import { Node } from "../node.ts";

export interface Renderer {
  nodes: Container<Node<unknown>>;
  render: () => void;
}

export function createRenderer(): Renderer {
  const nodes = createContainer<Node<unknown>>();

  function render() {
    for (const node of nodes) {
      console.log(node);
    }
  }

  return {
    nodes,
    render,
  };
}
