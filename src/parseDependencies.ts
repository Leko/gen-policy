import path from "path"
import { parse } from "@babel/parser"
import traverse from "@babel/traverse"
import { sync as enhancedResolve } from "enhanced-resolve"
// @ts-ignore
import isBuiltinModule from "is-builtin-module"
import { DependencyRedirection } from "./types"

export function parseDependencies(
  code: string,
  filePath: string
): DependencyRedirection {
  const dependencies: DependencyRedirection = {}
  const ast = parse(code)

  traverse(ast, {
    CallExpression({ node }) {
      if (node.callee.type !== "Identifier" || node.callee.name !== "require") {
        return
      }
      if (node.arguments[0].type !== "StringLiteral") {
        // TODO: warning log
        return
      }

      const source = node.arguments[0].value
      if (isBuiltinModule(source)) {
        dependencies[source] = true
      } else {
        dependencies[source] = enhancedResolve(path.dirname(filePath), source)
      }
    },
  })

  return dependencies
}
