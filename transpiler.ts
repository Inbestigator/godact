import type { ComponentData } from "./main.ts";
import Nodes from "./nodes.ts";
import type { vNode } from "./parser.ts";

export default function transpile(nodes: Record<string, ComponentData>) {
  const transpiled: Record<string, string> = {};

  if (!nodes) return transpiled;

  Object.entries(nodes).map(([nodeName, { root }]) => {
    if (!root) return "";
    const parts: Record<string, string[]> = {
      descriptor: [`[gd_scene format=3]`],
      external: [],
      internal: [],
      nodes: [],
      connections: [],
    };

    function addPart(category: string, part: string) {
      parts[category].push(part);
    }

    transpileNode(addPart, root, true);

    transpiled[nodeName] = Object.values(parts)
      .map((category) => category.join("\n"))
      .join("\n")
      .trim();
  });

  return transpiled;
}

function transpileNode(
  addPart: (category: string, part: string) => void,
  node: vNode,
  isRoot: boolean,
  parent?: string
) {
  let name: string = crypto.randomUUID();
  if (typeof node.props.name === "string" && node.props.name) {
    name = node.props.name;
    delete node.props.name;
  }
  Nodes[node.type as keyof typeof Nodes](
    { isRoot, parent, name, addPart },
    node.props
  );
  if ("children" in node.props) {
    (node.props as { children: vNode[] }).children.forEach((child) => {
      transpileNode(
        addPart,
        child,
        false,
        parent
          ? parent === "."
            ? name
            : `${parent}/${name}`
          : isRoot
          ? "."
          : name
      );
    });
  }
}
