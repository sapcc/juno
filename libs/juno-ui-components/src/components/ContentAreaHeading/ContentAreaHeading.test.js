import * as React from "react"
import { render, screen } from "@testing-library/react"
import { ContentAreaHeading } from "./index"

describe("ContentAreaHeading", () => {
  test("renders a content area heading", async () => {
    render(<ContentAreaHeading heading="My Heading" />)
    expect(screen.getByRole("heading")).toBeInTheDocument()
    expect(screen.getByRole("heading")).toHaveClass(
      "juno-content-area-heading"
    )
  })
  
  test("renders a content area heading with the given text", async () => {
    render(<ContentAreaHeading heading="My Heading" />)
    expect(screen.getByRole("heading")).toHaveTextContent("My Heading")
  })

  test("renders children as passed", async () => {
    render(
      <ContentAreaHeading >
        <button></button>
      </ContentAreaHeading>
    )
    expect(screen.getByRole("heading")).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  test("renders a custom className", async () => {
    render(
      <ContentAreaHeading
        className="my-custom-classname"
      />
    )
    expect(screen.getByRole("heading")).toBeInTheDocument()
    expect(screen.getByRole("heading")).toHaveClass(
      "my-custom-classname"
    )
  })

  test("renders all props", async () => {
    render(
      <ContentAreaHeading
        data-lolol="some-prop"
      />
    )
    expect(screen.getByRole("heading")).toBeInTheDocument()
    expect(screen.getByRole("heading")).toHaveAttribute(
      "data-lolol",
      "some-prop"
    )
  })
})
