import * as recast from "recast";
import { parse } from "@typescript-eslint/parser";

// Sample TypeScript code
const code = `const message: string = "Hello, World!";`;

// Parse the code into an AST (Abstract Syntax Tree)
const ast = recast.parse(code, {
  parser: {
    parse: (source: string) =>
      parse(source, { sourceType: "module", ecmaVersion: 2020 }),
  },
});

// Modify the AST (change variable name)
recast.types.visit(ast, {
  visitVariableDeclarator(path) {
    if (path.node.id.type === "Identifier" && path.node.id.name === "message") {
      path.node.id.name = "greeting";
    }
    return false;
  },
});

// Convert AST back to code
const modifiedCode = recast.print(ast).code;

console.log(modifiedCode);
