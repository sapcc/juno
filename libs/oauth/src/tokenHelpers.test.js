import { parseIdTokenData, decodeIDToken } from "./tokenHelpers"

const idToken =
  "test_header." +
  btoa(
    JSON.stringify({
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
  ) +
  ".test_signature"

describe("decodeIDToken", () => {
  test("should decode id token", () => {
    const data = decodeIDToken(idToken)
    expect(data).toEqual(
      expect.objectContaining({
        aud: "12a34b5c-6d78-9e1f-g345-67h89ijkl123",
        sub: "P123456",
        mail: "dona.moore@example.com",
        iss: "https://my-tenant.accounts.ondemand.com",
        last_name: "Moore",
        sap_uid: "123456abc7de8-fghi-9123-j456-78912kl34m56",
        first_name: "Dona",
        jti: "38e42330-de7a-4130-a3a1-b582b528da98",
        nonce: "12345",
      })
    )
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
        subject: "P123456",
        login_name: undefined,
        first_name: "Dona",
        last_name: "Moore",
        full_name: "Dona Moore",
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
        subject: "P123456",
        login_name: undefined,
        first_name: "Dona",
        last_name: "Moore",
        full_name: "Dona Moore",
        email: "dona.moore@example.com",
        groups: ["test"],
        login_name: "test",
      })
    )
  })
})
