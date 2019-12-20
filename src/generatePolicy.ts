import { promises as fs } from "fs"
import { PolicyItem, DependencyRedirection } from "./types"
import { calculateIntegrity } from "./calculateIntegrity"
import { parseDependencies } from "./parseDependencies"
import { toRelativePath } from "./toRelativePath"

export async function generatePolicy(
  entry: string,
  manifestDir: string
): Promise<Record<string, PolicyItem>> {
  const relativePath = toRelativePath(manifestDir, entry)
  const content = await fs.readFile(entry, "utf8")
  const integrity = calculateIntegrity(content)

  if (entry.endsWith(".json")) {
    return {
      [relativePath]: {
        integrity,
      },
    }
  }
  const rawDependencies = parseDependencies(content, entry)

  const dependencies: DependencyRedirection = {}
  for (let source in rawDependencies) {
    const modulePath = rawDependencies[source]
    if (typeof modulePath === "boolean") {
      dependencies[source] = modulePath
    } else {
      dependencies[source] = toRelativePath(manifestDir, modulePath)
    }
  }

  const rest = await Promise.all(
    Object.values(rawDependencies)
      .filter((f): f is string => typeof f !== "boolean")
      .map(f => generatePolicy(f, manifestDir))
  )

  return {
    [relativePath]: {
      integrity,
      dependencies,
    },
    ...rest.reduce((acc, map) => ({ ...acc, ...map }), {}),
  }
}
