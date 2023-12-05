import * as React from "react"
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TabNavigation } from "./index"
import { TabNavigationItem } from "../TabNavigationItem/index"

const mockOnTabChange = jest.fn()

describe("TabNavigation", () => {
  
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  })
  
  test("renders a TabNavigation", async () => {
    render(<TabNavigation />)
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.getByRole("navigation")).toHaveClass("juno-tabnavigation")
  })
  
  test("renders children as passed", async () => {
    render(
      <TabNavigation>
        <TabNavigationItem label="Item 1" />
        <TabNavigationItem label="Item 2" />
        <TabNavigationItem label="Item 3" />
      </TabNavigation>)
      expect(screen.getByRole("navigation")).toBeInTheDocument()
      expect(screen.queryAllByRole("button")).toHaveLength(3)
      expect(screen.getByRole("button", {name: "Item 1"})).toBeInTheDocument()
      expect(screen.getByRole("button", {name: "Item 2"})).toBeInTheDocument()
      expect(screen.getByRole("button", {name: "Item 3"})).toBeInTheDocument()
  })
  
  test("renders disabled children as passed", async () => {
    render(
      <TabNavigation disabled>
        <TabNavigationItem label="Item 1" />
        <TabNavigationItem label="Item 2" />
      </TabNavigation>)
      expect(screen.getByRole("navigation")).toBeInTheDocument()
      expect(screen.queryAllByRole("button")).toHaveLength(2)
      expect(screen.getByRole("button", {name: "Item 1"})).toBeInTheDocument()
      expect(screen.getByRole("button", {name: "Item 1"})).toHaveAttribute("aria-disabled", "true")
      expect(screen.getByRole("button", {name: "Item 2"})).toBeInTheDocument()
      expect(screen.getByRole("button", {name: "Item 2"})).toHaveAttribute("aria-disabled", "true")
  })
  
  test("renders an active tab as passed", async () => {
    render(<TabNavigation activeTab="Item 2">
      <TabNavigationItem label="Item 1" />
      <TabNavigationItem label="Item 2" />
    </TabNavigation>)
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.queryAllByRole("button")).toHaveLength(2)
    expect(screen.getByRole("button", {name: "Item 1"})).toBeInTheDocument()
    expect(screen.getByRole("button", {name: "Item 1"})).toHaveAttribute("aria-selected", "false")
    expect(screen.getByRole("button", {name: "Item 2"})).toBeInTheDocument()
    expect(screen.getByRole("button", {name: "Item 2"})).toHaveAttribute("aria-selected", "true")
  })
  
  test("renders the active tab as passed to the parent if conflicting with active prop passed to child item", async () => {
    render(<TabNavigation activeTab="Item 2">
      <TabNavigationItem label="Item 1" active/>
      <TabNavigationItem label="Item 2" />
    </TabNavigation>)
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.queryAllByRole("button")).toHaveLength(2)
    expect(screen.getByRole("button", {name: "Item 1"})).toBeInTheDocument()
    expect(screen.getByRole("button", {name: "Item 1"})).toHaveAttribute("aria-selected", "false")
    expect(screen.getByRole("button", {name: "Item 2"})).toBeInTheDocument()
    expect(screen.getByRole("button", {name: "Item 2"})).toHaveAttribute("aria-selected", "true")
  })
  
  test("changes the active tab when the user clicks", async () => {
    render(<TabNavigation activeTab="Item 1">
      <TabNavigationItem label="Item 1" />
      <TabNavigationItem label="Item 2" />
    </TabNavigation>)
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.queryAllByRole("button")).toHaveLength(2)
    const tab1 = screen.getByRole("button", {name: "Item 1"})
    const tab2 = screen.getByRole("button", {name: "Item 2"})
    expect(tab1).toHaveAttribute("aria-selected", "true")
    expect(tab2).toHaveAttribute("aria-selected", "false")
    await userEvent.click(tab2)
    expect(tab1).toHaveAttribute("aria-selected", "false")
    expect(tab2).toHaveAttribute("aria-selected", "true")
  })
  
  test("executes a handler as passed when the selected tab changes", async () => {
    render(<TabNavigation activeTab="Item 1" onTabChange={mockOnTabChange}>
      <TabNavigationItem label="Item 1" />
      <TabNavigationItem label="Item 2" />
    </TabNavigation>)
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.queryAllByRole("button")).toHaveLength(2)
    const tab2 = screen.getByRole("button", {name: "Item 2"})
    await userEvent.click(tab2)
    expect(mockOnTabChange).toHaveBeenCalled()
  })


  test("renders a custom classNames", async () => {
    render(<TabNavigation className="my-custom-class" />)
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.getByRole("navigation")).toHaveClass("my-custom-class")
  })

  test("renders all other props", async () => {
    render(<TabNavigation data-lolol="13" />)
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.getByRole("navigation")).toHaveAttribute("data-lolol", "13")
  })
})
