export type ComponentDefinition = {
  name: string;
  extends: string;
  inherits?: ComponentDefinition;
  props: Record<string, string>;
  docs: string[];
  docsHref: string;
  category: string;
};

function generateComponent(def: ComponentDefinition, deep: number): string {
  const {
    name,
    props,
    category,
    extends: extendsName,
    docs,
    docsHref,
  } = def;

  const propsInterface = `${name}Props`;
  const interfaceProps = Object.entries(props)
    .map(([k, v]) =>
      `${k}${v.endsWith("!") ? `: ${v.slice(0, -1)}` : `?: ${v}`};`
    )
    .join("\n  ");
  const nonImportableProps = [
    "string",
    "number",
    "boolean",
    "ReactNode",
    "true",
    "false",
    "null",
    "undefined",
    "any",
    "void",
    "never",
    "unknown",
  ];
  const propImports = Array.from(
    new Set(
      [...Object.values(props), extendsName]
        .filter((p) =>
          !nonImportableProps.includes(p.replace("!", "")) &&
          !p.includes("|")
        )
        .map((p) => {
          const type = p.replace("!", "");
          const match = type.match(/(.+)<(.+)>/);
          if (match) {
            return [match[1], match[2]];
          }
          return type;
        }),
    ),
  );

  return `import type { ReactNode } from "types/react";
  import { GodotNode } from "${"../".repeat(deep)}internal/element.ts";
  import { createNode, type Node } from "${"../".repeat(deep)}internal/node.ts";
  import {
    addNodeEntry,
    createId,
  } from "${"../".repeat(deep)}internal/helpers.ts";
  import type {${propImports.join(",\n")}} from "@inbestigator/godact";
  
  /**
   * Props for a ${name}
   *
   * @category ${category}
   */
  export interface ${propsInterface} extends ${extendsName} {
    ${interfaceProps}
  }
  
  /**
   * ${docs.join("\n   * ")}
   *
   * @category ${category}
   * @see ${docsHref}
   */
  export function ${name}(props: ${propsInterface}): ReactNode {
    return (
      <GodotNode props={props} createNode={() => create${name}Node(props)}>
        {props.children}
      </GodotNode>
    );
  }
  
  function create${name}Node(props: ${propsInterface}): Node<${propsInterface}> {
    const node = createNode<${propsInterface}>(props);
    const nodeName = props.name ?? createId(props);
  
    return {
      ...node,
      insertMe(script, parent) {
        addNodeEntry({
          type: "${name}",
          name: nodeName,
          parent,
          props,
          script,
        });

        for (const child of node.children) {
          child.insertMe(script, parent ? \`\${parent}/\${nodeName}\` : ".");
        }
      },
    };
  }
  `;
}

function tsxExists(loc: string): boolean {
  try {
    Deno.lstatSync(loc);
    return true;
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      return false;
    }
    throw e;
  }
}

async function generateComponents(dir: string, nodesToUpdate: string[]) {
  for (const entry of Deno.readDirSync(dir)) {
    const filePath = `${dir}/${entry.name}`;

    if (entry.isFile && entry.name.endsWith(".node.ts")) {
      const componentDefinition = await import(filePath).then((m) => m.default);

      const outputPath = `${dir}/${entry.name.split(".")[0]}.tsx`;

      if (
        !nodesToUpdate.includes(componentDefinition.name) &&
        nodesToUpdate[0] !== "all"
      ) {
        if (nodesToUpdate.length > 0) {
          continue;
        } else {
          const shouldUpdate = confirm(
            `Found ${componentDefinition.name}, ${
              tsxExists(`${dir}/${entry.name.split(".")[0]}.tsx`)
                ? "update"
                : "generate"
            } node?`,
          );
          if (!shouldUpdate) {
            console.log(`Skipped ${componentDefinition.name}.tsx`);
            continue;
          }
        }
      }

      const componentCode = generateComponent(
        componentDefinition,
        filePath.split("/").length - 3,
      );
      Deno.writeTextFileSync(outputPath, componentCode);

      console.log(`Generated ${componentDefinition.name}.tsx in ${dir}`);
    } else if (entry.isDirectory) {
      await generateComponents(filePath, nodesToUpdate);
    }
  }
}

const nodesToUpdate = Deno.args;
await generateComponents("./lib/core/nodes", nodesToUpdate);
