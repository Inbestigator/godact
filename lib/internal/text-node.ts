import { createNode, type Node } from "./node.ts";

export interface TextNode extends Node<string> {}

export function createTextNode(props: string): TextNode {
  const node = createNode<string>(props);

  function text(): string {
    return node.props;
  }

  return {
    ...node,
    text,
  };
}
