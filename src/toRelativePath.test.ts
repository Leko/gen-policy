import { toRelativePath } from "./toRelativePath"

describe("toRelativePath", () => {
  it("should be started with ./", () => {
    expect(toRelativePath("/a", "/a/b.js")).toBe("./b.js")
  })
  it("should not be started with ./ when arg starts with ../", () => {
    expect(toRelativePath("/a", "/b/b.js")).toBe("../b/b.js")
  })
})
