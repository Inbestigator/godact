import { type Container, createContainer } from "./container.ts";
import type { ScriptParts } from "./renderers/renderer.ts";

export interface Node<Props> {
  props: Props;
  children: Container<Node<unknown>>;
  text: () => string;
  insertMe: (script: ScriptParts, parent?: string) => void;
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
    insertMe(_script) {},
  };
}

export function isNode(obj: unknown): obj is Node<unknown> {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "props" in obj &&
    "children" in obj &&
    "text" in obj &&
    typeof obj.text === "function"
  );
}
