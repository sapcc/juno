import "./globalsMock"

import oidcSession from "../src/oidcSession"

describe("oidcSession", () => {
  test("should be a function", () => {
    expect(typeof oidcSession).toEqual("function")
  })

  test("allowed options", () => {
    oidcSession({
      clientID: "test",
      issuerURL: "http://dummy.com",
      initialLogin: false,
      onUpdate: () => null,
      refresh: true,
      requestParams: { organization: "Test" },
      unknown: true,
    })
    expect(globalThis.console.warn).toHaveBeenLastCalledWith(
      "WARNING: (OAUTH) unknown options: unknown. Allowed options are issuerURL, clientID, initialLogin, refresh, flowType, onUpdate, requestParams, callbackURL"
    )
  })

  test("onUpdate is a function", () => {
    expect(() => {
      oidcSession({
        clientID: "test",
        issuerURL: "http://dummy.com",
        onUpdate: true,
      })
    }).toThrowError("(OAUTH) onUpdate should be a function")
  })

  test("issuerURL is required", () => {
    expect(() => {
      oidcSession({ clientID: "test" })
    }).toThrowError()
  })

  test("clientID is required", () => {
    expect(() => {
      oidcSession({ issuerURL: "http://dummy.com" })
    }).toThrowError()
  })

  test("flowType is undefined", () => {
    oidcSession({ issuerURL: "http://dummy.com", clientID: "test" })
    expect(console.info).toHaveBeenCalledWith(
      "INFO: (OAUTH) no flowType provided, default to code"
    )
  })
  test("flowType is not supported", () => {
    expect(() => {
      oidcSession({
        issuerURL: "http://dummy.com",
        clientID: "test",
        flowType: "something",
      })
    }).toThrowError("(OAUTH) flowType something is not supported!")
  })

  describe("returned result", () => {
    let session
    beforeEach(() => {
      session = oidcSession({ clientID: "test", issuerURL: "http://dummy.com" })
    })

    test("should return an object", () => {
      expect(typeof session).toEqual("object")
    })

    test("contains currentState", () => {
      expect(session.currentState).toBeDefined()
    })
    test("contains login", () => {
      expect(session.login).toBeDefined()
    })
    test("contains logout", () => {
      expect(session.logout).toBeDefined()
    })

    test("login is a function", () => {
      expect(typeof session.login).toEqual("function")
    })
    test("logout is a function", () => {
      expect(typeof session.logout).toEqual("function")
    })

    test("currentState is a function", () => {
      expect(typeof session.currentState).toEqual("function")
    })
  })
})
// jest.mock("globals")
// jest.mock("oidcConfig")

// const oidcSession = require("./oidcSession").default

// const stateString = ({ flowType, nonce }) =>
//   btoa(
//     JSON.stringify({
//       flowType,
//       nonce,
//       key: Math.random(),
//     })
//   )

// const idToken = ({
//   aud,
//   sub,
//   mail,
//   iss,
//   last_name,
//   sap_uid,
//   exp,
//   iat,
//   first_name,
//   jti,
//   nonce,
// }) =>
//   "test_header." +
//   btoa(
//     JSON.stringify({
//       aud: aud || "12a34b5c-6d78-9e1f-g345-67h89ijkl123",
//       sub: sub || "P123456",
//       mail: mail || "dona.moore@example.com",
//       iss: iss || "https://my-tenant.accounts.ondemand.com",
//       last_name: last_name || "Moore",
//       sap_uid: sap_uid || "123456abc7de8-fghi-9123-j456-78912kl34m56",
//       exp: exp || Math.floor((Date.now() + 8 * 60 * 60 * 1000) / 1000),
//       iat: iat || Math.floor(Date.now() / 1000),
//       first_name: first_name || "Dona",
//       jti: jti || "38e42330-de7a-4130-a3a1-b582b528da98",
//       nonce,
//     })
//   ) +
//   ".test_signature"

// jest.mock("./codeFlow.js", () => ({
//   handleResponse: jest.fn().mockResolvedValue({
//     tokenData: { mail: "dona.moore@example.com", nonce: "12345" },
//     idToken: idToken({ nonce: "12345" }),
//   }),
// }))

// describe("oidcSession", () => {
//   test("should be a function", () => {
//     expect(typeof oidcSession).toEqual("function")
//   })

//   test("allowed options", () => {
//     oidcSession({
//       clientID: "test",
//       issuerURL: "http://dummy.com",
//       unknown: true,
//     })
//     expect(globalThis.console.warn).toHaveBeenCalledWith(
//       "WARNING: (OAUTH) unknown options: unknown. Allowed options are issuerURL, clientID, initialLogin, refresh, flowType, onUpdate"
//     )
//   })

//   test("onUpdate is a function", () => {
//     expect(() => {
//       oidcSession({
//         clientID: "test",
//         issuerURL: "http://dummy.com",
//         onUpdate: true,
//       })
//     }).toThrowError("(OAUTH) onUpdate should be a function")
//   })

//   test("issuerURL is required", () => {
//     expect(() => {
//       oidcSession({ clientID: "test" })
//     }).toThrowError()
//   })

//   test("clientID is required", () => {
//     expect(() => {
//       oidcSession({ issuerURL: "http://dummy.com" })
//     }).toThrowError()
//   })

//   test("flowType is undefined", () => {
//     oidcSession({ issuerURL: "http://dummy.com", clientID: "test" })
//     expect(console.warn).toHaveBeenCalledWith(
//       "WARNING: (OAUTH) no flowType provided, default to idToken"
//     )
//   })
//   test("flowType is not supported", () => {
//     expect(() => {
//       oidcSession({
//         issuerURL: "http://dummy.com",
//         clientID: "test",
//         flowType: "something",
//       })
//     }).toThrowError("(OAUTH) flowType something is not supported!")
//   })

//   describe("returned result", () => {
//     let session
//     beforeEach(() => {
//       session = oidcSession({ clientID: "test", issuerURL: "http://dummy.com" })
//     })

//     test("should return an object", () => {
//       expect(typeof session).toEqual("object")
//     })

//     test("contains login", () => {
//       expect(session.login).toBeDefined()
//     })
//     test("contains logout", () => {
//       expect(session.logout).toBeDefined()
//     })

//     test("login is a function", () => {
//       expect(typeof session.login).toEqual("function")
//     })
//     test("logout is a function", () => {
//       expect(typeof session.logout).toEqual("function")
//     })
//   })

//   describe("handle oidc response", () => {
//     test("onUpdate should be called immediately ", async () => {
//       const onUpdate = jest.fn()
//       oidcSession({ clientID: "test", issuerURL: "http://dummy.com", onUpdate })

//       expect(onUpdate).toHaveBeenLastCalledWith({
//         loggedIn: false,
//         error: null,
//         auth: null,
//         isProcessing: true,
//       })
//     })

//     test("url does not contain state param", async () => {
//       const onUpdate = jest.fn()
//       oidcSession({ clientID: "test", issuerURL: "http://dummy.com", onUpdate })

//       await new Promise(process.nextTick)
//       expect(onUpdate).toHaveBeenLastCalledWith({
//         loggedIn: false,
//         error: null,
//         auth: null,
//         isProcessing: false,
//       })
//     })

//     test("url contains state param, but no stored state", async () => {
//       const onUpdate = jest.fn()
//       oidcSession({ clientID: "test", issuerURL: "http://dummy.com", onUpdate })

//       await new Promise(process.nextTick)
//       expect(onUpdate).toHaveBeenLastCalledWith({
//         loggedIn: false,
//         error: null,
//         auth: null,
//         isProcessing: false,
//       })
//     })

//     test("url and store contain state, but they are not the same", async () => {
//       window.location.hash = "#state=test"
//       sessionStorage.setItem("__oauth_state", "somethingelse")

//       const onUpdate = jest.fn()
//       oidcSession({ clientID: "test", issuerURL: "http://dummy.com", onUpdate })

//       await new Promise(process.nextTick)
//       expect(console.warn).toHaveBeenCalledWith(
//         "(OAUTH) url state does not match stored state, ignore it!"
//       )
//       expect(onUpdate).toHaveBeenLastCalledWith({
//         loggedIn: false,
//         error: null,
//         auth: null,
//         isProcessing: false,
//       })
//     })

//     test("url and store contain same state, but not a valid format", async () => {
//       window.location.hash = "#state=test"
//       sessionStorage.setItem("__oauth_state", "test")

//       const onUpdate = jest.fn()

//       oidcSession({ clientID: "test", issuerURL: "http://dummy.com", onUpdate })

//       await new Promise(process.nextTick)
//       expect(onUpdate).toHaveBeenLastCalledWith({
//         loggedIn: false,
//         error:
//           "Error: (OAUTH) state param is compromised (could not decode state param)",
//         auth: null,
//         isProcessing: false,
//       })
//     })

//     test("url and store contain same valid state", async () => {
//       const state = stateString({
//         flowType: "idToken",
//         nonce: "12345",
//       })

//       window.location.hash = `#state=${state}`
//       sessionStorage.setItem("__oauth_state", state)

//       const onUpdate = jest.fn()

//       oidcSession({
//         clientID: "test",
//         issuerURL: "http://dummy.com",
//         onUpdate,
//       })
//       await new Promise(process.nextTick)

//       expect(onUpdate).toHaveBeenLastCalledWith({
//         loggedIn: false,
//         error: "Error: (OAUTH) bad response, missing id_token",
//         auth: null,
//         isProcessing: false,
//       })
//     })

//     describe("idToken flow", () => {
//       describe("response from id provider contains valid auth data", () => {
//         let token
//         beforeEach(() => {
//           const state = stateString({
//             flowType: "idToken",
//             nonce: "12345",
//           })
//           sessionStorage.setItem("__oauth_state", state)
//           token = idToken({ nonce: "12345" })

//           window.location.hash = `#id_token=${token}&state=${state}&token_type=Bearer`
//         })

//         afterEach(() => {
//           jest.clearAllMocks()
//           sessionStorage.removeItem("__oauth_state")
//         })

//         test("data contains user info", async () => {
//           const onUpdate = jest.fn()

//           oidcSession({
//             clientID: "test",
//             issuerURL: "http://dummy.com",
//             onUpdate,
//           })

//           await new Promise(process.nextTick)

//           expect(onUpdate).toHaveBeenLastCalledWith({
//             loggedIn: true,
//             error: null,
//             auth: expect.objectContaining({
//               idToken: token,
//               email: "dona.moore@example.com",
//             }),
//             isProcessing: false,
//           })
//         })
//       })
//     })

//     describe("code flow", () => {
//       describe("response from id provider contains code", () => {
//         beforeEach(() => {
//           const state = stateString({
//             flowType: "pkce",
//             nonce: "12345",
//           })
//           sessionStorage.setItem("__oauth_state", state)

//           window.location.search = `code=12345&state=${state}`
//         })

//         test("data contains user info", async () => {
//           const onUpdate = jest.fn()

//           oidcSession({
//             clientID: "test",
//             issuerURL: "http://dummy.com",
//             onUpdate,
//           })

//           await new Promise(process.nextTick)

//           expect(onUpdate).toHaveBeenLastCalledWith({
//             loggedIn: true,
//             error: null,
//             auth: expect.objectContaining({
//               idToken: idToken({ nonce: "12345" }),
//               email: "dona.moore@example.com",
//             }),
//             isProcessing: false,
//           })
//         })
//       })
//     })
//   })
// })
