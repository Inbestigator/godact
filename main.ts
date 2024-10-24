import { join } from "jsr:@std/path";
import extractNodes, { type vNode } from "./parser.ts";
import transpile from "./transpiler.ts";

export interface ComponentData {
  path: string;
  root?: vNode;
}

const vNodes: Record<string, ComponentData> = {};

const ignoredDirs: string[] = [];

const startDir = Deno.cwd();

const gdxFiles = findGDXFiles(startDir);

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

for (const gdxFile of gdxFiles) {
  const result = await extractNodes(gdxFile);
  if (result) {
    const { nodeName, root } = result;
    vNodes[nodeName] = {
      path: gdxFile,
      root,
    };
  }
}

const transpiled = transpile(vNodes);

Object.entries(transpiled).forEach(([nodeName, transpiledNode]) => {
  Deno.writeFileSync(
    join(Deno.cwd(), "scenes", `${nodeName}.tscn`),
    new TextEncoder().encode(transpiledNode)
  );
});
