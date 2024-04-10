import * as React from "react"
import { render, screen, waitFor, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Navigation } from "./index"
import { NavigationItem } from "../SideNavigationItem/index"

const mockOnActiveItemChange = jest.fn()

describe("Navigation", () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  test("renders a Navigation", async () => {
    render(<Navigation />)
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.getByRole("navigation")).toHaveClass("juno-navigation")
  })
})
