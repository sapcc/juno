import React from "react"
import { render, act, waitFor } from "@testing-library/react"
// support shadow dom queries
// https://reactjsexample.com/an-extension-of-dom-testing-library-to-provide-hooks-into-the-shadow-dom/
import { screen } from "shadow-dom-testing-library"
import App from "./App"

// const bc = {
//   close: jest.fn(),
//   postMessage: jest.fn(),
// }
// globalThis.BroadcastChannel = jest.fn().mockImplementation(() => bc)

jest.mock("communicator", () => {
  return {
    broadcast: jest.fn(),
    watch: jest.fn(() => () => null),
    get: jest.fn(),
    onGet: jest.fn(),
  }
})
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

test("renders app", async () => {
  const spy = jest.spyOn(React, "useEffect")
  await act(() => render(<App />))

  expect(spy).toHaveBeenCalled()
})
