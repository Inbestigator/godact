import { DOMParser, Element } from "npm:@xmldom/xmldom";

export interface vNode {
  type: string;
  props: Record<string, any>;
}

export async function extractNodes(filePath: string) {
  const content = await Deno.readTextFile(filePath);

  const regex = /func _gdact\(\) -> (\w+):\s*return\s*\(([\s\S]*?)\)/;
  const match = content.match(regex);

  if (match && match[1] && match[2]) {
    const nodeName = match[1].trim();
    const components = match[2].trim();
    return { nodeName, children: convertToNodes(components) };
  }
  return null;
}

function convertToNodes(components: string) {
  const { documentElement } = new DOMParser().parseFromString(
    components.trim(),
    "text/xml"
  );

  function nodeToObject(node: Element) {
    const obj = {
      type: node.nodeName,
      props: {},
    } as vNode;

    if (node.attributes?.length > 0) {
      Array.from(node.attributes).forEach((attr) => {
        const { name, value } = attr;
        let newValue: unknown = value;
        if (name === value) {
          newValue = true;
        }
        if (value.startsWith("{") && value.endsWith("}")) {
          newValue = value.slice(1, -1);
          if (!isNaN(Number(newValue))) newValue = Number(newValue);
        }
        obj.props[attr.name] = newValue;
      });
    }

    if (node.hasChildNodes()) {
      (obj.props as { children?: unknown[] }).children = Array.from(
        node.childNodes
      )
        .filter((child) => child.nodeName !== "#text")
        .map((childNode) => nodeToObject(childNode as Element));
    }

    return obj;
  }

  if (!documentElement) {
    return;
  }

  const nodeObjects = nodeToObject(documentElement);

  return nodeObjects;
}
