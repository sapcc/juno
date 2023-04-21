import * as React from "react"
import { render, screen } from "@testing-library/react"
import { JsonViewer } from "./index"

describe("JsonViewer", () => {
  test("renders json data", async () => {
    await render(<JsonViewer data={{ name: "test" }} />)
    expect(document.querySelector("[data-json-viewer]")).toBeInTheDocument()
  })
})
