import path from "path"

export function toRelativePath(from: string, to: string): string {
  const relativePath = path.relative(from, to)
  if (!relativePath.startsWith(`..${path.sep}`)) {
    return `.${path.sep}${relativePath}`
  }

  return relativePath
}
