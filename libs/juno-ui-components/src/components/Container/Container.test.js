import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Container } from "./index"

describe("Container", () => {

  test("renders children as passed", async () => {
    render(
      <Container data-testid="container">
        <button></button>
      </Container>
    )
    expect(screen.getByTestId("container")).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  test("renders a custom className", async () => {
    render(
      <Container
        data-testid="container"
        className="my-custom-classname"
      />
    )
    expect(screen.getByTestId("container")).toBeInTheDocument()
    expect(screen.getByTestId("container")).toHaveClass(
      "my-custom-classname"
    )
  })

  test("renders all props", async () => {
    render(<Container data-testid="container" data-lolol="some-prop" />)
    expect(screen.getByTestId("container")).toBeInTheDocument()
    expect(screen.getByTestId("container")).toHaveAttribute(
      "data-lolol",
      "some-prop"
    )
  })
})
