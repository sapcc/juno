import { getOidcConfig } from "../src/oidcConfig"
import { handleResponse } from "../src/codeFlow"

const testConfig = {
  issuer: "https://issuer.com",
  authorization_endpoint: "https://issuer.com/auth",
  token_endpoint: "https://issuer.com/token",
  jwks_uri: "https://issuer.com/keys",
  userinfo_endpoint: "https://issuer.com/userinfo",
  device_authorization_endpoint: "https://issuer.com/device/code",
  grant_types_supported: [
    "authorization_code",
    "refresh_token",
    "urn:ietf:params:oauth:grant-type:device_code",
  ],
  response_types_supported: ["code"],
  subject_types_supported: ["public"],
  id_token_signing_alg_values_supported: ["RS256"],
  code_challenge_methods_supported: ["S256", "plain"],
  scopes_supported: ["openid", "email", "groups", "profile", "offline_access"],
  token_endpoint_auth_methods_supported: [
    "client_secret_basic",
    "client_secret_post",
  ],
  claims_supported: [
    "iss",
    "sub",
    "aud",
    "iat",
    "exp",
    "email",
    "email_verified",
    "locale",
    "name",
    "preferred_username",
    "at_hash",
  ],
}

const testIdToken =
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

jest.mock("./oidcConfig.js", () => ({
  getOidcConfig: jest.fn(() => Promise.resolve(testConfig)),
}))

globalThis.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ id_token: testIdToken }),
  })
)

describe("handleResponse", () => {
  test("url does not contain code and error", async () => {
    const searchParams = new URLSearchParams("")

    await expect(handleResponse({ searchParams })).rejects.toThrow(
      "bad response, missing code param"
    )
  })

  test("url contains error", async () => {
    const searchParams = new URLSearchParams("error=unsupported_response_type")

    await expect(handleResponse({ searchParams })).rejects.toThrow(
      "unsupported_response_type"
    )
  })

  test("cliend_id is required", async () => {
    const searchParams = new URLSearchParams("code=test")

    await expect(handleResponse({ searchParams })).rejects.toThrow(
      "clientId is required"
    )
  })

  describe("code is presented", () => {
    test("call getOidcConfig", async () => {
      const searchParams = new URLSearchParams("code=123456789")

      await handleResponse({
        searchParams,
        issuerURL: "http://issuer.com",
        clientId: "test",
      })

      expect(getOidcConfig).toHaveBeenCalledWith("http://issuer.com")
    })

    test("call fetch", async () => {
      const searchParams = new URLSearchParams("code=123456789")

      await handleResponse({
        searchParams,
        issuerURL: "http://issuer.com",
        code: "123456",
        pkce: "test",
        clientId: "test",
      })

      expect(globalThis.fetch).toHaveBeenCalledWith(
        "https://issuer.com/token",
        expect.objectContaining({
          method: "POST",
        })
      )
    })

    test("call fetch", async () => {
      const searchParams = new URLSearchParams("code=123456789")

      const data = await handleResponse({
        searchParams,
        issuerURL: "http://issuer.com",
        code: "123456",
        pkce: "test",
        clientId: "test",
      })

      expect(data.tokenData).toEqual(
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
})

//?code=4454554df477w01s34540672dc462e6f0&state=state
