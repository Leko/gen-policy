import path from "path"
import findUp from "find-up"
import { Policy } from "./types"
import { generatePolicy } from "./generatePolicy"

export async function generatePolicies(
  entry: string,
  manifestDir: string
): Promise<Pick<Policy, "resources">> {
  const packageJsonPath = await findUp("package.json", {
    cwd: path.dirname(entry),
  })

  return {
    resources: {
      ...(await generatePolicy(entry, manifestDir)),
      ...(packageJsonPath
        ? await generatePolicy(packageJsonPath, manifestDir)
        : {}),
    },
  }
}
