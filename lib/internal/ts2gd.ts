import ts from "typescript";
const SyntaxKind = ts.SyntaxKind;

export function ts2gd(node: ts.Node, indent = 0): string {
  const indentation = " ".repeat(indent);
  let gdscript = "";

  if (!node) {
    return "";
  }

  function ifStatement(statement: ts.IfStatement) {
    gdscript += ts2gd(statement.thenStatement, indent + 4);

    if (statement.elseStatement) {
      if (statement.elseStatement.kind === SyntaxKind.IfStatement) {
        const stm = statement.elseStatement as ts.IfStatement;
        gdscript += `${indentation}elif ${ts2gd(stm.expression)}:\n`;
        ifStatement(stm);
      } else {
        gdscript += `${indentation}else:\n`;
        gdscript += ts2gd(statement.elseStatement, indent + 4);
      }
    }
  }

  switch (node.kind) {
    case SyntaxKind.StringLiteral: {
      const lit = node as ts.StringLiteral;
      gdscript += `"${lit.text}"`;
      break;
    }

    case SyntaxKind.ObjectBindingPattern: {
      const pattern = node as ts.ObjectBindingPattern;
      gdscript += `{${pattern.elements.map(ts2gd).join(", ")}}`;
      break;
    }

    case SyntaxKind.BindingElement: {
      const element = node as ts.BindingElement;
      gdscript += ts2gd(element.name);
      if (element.initializer) {
        gdscript += ` = ${ts2gd(element.initializer)}`;
      }
      break;
    }

    case SyntaxKind.NullKeyword: {
      gdscript += "null";
      break;
    }

    case SyntaxKind.TrueKeyword: {
      gdscript += "true";
      break;
    }

    case SyntaxKind.FalseKeyword: {
      gdscript += "false";
      break;
    }

    case SyntaxKind.IfStatement: {
      const stm = node as ts.IfStatement;
      gdscript += `${indentation}if ${ts2gd(stm.expression)}:\n`;
      ifStatement(stm);
      break;
    }

    case SyntaxKind.Block: {
      const stm = node as ts.Block;
      stm.forEachChild((childNode) => {
        gdscript += ts2gd(childNode, indent);
      });
      break;
    }

    case SyntaxKind.ExpressionStatement: {
      const stm = node as ts.ExpressionStatement;
      gdscript += indentation + ts2gd(stm.expression) + "\n";
      break;
    }

    case SyntaxKind.FirstStatement:
    case SyntaxKind.LastStatement:
    case SyntaxKind.VariableStatement: {
      const stm = node as ts.VariableStatement;
      stm.declarationList.declarations.forEach((dec) => {
        gdscript += `${indentation}${ts2gd(dec)}\n`;
      });
      break;
    }

    case SyntaxKind.FirstLiteralToken:
    case SyntaxKind.LastLiteralToken:
    case SyntaxKind.NumericLiteral: {
      const lit = node as ts.NumericLiteral;
      gdscript += lit.text;
      break;
    }

    case SyntaxKind.ArrayLiteralExpression: {
      const exp = node as ts.ArrayLiteralExpression;
      gdscript += `[${exp.elements.map(ts2gd).join(", ")}]`;
      break;
    }

    case SyntaxKind.CallExpression: {
      const exp = node as ts.CallExpression;
      gdscript += `${ts2gd(exp.expression)}(${
        exp.arguments.map(ts2gd).join(", ")
      })`;
      break;
    }

    case SyntaxKind.Identifier: {
      const idn = node as ts.Identifier;
      gdscript += idn.escapedText;
      break;
    }

    case SyntaxKind.Parameter: {
      const param = node as ts.ParameterDeclaration;
      gdscript += ts2gd(param.name);
      if (param.initializer) {
        gdscript += ` = ${ts2gd(param.initializer)}`;
      }
      break;
    }

    case SyntaxKind.VariableDeclaration: {
      const dec = node as ts.VariableDeclaration;
      if (!dec.name) {
        break;
      }
      gdscript += `${indentation}var ${ts2gd(dec.name)}`;
      if (dec.initializer) {
        gdscript += ` = ${ts2gd(dec.initializer)}`;
      }
      break;
    }

    case SyntaxKind.FunctionDeclaration: {
      const dec = node as ts.FunctionDeclaration;
      if (!dec.name) {
        break;
      }
      gdscript += `${indentation}func ${ts2gd(dec.name)}(${
        dec.parameters
          .map(ts2gd)
          .join(", ")
      }):\n`;
      dec.body && (gdscript += ts2gd(dec.body, indent + 4));
      break;
    }

    case SyntaxKind.FunctionExpression: {
      const exp = node as ts.FunctionExpression;
      if (!exp.name) {
        break;
      }
      gdscript += `${indentation}func ${ts2gd(exp.name)}(${
        exp.parameters
          .map(ts2gd)
          .join(", ")
      }):\n`;
      gdscript += ts2gd(exp.body, indent + 4);
      break;
    }

    case SyntaxKind.PropertyAccessExpression: {
      const exp = node as ts.PropertyAccessExpression;
      gdscript += `${ts2gd(exp.expression)}.${ts2gd(exp.name)}`;
      break;
    }

    case SyntaxKind.WhileStatement: {
      const stm = node as ts.WhileStatement;
      gdscript += `${indentation}while ${ts2gd(stm.expression)}:\n`;
      gdscript += ts2gd(stm.statement, indent + 4);
      break;
    }

    case SyntaxKind.ReturnStatement: {
      const stm = node as ts.ReturnStatement;
      gdscript += `${indentation}return`;
      stm.expression &&
        (gdscript += ` ${ts2gd(stm.expression)}`);

      gdscript += "\n";
      break;
    }

    case SyntaxKind.ForInStatement: {
      const stm = node as ts.ForInStatement;
      gdscript += `${indentation}for ${
        ts2gd(stm.initializer).replaceAll(/var |\n/g, "")
      } in ${ts2gd(stm.expression)}:\n`;
      gdscript += ts2gd(stm.statement, indent + 4);
      break;
    }

    case SyntaxKind.VariableDeclarationList: {
      const list = node as ts.VariableDeclarationList;
      list.forEachChild((dec) => {
        gdscript += `${indentation}${ts2gd(dec)}\n`;
      });
      break;
    }

    case SyntaxKind.TaggedTemplateExpression: {
      const exp = node as ts.TaggedTemplateExpression;
      gdscript += `${ts2gd(exp.tag)}${ts2gd(exp.template)}`;
      break;
    }

    case SyntaxKind.BinaryExpression: {
      const exp = node as ts.BinaryExpression;
      gdscript += `${ts2gd(exp.left)} ${Tokenize(exp.operatorToken.kind)} ${
        ts2gd(exp.right)
      }`;
      break;
    }

    case SyntaxKind.ParenthesizedExpression: {
      const exp = node as ts.ParenthesizedExpression;
      gdscript += `(${ts2gd(exp.expression)})`;
      break;
    }

    case SyntaxKind.PrefixUnaryExpression: {
      const exp = node as ts.PrefixUnaryExpression;
      gdscript += `${Tokenize(exp.operator)}${ts2gd(exp.operand)}`;
      break;
    }

    case SyntaxKind.PostfixUnaryExpression: {
      const exp = node as ts.PostfixUnaryExpression;
      gdscript += `${ts2gd(exp.operand)}${Tokenize(exp.operator)}`;
      break;
    }

    case SyntaxKind.ConditionalExpression: {
      const exp = node as ts.ConditionalExpression;
      gdscript += `${ts2gd(exp.whenTrue)} if ${ts2gd(exp.condition)} else ${
        ts2gd(exp.whenFalse)
      }`;
      break;
    }

    case SyntaxKind.AwaitExpression: {
      const exp = node as ts.AwaitExpression;
      gdscript += `await ${ts2gd(exp.expression)}`;
      break;
    }

    case SyntaxKind.SourceFile:
      node.forEachChild((childNode) => {
        gdscript += ts2gd(childNode, indent);
      });
      break;

    case SyntaxKind.EndOfFileToken:
      break;

    default:
      gdscript += `# Unhandled node type: ${SyntaxKind[node.kind]}`;
  }

  return gdscript;
}

function Tokenize(kind: number) {
  switch (kind) {
    // Arithmetic Operators
    case SyntaxKind.PlusPlusToken:
      return "++";
    case SyntaxKind.MinusMinusToken:
      return "--";
    case SyntaxKind.PlusToken:
      return "+";
    case SyntaxKind.MinusToken:
      return "-";
    case SyntaxKind.AsteriskToken:
      return "*";
    case SyntaxKind.SlashToken:
      return "/";
    case SyntaxKind.PercentToken:
      return "%";
    case SyntaxKind.AsteriskAsteriskToken:
      return "**";
    case SyntaxKind.AsteriskAsteriskEqualsToken:
      return "**=";

    // Comparison Operators
    case SyntaxKind.LessThanToken:
      return "<";
    case SyntaxKind.GreaterThanToken:
      return ">";
    case SyntaxKind.LessThanEqualsToken:
      return "<=";
    case SyntaxKind.GreaterThanEqualsToken:
      return ">=";
    case SyntaxKind.EqualsEqualsToken:
      return "==";
    case SyntaxKind.ExclamationEqualsToken:
      return "!=";
    case SyntaxKind.EqualsEqualsEqualsToken:
      return "===";
    case SyntaxKind.ExclamationEqualsEqualsToken:
      return "!==";

    // Logical Operators
    case SyntaxKind.AmpersandAmpersandToken:
      return "and";
    case SyntaxKind.BarBarToken:
      return "or";
    case SyntaxKind.AmpersandToken:
      return "&";
    case SyntaxKind.BarToken:
      return "|";
    case SyntaxKind.CaretToken:
      return "^";
    case SyntaxKind.ExclamationToken:
      return "!";
    case SyntaxKind.AmpersandAmpersandEqualsToken:
      return "&&=";
    case SyntaxKind.BarBarEqualsToken:
      return "||=";
    case SyntaxKind.TildeToken:
      return "~";

    // Assignment Operators
    case SyntaxKind.EqualsToken:
      return "=";
    case SyntaxKind.PlusEqualsToken:
      return "+=";
    case SyntaxKind.MinusEqualsToken:
      return "-=";
    case SyntaxKind.AsteriskEqualsToken:
      return "*=";
    case SyntaxKind.SlashEqualsToken:
      return "/=";
    case SyntaxKind.PercentEqualsToken:
      return "%=";
    case SyntaxKind.AmpersandEqualsToken:
      return "&=";
    case SyntaxKind.BarEqualsToken:
      return "|=";
    case SyntaxKind.CaretEqualsToken:
      return "^=";
    case SyntaxKind.LessThanLessThanEqualsToken:
      return "<<=";
    case SyntaxKind.GreaterThanGreaterThanEqualsToken:
      return ">>=";
    case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
      return ">>>=";
    case SyntaxKind.QuestionQuestionEqualsToken:
      return "??=";

    // Shift Operators
    case SyntaxKind.LessThanLessThanToken:
      return "<<";
    case SyntaxKind.GreaterThanGreaterThanToken:
      return ">>";
    case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
      return ">>>";

    // Ternary and Optional Chaining
    case SyntaxKind.QuestionToken:
      return "?";
    case SyntaxKind.ColonToken:
      return ":";
    case SyntaxKind.QuestionQuestionToken:
      return "??";
    case SyntaxKind.QuestionDotToken:
      return "?.";
    case SyntaxKind.EqualsGreaterThanToken:
      return "=>";

    // Punctuation Tokens
    case SyntaxKind.AtToken:
      return "@";
    case SyntaxKind.HashToken:
      return "#";
    case SyntaxKind.BacktickToken:
      return "`";
    case SyntaxKind.DotToken:
      return ".";
    case SyntaxKind.CommaToken:
      return ",";
    case SyntaxKind.SemicolonToken:
      return ";";
    case SyntaxKind.DotDotDotToken:
      return "...";
    case SyntaxKind.LessThanSlashToken:
      return "</";

    // Parentheses and Braces
    case SyntaxKind.OpenBraceToken:
      return "{";
    case SyntaxKind.CloseBraceToken:
      return "}";
    case SyntaxKind.OpenParenToken:
      return "(";
    case SyntaxKind.CloseParenToken:
      return ")";
    case SyntaxKind.OpenBracketToken:
      return "[";
    case SyntaxKind.CloseBracketToken:
      return "]";

    // End of File Token
    case SyntaxKind.EndOfFileToken:
      return "EOF";

    // Default case for unhandled symbols
    default:
      return `# Unhandled symbol: ${SyntaxKind[kind]}`;
  }
}
