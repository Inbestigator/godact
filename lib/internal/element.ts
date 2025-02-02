import type { Node } from "./node.ts";
// @ts-types="npm:@types/react@^18.3.18"
import { createElement, type ReactNode } from "react";

export function GodotNode<Props>(props: {
  props: Props;
  createNode: () => Node<Props>;
  children?: ReactNode;
}) {
  return createElement("godot-node", props);
}
