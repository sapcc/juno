import * as React from "react"
import { render, screen } from "@testing-library/react"
import { MainContainerInner } from "./index"

describe("MainContainerInner", () => {
  
  test("renders a main container inner wrapper", async () => {
    render(<MainContainerInner data-testid="main-inner" />)
    expect(screen.getByTestId("main-inner")).toBeInTheDocument()
    expect(screen.getByTestId("main-inner")).toHaveClass("juno-main-inner")
  })
  
  test("renders children as passed", async () => {
    render(
        <MainContainerInner data-testid="main-inner">
          <button></button>
        </MainContainerInner>
      )
    expect(screen.getByTestId("main-inner")).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeInTheDocument()
  })
  
  test("renders a custom className", async () => {
    render(<MainContainerInner data-testid="main-inner" className="my-custom-classname"/>)
    expect(screen.getByTestId("main-inner")).toBeInTheDocument()
    expect(screen.getByTestId("main-inner")).toHaveClass("my-custom-classname")
  })
  
  test("renders all props", async () => {
    render(<MainContainerInner data-testid="main-inner" data-lolol="some-prop"/>)
    expect(screen.getByTestId("main-inner")).toBeInTheDocument()
    expect(screen.getByTestId("main-inner")).toHaveAttribute("data-lolol", 'some-prop')
  })

})