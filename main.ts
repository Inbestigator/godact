import { join } from "jsr:@std/path";
import { extractNodes, type vNode } from "./parser.ts";

interface ComponentData {
  path: string;
  vnodes?: vNode;
}

const ignoredDirs: string[] = [];

const startDir = Deno.cwd();
const outputFilePath = join(startDir, "gdxFiles.json");

const gdxFiles = findGDXFiles(startDir);
const componentsData: Record<string, ComponentData> = {};

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

async function writeToJsonFile(
  data: Record<string, ComponentData>,
  outputFilePath: string
) {
  const jsonData = JSON.stringify(data, null, 2);
  await Deno.writeFile(outputFilePath, new TextEncoder().encode(jsonData));
}

for (const gdxFile of gdxFiles) {
  const result = await extractNodes(gdxFile);
  if (result) {
    const { nodeName, vnodes } = result;
    componentsData[nodeName] = {
      path: gdxFile,
      vnodes: vnodes ?? undefined,
    };
  }
}

if (Object.keys(componentsData).length > 0) {
  await writeToJsonFile(componentsData, outputFilePath);
} else {
  console.log("No valid _gdact functions found in .gdx files.");
}
