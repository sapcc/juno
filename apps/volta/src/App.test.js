import React from "react"
import { render } from "@testing-library/react"
// support shadow dom queries
// https://reactjsexample.com/an-extension-of-dom-testing-library-to-provide-hooks-into-the-shadow-dom/
import { screen } from "shadow-dom-testing-library"
import App from "./App"

import * as oauth from "oauth"
const originUseOidcAuth = oauth.useOidcAuth

// mock window location
Object.defineProperty(window, "location", {
  value: {
    host: "localhost",
    port: "80",
    protocol: "http:",
    hostname: "localhost",
    href: "http://localhost/?page=1&name=testing",
    origin: "http://localhost/",
    pathname: "",
    search: "",
    hash: "",
    replace: jest.fn(),
    assign: jest.fn(),
  },
})

describe("logged in", () => {
  beforeEach(() => {
    oauth.useOidcAuth = jest.fn(() => ({
      auth: null,
      login: jest.fn(),
      logout: jest.fn(),
      loggedIn: true,
      isProcessing: false,
    }))
  })

  test("renders app", async () => {
    const { debug } = render(<App />)
    // debug()
    // do not redirect to openID provider
    expect(window.location.replace).not.toHaveBeenCalled()
    const text = await screen.queryAllByShadowText(/Converged Cloud/i)
    expect(text.length > 0).toBe(true)
  })
})

describe("not logged in", () => {
  beforeEach(() => (oauth.useOidcAuth = originUseOidcAuth))

  test("should redirect to oidc provider", () => {
    render(<App issuerurl={"https://sap.com"} clientid={"000000"} />)
    // redirect to openID provider
    expect(window.location.replace).toHaveBeenCalled()
  })
})
