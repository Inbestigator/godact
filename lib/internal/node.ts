import { createContainer, type Container } from "./container.ts";

export interface Node<Props> {
  props: Props;
  children: Container<Node<unknown>>;
  text: () => string;
}

export function createNode<Props>(props: Props): Node<Props> {
  const children = createContainer<Node<unknown>>();

  function text(): string {
    return [...children]
      .map(function (child) {
        return child.text();
      })
      .join("");
  }

  return {
    props,
    children,
    text,
  };
}

// deno-lint-ignore no-explicit-any
export function isNode(obj: any): obj is Node<unknown> {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "props" in obj &&
    "children" in obj &&
    typeof obj.text === "function"
  );
}
