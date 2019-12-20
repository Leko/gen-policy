#!/usr/bin/env node
import fs from "fs"
import path from "path"
import chalk from "chalk"
import { prompt } from "enquirer"
import { options } from "./options"
import { generatePolicies } from "../generatePolicies"
import { calculateIntegrity } from "../calculateIntegrity"

async function parseArgs() {
  const cliOptions = options.parse()
  const entry = cliOptions["entry"] as string
  const outFile = cliOptions["out-file"]
  const outDir = cliOptions["out-dir"]
  const force = cliOptions["force"]

  if (!fs.existsSync(entry)) {
    throw new Error(`Entry file ${entry} doesn't exists`)
  }
  if (!fs.existsSync(outDir)) {
    throw new Error(`Entry file ${entry} doesn't exists`)
  }
  const out = path.join(outDir, outFile)
  if (fs.existsSync(out) && !force) {
    const { override } = await prompt({
      name: "override",
      type: "confirm",
      message: `${out} already exists. Are you sure you want to continue?`,
    })
    if (!override) {
      console.log("Canceled")
    }
  }
  return {
    entry,
    outFile,
    outDir,
  }
}

parseArgs()
  .then(({ entry, outFile, outDir }) => {
    const out = path.join(outDir, outFile)
    const relativeOut = path.relative(process.cwd(), out)
    return generatePolicies(entry, outDir).then(policy => {
      const content = JSON.stringify(policy, null, 2)
      fs.writeFileSync(out, content)
      const integrity = calculateIntegrity(content)
      const cmd = chalk.bold.cyan(
        `node --experimental-policy=${relativeOut} --policy-integrity=${integrity} ${entry}`
      )
      console.log(chalk.dim(`The policy file was saved to ${relativeOut}.`))
      console.log(
        chalk.dim(
          `To run Node.js with this policy, run the following command:\n`
        )
      )
      console.log("  $ " + cmd)
    })
  })
  .catch(e => {
    console.error(e.stack)
    process.exit(1)
  })
