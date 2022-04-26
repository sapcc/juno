import * as React from "react"
import { render, screen } from "@testing-library/react"
import { PageFooter } from "./index"

describe("PageFooter", () => {
  test("renders a simple Page Footer and has flexbox layout", async () => {
    render(<PageFooter />)
    expect(screen.getByRole("contentinfo")).toBeInTheDocument()
    expect(screen.getByRole("contentinfo")).toHaveClass("flex")
  })

  test("renders a Page Footer to have the global bg color", async () => {
    render(<PageFooter />)
    expect(screen.getByRole("contentinfo")).toBeInTheDocument()
    expect(screen.getByRole("contentinfo")).toHaveClass("bg-theme-global-bg")
  })

  test("renders children as passed", async () => {
    render(
      <PageFooter>
        <button></button>
      </PageFooter>
    )
    expect(screen.getByRole("contentinfo")).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  test("renders a custom className", async () => {
    render(<PageFooter className="my-custom-classname" />)
    expect(screen.getByRole("contentinfo")).toBeInTheDocument()
    expect(screen.getByRole("contentinfo")).toHaveClass("my-custom-classname")
  })

  test("renders all props", async () => {
    render(<PageFooter data-lolol="some-prop" />)
    expect(screen.getByRole("contentinfo")).toBeInTheDocument()
    expect(screen.getByRole("contentinfo")).toHaveAttribute(
      "data-lolol",
      "some-prop"
    )
  })
})
