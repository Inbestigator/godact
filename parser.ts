export interface vNode {
  type: string;
  props: Record<string, unknown>;
}

export async function extractNodes(filePath: string) {
  const content = await Deno.readTextFile(filePath);

  const regex = /func _gdact\(\) -> (\w+):\s*return\s*\(([\s\S]*?)\)/;
  const match = content.match(regex);

  if (match && match[1] && match[2]) {
    const nodeName = match[1].trim();
    const components = match[2].trim();
    return { nodeName, vdom: convertToVDOM(components) };
  }
  return null;
}

function convertToVDOM(components: string) {
  const vdom: vNode = {
    type: "Fragment",
    props: {
      children: [],
    },
  };

  const lines = components
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  for (const line of lines) {
    const [type, props] = line.split(" ");
    const parsedProps = parseProps(props);
    vdom.props.children = [];
    (vdom.props.children as vNode[]).push({ type, props: parsedProps });
  }

  return vdom;
}

function parseProps(propsString: string) {
  if (!propsString) {
    return {};
  }
  const props: Record<string, unknown> = {};
  const propsArray = propsString.split(",").map((p) => p.trim());
  for (const prop of propsArray) {
    const [key, value] = prop.split("=");
    props[key] = value ? parseFloat(value) : value;
  }
  return props;
}
