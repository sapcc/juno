import * as React from "react"
import { render, screen } from "@testing-library/react"
import { CodeView } from "./index"

describe("CodeBlock", () => {

  test("renders a code view ", async () => {
    render(<CodeView data-testid="codeview" />)
    expect(screen.getByTestId("codeview")).toBeInTheDocument()
    expect(screen.getByTestId("codeview")).toHaveClass("juno-code-view")
  })
  
  test("renders a code view with content as passed", async () => {
    render(<CodeView data-testid="codeview" content="<simsalabim>"/>)
    expect(screen.getByTestId("codeview")).toBeInTheDocument()
    expect(screen.getByTestId("codeview")).toHaveClass("juno-code-view")
    expect(screen.getByTestId("codeview")).toHaveTextContent("<simsalabim>")
  })
  
  test("renders a CodeView with children as passed", async () => {
    render(<CodeView data-testid="codeview">
      {"some children here"}
    </CodeView>)
    expect(screen.getByTestId("codeview")).toBeInTheDocument()
    expect(screen.getByTestId("codeview")).toHaveClass("juno-code-view")
    expect(screen.getByTestId("codeview")).toHaveTextContent("some children here")
  })


})