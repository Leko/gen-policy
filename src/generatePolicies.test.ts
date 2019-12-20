import fs from "fs"
import path from "path"
import { generatePolicies } from "../src"

const BASE_DIR = path.join(__dirname, "..", "fixtures")

describe("E2E", () => {
  const dirNames = fs
    .readdirSync(BASE_DIR)
    .map(dirName => path.join(BASE_DIR, dirName))
    .filter(dir => fs.statSync(dir).isDirectory())
  const table = dirNames.map(dir => [path.relative(process.cwd(), dir)])

  test.each(table)("Snapshot: %s", async dir => {
    const entry = path.join(dir, "entry.js")
    const manifestDir = path.join(dir, "policy.json")
    expect(await generatePolicies(entry, manifestDir)).toMatchSnapshot()
  })
})
