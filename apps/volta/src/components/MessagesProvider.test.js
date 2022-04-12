import * as React from "react"
// import { render, screen, waitFor } from "@testing-library/react"
// import userEvent from "@testing-library/user-event"
// import { Message } from "./index"
import { newMessage } from "./MessagesProvider"

describe("Messages", () => {
  describe("Message", () => {
    test("default attributes", async () => {
      const nm = newMessage()
      expect(nm.text).toEqual("")
      expect(nm.variant).toEqual("info")
      expect(nm.id.includes("message-")).toBeTruthy()
      expect(nm.id.length > "message-".length).toBeTruthy()
    })
    test("assign attributes", async () => {
      const nm = newMessage({ text: "test123", variant: "error" })
      expect(nm.text).toEqual("test123")
      expect(nm.variant).toEqual("error")
      expect(nm.id.includes("message-")).toBeTruthy()
      expect(nm.id.length > "message-".length).toBeTruthy()
    })
    test("assign text node", async () => {
      const textNode = <span>Successfully create SSO cert</span>
      const nm = newMessage({
        text: textNode,
        variant: "error",
      })
      expect(nm.text).toEqual(textNode)
      expect(nm.variant).toEqual("error")
      expect(nm.id.includes("message-")).toBeTruthy()
      expect(nm.id.length > "message-".length).toBeTruthy()
    })
  })
})
