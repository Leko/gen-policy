import crypto from "crypto"

export function calculateIntegrity(content: string): string {
  return (
    "sha384-" +
    crypto
      .createHash("sha384")
      .update(content)
      .digest("base64")
  )
}
