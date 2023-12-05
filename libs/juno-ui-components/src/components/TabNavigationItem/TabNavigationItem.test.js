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
    render(<TabNavigationItem data-testid={"tab-nav-item"} />)
    expect(screen.getByTestId("tab-nav-item")).toBeInTheDocument()
    expect(screen.getByTestId("tab-nav-item")).toHaveClass("juno-tabnavigation-item")
  })
  
  test("renders a label as passed", async () => {
    render(<TabNavigationItem data-testid={"tab-nav-item"} label="Item" />)
    expect(screen.getByTestId("tab-nav-item")).toBeInTheDocument()
    expect(screen.getByTestId("tab-nav-item")).toHaveTextContent("Item")
  })
  
  test("renders a disabled tab navigation item as passed", async () => {
    render(<TabNavigationItem data-testid={"tab-nav-item"} disabled />)
    expect(screen.getByTestId("tab-nav-item")).toBeInTheDocument()
    expect(screen.getByTestId("tab-nav-item")).toHaveAttribute("aria-disabled", "true")
  })
  
  test("renders an icon as passed", async () => {
    render(<TabNavigationItem icon="warning" />)
    expect(screen.getByRole("img")).toBeInTheDocument()
    expect(screen.getByRole("img")).toHaveAttribute("alt", "warning")
  })
  
  test("executes an onClick handler as passed", async () => {
    render(
      <TabNavigation>
        <TabNavigationItem data-testid={"tab-nav-item"} onClick={mockOnClick} />
      </TabNavigation>)
    expect(screen.getByTestId("tab-nav-item")).toBeInTheDocument()
    await userEvent.click(screen.getByTestId("tab-nav-item"))
    expect(mockOnClick).toHaveBeenCalled()
  })
  
  test("renders a className as passed", async () => {
    render(<TabNavigationItem data-testid={"tab-nav-item"} className="my-custom-class" />)
    expect(screen.getByTestId("tab-nav-item")).toBeInTheDocument()
    expect(screen.getByTestId("tab-nav-item")).toHaveClass("my-custom-class")
  })
  
  test("renders all props as passed", async () => {
    render(<TabNavigationItem data-testid={"tab-nav-item"} data-lol="lol-1-2-3" />)
    expect(screen.getByTestId("tab-nav-item")).toBeInTheDocument()
    expect(screen.getByTestId("tab-nav-item")).toHaveAttribute("data-lol", "lol-1-2-3")
  })
  
})