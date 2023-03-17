import { parseIdTokenData, decodeIDToken } from "../src/tokenHelpers"
import { testIdToken, testTokenData } from "./__utils__/idTokenMock"

describe("decodeIDToken", () => {
  test("should decode id token", () => {
    const data = decodeIDToken(testIdToken)
    expect(data).toEqual(expect.objectContaining(testTokenData))
  })
})

describe("parseIdTokenData", () => {
  test("should convert oidc token data without groups and login_name", () => {
    const data = parseIdTokenData({
      aud: "12a34b5c-6d78-9e1f-g345-67h89ijkl123",
      sub: "P123456",
      mail: "dona.moore@example.com",
      iss: "https://my-tenant.accounts.ondemand.com",
      last_name: "Moore",
      sap_uid: "123456abc7de8-fghi-9123-j456-78912kl34m56",
      exp: Math.floor((Date.now() + 8 * 60 * 60 * 1000) / 1000),
      iat: Math.floor(Date.now() / 1000),
      first_name: "Dona",
      jti: "38e42330-de7a-4130-a3a1-b582b528da98",
      nonce: "12345",
    })
    expect(data).toEqual(
      expect.objectContaining({
        loginName: "P123456",
        firstName: "Dona",
        lastName: "Moore",
        fullName: "Dona Moore",
        email: "dona.moore@example.com",
      })
    )
  })

  test("should convert oidc token data including groups and login_name", () => {
    const data = parseIdTokenData({
      aud: "12a34b5c-6d78-9e1f-g345-67h89ijkl123",
      sub: "P123456",
      mail: "dona.moore@example.com",
      iss: "https://my-tenant.accounts.ondemand.com",
      last_name: "Moore",
      sap_uid: "123456abc7de8-fghi-9123-j456-78912kl34m56",
      exp: Math.floor((Date.now() + 8 * 60 * 60 * 1000) / 1000),
      iat: Math.floor(Date.now() / 1000),
      first_name: "Dona",
      jti: "38e42330-de7a-4130-a3a1-b582b528da98",
      nonce: "12345",
      groups: ["test"],
      login_name: "test",
    })
    expect(data).toEqual(
      expect.objectContaining({
        loginName: "P123456",
        firstName: "Dona",
        lastName: "Moore",
        fullName: "Dona Moore",
        email: "dona.moore@example.com",
        groups: ["test"],
        loginName: "test",
      })
    )
  })
})
