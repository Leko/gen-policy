import { calculateIntegrity } from "./calculateIntegrity"

describe("calculateIntegrity", () => {
  it("calculates integrity correctly", () => {
    expect(calculateIntegrity(``)).toBe(
      "sha384-OLBgp1GsljhM2TJ+sbHjaiH9txEUvgdDTAzHv2P24donTt6/529l+9Ua0vFImLlb"
    )
  })
  it("calculates integrity correctly when empty string", () => {
    expect(calculateIntegrity(`xxx`)).toBe(
      "sha384-EknhXwNe00eGoyjZ/bJomrJPfHslPRt/Zu2SpnnWY91QLXvtpZlz6MkacouSn8jN"
    )
  })
})
