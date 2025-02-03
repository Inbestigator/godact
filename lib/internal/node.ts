import { type Container, createContainer } from "./container.ts";
import type { ScriptSections } from "./renderers/renderer.ts";

export interface Node<Props> {
  props: Props;
  children: Container<Node<unknown>>;
  text: () => string;
  insertMe: (script: ScriptSections, parent?: string) => void;
}

export function createNode<Props>(props: Props): Node<Props> {
  const children = createContainer<Node<unknown>>();

  function text(): string {
    return [...children]
      .map((c) => c.text())
      .join("");
  }

  return {
    props,
    children,
    text,
    insertMe() {},
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
