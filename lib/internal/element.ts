import type { Node } from "./node.ts";
// @ts-types="@types/react"
import React, { type ReactNode } from "react";

export function GodotNode<Props>(props: {
  props: Props;
  createNode: () => Node<Props>;
  children?: ReactNode;
}) {
  return React.createElement("godot-node", props);
}
