type Prop = {
  name: string;
  type: string;
  required?: boolean;
};

type ComponentDefinition = {
  name: string;
  extends: string;
  props: Prop[];
  docs: string[];
  docsHref: string;
  category: string;
  specialProps: Record<
    string,
    {
      type: "SubResource" | "ExtResource" | "Custom";
      idIndex: number;
      value?: string;
    }
  >;
  resources: Record<
    string,
    {
      type: "SubResource" | "ExtResource" | "Custom";
      idIndex: number;
      value?: string;
    }
  >;
};

function generateComponent(def: ComponentDefinition, deep: number): string {
  const {
    name,
    props,
    category,
    extends: extendsName,
    specialProps,
    resources,
    docs,
    docsHref,
  } = def;

  const propsInterface = `${name}Props`;
  const interfaceProps = props
    .map((prop) => `${prop.name}${prop.required ? "" : "?"}: ${prop.type};`)
    .join("\n  ");
  const nonImportableProps = [
    "string",
    "number",
    "boolean",
    "ReactNode",
    "true",
    "false",
    "null",
  ];
  const propImports = Array.from(
    new Set(
      [...props, { type: extendsName, name: "extends" }]
        .filter((p) =>
          !nonImportableProps.includes(p.type) && !p.type.includes("|")
        )
        .map((p) => {
          const match = p.type.match(/(.+)<(.+)>/);
          if (match) {
            return [match[1], match[2]];
          }
          return p.type;
        }),
    ),
  );

  return `// @ts-types="@types/react"
  import React, { type ReactNode } from "react";
  import { GodotNode } from "${"../".repeat(deep)}internal/element.ts";
  import { createNode, type Node } from "${"../".repeat(deep)}internal/node.ts";
  import {
    ${
    Object.values(resources).some((v) =>
        v.type !== "Custom" ||
        (v.type === "Custom" && v.value?.includes("addCommonProps"))
      )
      ? "addCommonProps,"
      : ""
  }
    addNodeEntry,
    createId,
  } from "${"../".repeat(deep)}internal/helpers.ts";
  import type {${propImports.join(",\n")}} from "@inbestigator/godact";
  
  React.version; // Purely linter fix, remove once import React doesn't cause no-unused-vars and verbatim-module-syntax
  
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
    const node = createNode<${propsInterface}>(props);${
    Object.keys(resources).length > 0 || Object.keys(specialProps).length > 0
      ? "\nconst resourceIds = new Array(100).fill(createId());"
      : ""
  }
    const nodeName = props.name ?? createId();
  
    return {
      ...node,
      insertMe(script, parent) {
        addNodeEntry({
          type: "${name}",
          name: nodeName,
          parent,
          props: {
            ...props,
            ${
    Object.entries(specialProps)
      .map(([key, value]) => {
        if (value.type === "SubResource") {
          return `...(props.${key} && { ${key}: { typeSpecifier: "SubResource", value: \`"\${resourceIds[${value.idIndex}]}"\`} })`;
        }
        if (value.type === "ExtResource") {
          return `...(props.${key} && { ${key}: { typeSpecifier: "ExtResource", value: \`"\${resourceIds[${value.idIndex}]}"\`} })`;
        }
        if (value.type === "Custom" && value.value) {
          return `...(props.${key} && { ${value.value}})`;
        }
        throw new Error("Unknown resource type");
      })
      .join(",\n")
  }
          },
          script,
        });

        ${
    Object.entries(resources)
      .map(([key, value]) => {
        if (value.type === "SubResource") {
          return `if (props.${key}) {script.internal.push({ text: \`[sub_resource type="\${props.${key}.type}" id="\${resourceIds[${value.idIndex}]}"]\`, props: addCommonProps({ ...props.${key}.props }, script) });}`;
        }
        if (value.type === "ExtResource") {
          return `if (props.${key}) {script.external.push({ text: \`[ext_resource type="\${props.${key}.type}" id="\${resourceIds[${value.idIndex}]}"]\`, props: addCommonProps({ ...props.${key}.props }, script) });}`;
        }
        if (value.type === "Custom" && value.value) {
          return `if (props.${key}) {${value.value}};`;
        }
        throw new Error("Unknown resource type");
      })
      .join("\n")
  }

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

function generateComponents(dir: string, nodesToUpdate: string[]) {
  for (const entry of Deno.readDirSync(dir)) {
    const filePath = `${dir}/${entry.name}`;

    if (entry.isFile && entry.name.endsWith(".node.json")) {
      const fileContents = Deno.readTextFileSync(filePath);
      const componentDefinition = JSON.parse(
        fileContents,
      ) as ComponentDefinition;

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
      generateComponents(filePath, nodesToUpdate);
    }
  }
}

const nodesToUpdate = Deno.args;
generateComponents("./lib/core/nodes", nodesToUpdate);
