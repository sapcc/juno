import React from "react"
import { render } from "@testing-library/react"
// support shadow dom queries
// https://reactjsexample.com/an-extension-of-dom-testing-library-to-provide-hooks-into-the-shadow-dom/
import { screen } from "shadow-dom-testing-library"
import App from "./App"

import * as oauth from "oauth"
const originUseOidcAuth = oauth.useOidcAuth

jest.mock("communicator")

// mock window location
Object.defineProperty(window, "location", {
  value: {
    host: "localhost",
    port: "80",
    protocol: "http:",
    hostname: "localhost",
    href: "http://localhost?page=1&name=testing",
    origin: "http://localhost",
    pathname: null,
    search: "",
    hash: "",
    replace: jest.fn(),
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
    render(<App />)
    // do not redirect to openID provider
    expect(window.location.replace).not.toHaveBeenCalled()
    const loginTitle = await screen.queryAllByShadowText(/Converged Cloud/i)
    expect(loginTitle.length > 0).toBe(true)
  })
})
