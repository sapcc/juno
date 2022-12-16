import * as React from "react"
import { render, screen } from "@testing-library/react"
import { CodeBlock } from "./index"

describe("CodeBlock", () => {

  test("renders a CodeBlock with content as passed", async () => {
    render(<CodeBlock data-testid="codeblock" content="some example code"/>)
    expect(screen.getByTestId("codeblock")).toBeInTheDocument()
    expect(screen.getByTestId("codeblock")).toHaveClass("juno-code-block")
    expect(screen.getByTestId("codeblock")).toHaveTextContent("some example code")
  })
  
  test("renders a CodeBlock with children as passed", async () => {
    render(<CodeBlock data-testid="codeblock">
      {"some children here"}
    </CodeBlock>)
    expect(screen.getByTestId("codeblock")).toBeInTheDocument()
    expect(screen.getByTestId("codeblock")).toHaveClass("juno-code-block")
    expect(screen.getByTestId("codeblock")).toHaveTextContent("some children here")
  })
  
  test("renders a CodeBlock with a lang attribute as passed", async () => {
    render(<CodeBlock data-testid="codeblock" lang="javascript" />)
    expect(screen.getByTestId("codeblock")).toBeInTheDocument()
    expect(screen.getByTestId("codeblock")).toHaveClass("juno-code-block")
    expect(screen.getByTestId("codeblock")).toHaveAttribute("data-lang", "javascript")
  })
  
  test("renders a wrapping CodeBlock by default", async () => {
    render(<CodeBlock data-testid="codeblock" />)
    expect(screen.getByTestId("codeblock")).toBeInTheDocument()
    expect(screen.getByTestId("codeblock")).toHaveClass("juno-code-block")
    expect(document.querySelector("pre")).toHaveClass("jn-break-words")
    expect(document.querySelector("pre")).toHaveClass("jn-break-all")
    expect(document.querySelector("pre")).toHaveClass("jn-whitespace-pre-wrap")
    expect(document.querySelector("pre")).not.toHaveClass("jn-overflow-x-auto")
  })
  
  test("renders a non-wrapping CodeBlock as passed", async () => {
    render(<CodeBlock data-testid="codeblock" wrap={false} />)
    expect(screen.getByTestId("codeblock")).toBeInTheDocument()
    expect(screen.getByTestId("codeblock")).toHaveClass("juno-code-block")
    expect(document.querySelector("pre")).not.toHaveClass("jn-break-words")
    expect(document.querySelector("pre")).not.toHaveClass("jn-break-all")
    expect(document.querySelector("pre")).not.toHaveClass("jn-whitespace-pre-wrap")
    expect(document.querySelector("pre")).toHaveClass("jn-overflow-x-auto")
  })
  
  test("renders a JSONView as passed", async () => {
    const tJson = {
      "someKey": "some value"
    }
    render(<CodeBlock data-testid="codeblock" lang="json" content={tJson} />)
    expect(screen.getByTestId("codeblock")).toBeInTheDocument()
    expect(screen.getByTestId("codeblock")).toHaveClass("juno-code-block")
    expect(screen.getByTestId("codeblock")).toHaveAttribute("data-lang", "json")
  })
  
  test("renders a CodeBlock with className as passed", async () => {
    render(<CodeBlock data-testid="codeblock" className="my-class" />)
    expect(screen.getByTestId("codeblock")).toBeInTheDocument()
    expect(screen.getByTestId("codeblock")).toHaveClass("my-class")
  })
  
  test("renders a CodeBlock with all props as passed", async () => {
    render(<CodeBlock data-testid="codeblock" data-lolol="code-lang-js" />)
    expect(screen.getByTestId("codeblock")).toBeInTheDocument()
    expect(screen.getByTestId("codeblock")).toHaveAttribute("data-lolol", "code-lang-js")
  })

})