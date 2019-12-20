export type DependencyRedirection = Record<string, string | boolean>

export type PolicyItem = {
  integrity: string
  dependencies?: DependencyRedirection
}

export type Policy = {
  onerror: "exit" | "log" | "throw"
  resources: Record<string, PolicyItem>
}
