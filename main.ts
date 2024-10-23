import { join } from "jsr:@std/path";

interface vNode {
  type: string;
  props: Record<string, unknown>;
}

const ignoredDirs: string[] = [];

function findGDXFiles(dir: string): string[] {
  let gdxFiles: string[] = [];

  const items = Deno.readDirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item.name);

    if (Deno.statSync(fullPath).isDirectory) {
      if (!ignoredDirs.includes(item.name)) {
        gdxFiles = gdxFiles.concat(findGDXFiles(fullPath));
      }
    } else if (item.name.endsWith(".gdx")) {
      gdxFiles.push(fullPath);
    }
  }

  return gdxFiles;
}

async function extractGDactComponents(filePath: string) {
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

async function writeToJsonFile(
  data: Record<string, { path: string; vdom: vNode } | null>,
  outputFilePath: string
) {
  const jsonData = JSON.stringify(data, null, 2);
  await Deno.writeFile(outputFilePath, new TextEncoder().encode(jsonData));
}

const startDir = Deno.cwd();
const outputFilePath = join(startDir, "gdxFiles.json");

const gdxFiles = findGDXFiles(startDir);
const componentsData: Record<string, { path: string; vdom: vNode } | null> = {};

for (const gdxFile of gdxFiles) {
  const result = await extractGDactComponents(gdxFile);
  if (result) {
    const { nodeName, vdom } = result;
    componentsData[nodeName] = {
      path: gdxFile,
      vdom,
    };
  }
}

if (Object.keys(componentsData).length > 0) {
  await writeToJsonFile(componentsData, outputFilePath);
} else {
  console.log("No valid _gdact functions found in .gdx files.");
}
