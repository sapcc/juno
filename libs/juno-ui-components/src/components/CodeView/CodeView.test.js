import * as React from "react"
import { render, screen } from "@testing-library/react"
import { CodeView } from "./index"

describe("CodeBlock", () => {

  test("renders a code view ", async () => {
    render(<CodeView data-testid="codeview" />)
    expect(screen.getByTestId("codeview")).toBeInTheDocument()
    expect(screen.getByTestId("codeview")).toHaveClass("juno-code-view")
  })

})