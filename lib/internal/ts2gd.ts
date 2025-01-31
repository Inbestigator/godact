import type { AnyNode } from "acorn";

export function ts2gd(node: AnyNode, indent = 0): string {
  const indentation = " ".repeat(indent);
  let gdscript = "";

  if (!node) {
    return "";
  }

  switch (node.type) {
    case "Program":
      node.body.forEach((childNode) => {
        gdscript += ts2gd(childNode, indent) + "\n";
      });
      break;

    case "IfStatement":
      gdscript += `${indentation}if ${ts2gd(node.test)}:\n`;
      gdscript += ts2gd(node.consequent, indent + 4);
      break;

    case "BlockStatement":
      node.body.forEach((childNode) => {
        gdscript += ts2gd(childNode, indent);
      });
      break;

    case "ExpressionStatement":
      gdscript += indentation + ts2gd(node.expression) + "\n";
      break;

    case "CallExpression":
      gdscript += `${ts2gd(node.callee)}(${
        node.arguments
          .map(ts2gd)
          .join(", ")
      })`;
      break;

    case "MemberExpression":
      if ("name" in node.property) {
        gdscript += `${ts2gd(node.object)}.${node.property.name}`;
      }
      break;

    case "BinaryExpression":
      gdscript += `${ts2gd(node.left)} ${node.operator} ${ts2gd(node.right)}`;
      break;

    case "Literal":
      gdscript += JSON.stringify(node.value);
      break;

    case "Identifier":
      gdscript += node.name;
      break;

    case "VariableDeclaration":
      if (
        node.declarations[0] &&
        "name" in node.declarations[0].id
      ) {
        if (node.declarations[0].init) {
          gdscript += `${indentation}var ${node.declarations[0].id.name} = ${
            ts2gd(node.declarations[0].init)
          }\n`;
        } else {
          gdscript += `${indentation}var ${node.declarations[0].id.name}`;
        }
      }
      break;

    case "FunctionDeclaration":
      gdscript += `${indentation}func ${node?.id?.name ?? ""}(${
        node.params.map(ts2gd).join(", ")
      }):\n`;
      gdscript += ts2gd(node.body, indent + 4);
      break;

    case "FunctionExpression":
      gdscript += `${indentation}func ${node?.id?.name ?? ""}(${
        node.params.map(ts2gd).join(", ")
      }):\n`;
      gdscript += ts2gd(node.body, indent + 4);
      break;

    case "ArrowFunctionExpression":
      gdscript += `${indentation}func ${node?.id?.name ?? ""}(${
        node.params.map(ts2gd).join(", ")
      }):\n`;
      gdscript += ts2gd(node.body, indent + 4);
      break;

    case "TemplateLiteral":
      gdscript += "`" + node.quasis.map((q) => q.value.raw).join("${}") + "`";
      break;

    case "TemplateElement":
      gdscript += node.value.raw;
      break;

    case "WhileStatement":
      gdscript += `${indentation}while ${ts2gd(node.test)}:\n`;
      gdscript += ts2gd(node.body, indent + 4);
      break;

    case "ReturnStatement":
      gdscript += `${indentation}return ${ts2gd(node.argument as AnyNode)}\n`;
      break;

    case "ArrayExpression":
      gdscript += `[${
        node.elements.map((e) => ts2gd(e as AnyNode)).join(", ")
      }]`;
      break;

    case "ArrayPattern":
      gdscript += `[${
        node.elements.map((e) => ts2gd(e as AnyNode)).join(", ")
      }]`;
      break;

    case "ObjectExpression":
      gdscript += `{${
        node.properties
          .map((e) =>
            "key" in e &&
            `"${ts2gd(e.key as AnyNode)}": ${ts2gd(e.value as AnyNode)}`
          )
          .join(", ")
      }}`;
      break;

    case "SequenceExpression":
      gdscript += `[${
        node.expressions.map((e) => ts2gd(e as AnyNode)).join(", ")
      }]`;
      break;

    case "ForInStatement":
      gdscript += `${indentation}for ${ts2gd(node.left)} in ${
        ts2gd(
          node.right,
        )
      }:\n`;
      gdscript += ts2gd(node.body, indent + 4);
      break;

    case "AssignmentPattern":
      gdscript += `${ts2gd(node.left)} = ${ts2gd(node.right)}`;
      break;

    case "TaggedTemplateExpression":
      gdscript += `${ts2gd(node.tag)}(${ts2gd(node.quasi)})`;
      break;

    case "ForOfStatement":
      gdscript += `${indentation}for ${ts2gd(node.left)} in ${
        ts2gd(node.right)
      }:\n`;
      gdscript += ts2gd(node.body, indent + 4);
      break;

    case "AssignmentExpression":
      gdscript += `${ts2gd(node.left)}${node.operator}${ts2gd(node.right)}`;
      break;

    case "UpdateExpression":
      gdscript += `${ts2gd(node.argument)}${node.operator}`;
      break;

    case "LogicalExpression":
      gdscript += `${ts2gd(node.left)} ${
        node.operator === "&&"
          ? "and"
          : node.operator === "||"
          ? "or"
          : node.operator
      } ${ts2gd(node.right)}`;
      break;

    default:
      gdscript += `# Unhandled node type: ${node.type}`;
  }

  return gdscript;
}
