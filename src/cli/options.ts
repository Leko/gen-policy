import Yargs from "yargs"
import path from "path"

export const options = Yargs.scriptName("gen-policy")
  .usage("$0 <entry>")
  .option("out-file", {
    type: "string",
    default: "policy.json",
    description: "Output file name",
  })
  .option("out-dir", {
    type: "string",
    default: process.cwd(),
    coerce: arg => (path.isAbsolute(arg) ? arg : path.join(process.cwd(), arg)),
    description: "Output directory",
  })
  .option("onerror", {
    type: "string",
    choices: ["exit", "throw", "log"],
    description: "Output path",
  })
  .option("force", {
    alias: "f",
    type: "boolean",
    description: "Always override even if output file already exists",
  })
  .command("$0 <entry>", "Generate policy", yargs =>
    yargs.positional("entry", {
      type: "string",
    })
  )
