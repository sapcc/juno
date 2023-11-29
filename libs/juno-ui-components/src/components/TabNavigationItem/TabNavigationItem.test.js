import * as React from "react"
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TabNavigationItem } from "./index"
import { TabNavigation } from "../TabNavigation/index"

const mockOnClick = jest.fn()

describe("TabNavigationItem", () => {
  
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  })
  
  test("renders a TabNavigationItem", async () => {
    render(<TabNavigationItem />)
    expect(screen.getByRole("tab")).toBeInTheDocument()
    expect(screen.getByRole("tab")).toHaveClass("juno-tabnavigation-item")
  })
  
  test("renders a label as passed", async () => {
    render(<TabNavigationItem label="Item" />)
    expect(screen.getByRole("tab")).toBeInTheDocument()
    expect(screen.getByRole("tab")).toHaveTextContent("Item")
  })
  
  test("renders a disabled tab navigation item as passed", async () => {
    render(<TabNavigationItem disabled />)
    expect(screen.getByRole("tab")).toBeInTheDocument()
    expect(screen.getByRole("tab")).toHaveAttribute("aria-disabled", "true")
  })
  
  test("executes an onClick handler as passed", async () => {
    render(
      <TabNavigation>
        <TabNavigationItem onClick={mockOnClick} />
      </TabNavigation>)
    expect(screen.getByRole("tab")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("tab"))
    expect(mockOnClick).toHaveBeenCalled()
  })
  
  test("renders a className as passed", async () => {
    render(<TabNavigationItem className="my-custom-class" />)
    expect(screen.getByRole("tab")).toBeInTheDocument()
    expect(screen.getByRole("tab")).toHaveClass("my-custom-class")
  })
  
  test("renders all props as passed", async () => {
    render(<TabNavigationItem data-lol="lol-1-2-3" />)
    expect(screen.getByRole("tab")).toBeInTheDocument()
    expect(screen.getByRole("tab")).toHaveAttribute("data-lol", "lol-1-2-3")
  })
  
})