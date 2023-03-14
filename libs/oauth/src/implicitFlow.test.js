import { handleResponse } from "./implicitFlow"

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

describe("handleResponse", () => {
  test("url does not contain id_token and error", async () => {
    const searchParams = new URLSearchParams("")

    await expect(handleResponse({ searchParams })).rejects.toThrow(
      "bad response, missing id_token"
    )
  })

  test("url contains error", async () => {
    const searchParams = new URLSearchParams("error=unsupported_response_type")

    await expect(handleResponse({ searchParams })).rejects.toThrow(
      "unsupported_response_type"
    )
  })

  test("id_token has bad format", async () => {
    const searchParams = new URLSearchParams("id_token=test")

    await expect(handleResponse({ searchParams })).rejects.toThrow(
      "bad format of id_token"
    )
  })

  test("should return token data", async () => {
    const searchParams = new URLSearchParams("id_token=" + testIdToken)

    handleResponse({ searchParams }).then(({ tokenData, idToken }) => {
      expect(tokenData).toEqual(
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

      expect(idToken).toEqual(testIdToken)
    })
  })
})
