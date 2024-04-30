import * as React from "react"
import { render, screen, waitFor, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Navigation } from "./index"
import { NavigationItem } from "../NavigationItem/index"

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

  test("renders children as passed", async () => {
    render(
      <Navigation>
        <NavigationItem>Item 1</NavigationItem>
        <NavigationItem>Item 2</NavigationItem>
        <NavigationItem>Item 3</NavigationItem>
      </Navigation>
    )
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.queryAllByRole("button")).toHaveLength(3)
    expect(screen.getByRole("button", { name: "Item 1" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 2" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 3" })).toBeInTheDocument()
  })

  test("renders an aria-label as passed", async () => {
    render(<Navigation ariaLabel="describe the navigation" />)
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.getByRole("navigation")).toHaveAttribute(
      "aria-label",
      "describe the navigation"
    )
  })

  test("renders a disabled navigation as passed", async () => {
    render(
      <Navigation disabled>
        <NavigationItem>Item 1</NavigationItem>
        <NavigationItem>Item 2</NavigationItem>
        <NavigationItem>Item 3</NavigationItem>
      </Navigation>
    )
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.getByRole("navigation")).toHaveAttribute(
      "aria-disabled",
      "true"
    )
    expect(screen.queryAllByRole("button")).toHaveLength(3)
    expect(screen.getByRole("button", { name: "Item 1" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 1" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "Item 1" })).toHaveAttribute(
      "aria-disabled",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 2" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 2" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "Item 2" })).toHaveAttribute(
      "aria-disabled",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 3" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 3" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "Item 3" })).toHaveAttribute(
      "aria-disabled",
      "true"
    )
  })

  // test setting the activeItem:

  test("renders an active item as passed to the parent by child content when only content is given", async () => {
    render(
      <Navigation activeItem="Item 2">
        <NavigationItem>Item 1</NavigationItem>
        <NavigationItem>Item 2</NavigationItem>
        <NavigationItem>Item 3</NavigationItem>
      </Navigation>
    )
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.queryAllByRole("button")).toHaveLength(3)
    expect(screen.getByRole("button", { name: "Item 1" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 1" })).not.toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 1" })).not.toHaveClass(
      "juno-navigation-item-active"
    )
    expect(screen.getByRole("button", { name: "Item 2" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 2" })).toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 2" })).toHaveClass(
      "juno-navigation-item-active"
    )

    expect(screen.getByRole("button", { name: "Item 3" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 3" })).not.toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 3" })).not.toHaveClass(
      "juno-navigation-item-active"
    )
  })

  test("renders an active item as passed to the parent by child content when content and label are given", async () => {
    render(
      <Navigation activeItem="Item 2">
        <NavigationItem label="itm-1">Item 1</NavigationItem>
        <NavigationItem label="itm-2">Item 2</NavigationItem>
        <NavigationItem label="itm-3">Item 3</NavigationItem>
      </Navigation>
    )
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.queryAllByRole("button")).toHaveLength(3)
    expect(screen.getByRole("button", { name: "Item 1" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 1" })).not.toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 1" })).not.toHaveClass(
      "juno-navigation-item-active"
    )
    expect(screen.getByRole("button", { name: "Item 2" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 2" })).toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 2" })).toHaveClass(
      "juno-navigation-item-active"
    )

    expect(screen.getByRole("button", { name: "Item 3" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 3" })).not.toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 3" })).not.toHaveClass(
      "juno-navigation-item-active"
    )
  })

  test("renders an active item as passed to the parent by child content when content, label, and value are given", async () => {
    render(
      <Navigation activeItem="Item 2">
        <NavigationItem label="itm-1" value="item-1">
          Item 1
        </NavigationItem>
        <NavigationItem label="itm-2" value="item-2">
          Item 2
        </NavigationItem>
        <NavigationItem label="itm-3" value="item-3">
          Item 3
        </NavigationItem>
      </Navigation>
    )
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.queryAllByRole("button")).toHaveLength(3)
    expect(screen.getByRole("button", { name: "Item 1" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 1" })).not.toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 1" })).not.toHaveClass(
      "juno-navigation-item-active"
    )
    expect(screen.getByRole("button", { name: "Item 2" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 2" })).toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 2" })).toHaveClass(
      "juno-navigation-item-active"
    )

    expect(screen.getByRole("button", { name: "Item 3" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 3" })).not.toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 3" })).not.toHaveClass(
      "juno-navigation-item-active"
    )
  })

  test("renders an active item as passed to the parent by child value when only value is given", async () => {
    render(
      <Navigation activeItem="item-2">
        <NavigationItem value="item-1" />
        <NavigationItem value="item-2" />
        <NavigationItem value="item-3" />
      </Navigation>
    )
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.queryAllByRole("button")).toHaveLength(3)
    expect(screen.getByRole("button", { name: "item-1" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "item-1" })).not.toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "item-1" })).not.toHaveClass(
      "juno-navigation-item-active"
    )
    expect(screen.getByRole("button", { name: "item-2" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "item-2" })).toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "item-2" })).toHaveClass(
      "juno-navigation-item-active"
    )
    expect(screen.getByRole("button", { name: "item-3" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "item-3" })).not.toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "item-3" })).not.toHaveClass(
      "juno-navigation-item-active"
    )
  })

  test("renders an active item as passed to the parent by child value when value and label are given", async () => {
    render(
      <Navigation activeItem="item-2">
        <NavigationItem value="item-1" label="Item 1" />
        <NavigationItem value="item-2" label="Item 2" />
        <NavigationItem value="item-3" label="Item 3" />
      </Navigation>
    )
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.queryAllByRole("button")).toHaveLength(3)
    expect(screen.getByRole("button", { name: "Item 1" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 1" })).not.toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 1" })).not.toHaveClass(
      "juno-navigation-item-active"
    )
    expect(screen.getByRole("button", { name: "Item 2" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 2" })).toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 2" })).toHaveClass(
      "juno-navigation-item-active"
    )
    expect(screen.getByRole("button", { name: "Item 3" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 3" })).not.toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 3" })).not.toHaveClass(
      "juno-navigation-item-active"
    )
  })

  test("renders an active item as passed to the parent by child value when value, label, and child content are given", async () => {
    render(
      <Navigation activeItem="item-2">
        <NavigationItem value="item-1" label="Item 1">
          Item 1
        </NavigationItem>
        <NavigationItem value="item-2" label="Item 2">
          Item 2
        </NavigationItem>
        <NavigationItem value="item-3" label="Item 3">
          Item 3
        </NavigationItem>
      </Navigation>
    )
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.queryAllByRole("button")).toHaveLength(3)
    expect(screen.getByRole("button", { name: "Item 1" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 1" })).not.toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 1" })).not.toHaveClass(
      "juno-navigation-item-active"
    )
    expect(screen.getByRole("button", { name: "Item 2" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 2" })).toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 2" })).toHaveClass(
      "juno-navigation-item-active"
    )
    expect(screen.getByRole("button", { name: "Item 3" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 3" })).not.toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 3" })).not.toHaveClass(
      "juno-navigation-item-active"
    )
  })

  test("renders an active item as passed to the parent by child label when only label is given", async () => {
    render(
      <Navigation activeItem="Item 2">
        <NavigationItem label="Item 1" />
        <NavigationItem label="Item 2" />
        <NavigationItem label="Item 3" />
      </Navigation>
    )
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.queryAllByRole("button")).toHaveLength(3)
    expect(screen.getByRole("button", { name: "Item 1" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 1" })).not.toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 1" })).not.toHaveClass(
      "juno-navigation-item-active"
    )
    expect(screen.getByRole("button", { name: "Item 2" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 2" })).toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 2" })).toHaveClass(
      "juno-navigation-item-active"
    )
    expect(screen.getByRole("button", { name: "Item 3" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 3" })).not.toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 3" })).not.toHaveClass(
      "juno-navigation-item-active"
    )
  })

  test("renders an active item as passed to the parent by child label when value and label are given", async () => {
    render(
      <Navigation activeItem="Item 2">
        <NavigationItem value="item-1" label="Item 1" />
        <NavigationItem value="item-2" label="Item 2" />
        <NavigationItem value="item-3" label="Item 3" />
      </Navigation>
    )
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.queryAllByRole("button")).toHaveLength(3)
    expect(screen.getByRole("button", { name: "Item 1" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 1" })).not.toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 1" })).not.toHaveClass(
      "juno-navigation-item-active"
    )
    expect(screen.getByRole("button", { name: "Item 2" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 2" })).toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 2" })).toHaveClass(
      "juno-navigation-item-active"
    )
    expect(screen.getByRole("button", { name: "Item 3" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 3" })).not.toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 3" })).not.toHaveClass(
      "juno-navigation-item-active"
    )
  })

  test("renders an active item as passed to the parent by child label when value, label, and child content are given", async () => {
    render(
      <Navigation activeItem="Item 2 Label">
        <NavigationItem value="item-1" label="Item 1 Label">
          Item 1
        </NavigationItem>
        <NavigationItem value="item-2" label="Item 2 Label">
          Item 2
        </NavigationItem>
        <NavigationItem value="item-3" label="Item 3 Label">
          Item 3
        </NavigationItem>
      </Navigation>
    )
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.queryAllByRole("button")).toHaveLength(3)
    expect(screen.getByRole("button", { name: "Item 1" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 1" })).not.toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 1" })).not.toHaveClass(
      "juno-navigation-item-active"
    )
    expect(screen.getByRole("button", { name: "Item 2" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 2" })).toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 2" })).toHaveClass(
      "juno-navigation-item-active"
    )
    expect(screen.getByRole("button", { name: "Item 3" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Item 3" })).not.toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("button", { name: "Item 3" })).not.toHaveClass(
      "juno-navigation-item-active"
    )
  })

  // test("executes an onActiveItemChange handler when the user clicks an item", async () => {
  //   render(
  //     <Navigation
  //       activeItem="Item 2"
  //       onActiveItemChange={mockOnActiveItemChange}
  //     >
  //       <NavigationItem value="item-1" label="Item 1" />
  //       <NavigationItem value="item-2" label="Item 2" />
  //       <NavigationItem value="item-3" label="Item 3" />
  //     </Navigation>
  //   )
  //   expect(screen.getByRole("navigation")).toBeInTheDocument()
  //   const itemToClick = screen.getByRole("button", { name: "Item 2" })
  //   await userEvent.click(itemToClick)
  //   expect(mockOnActiveItemChange).toHaveBeenCalled()
  // })

  test("renders custom classNames as passed", async () => {
    render(<Navigation className="my-custom-class" />)
    expect(screen.getByRole("navigation")).toHaveClass("my-custom-class")
  })

  test("renders all props as passed", async () => {
    render(<Navigation data-lol="Prop goes here" />)
    expect(screen.getByRole("navigation")).toHaveAttribute(
      "data-lol",
      "Prop goes here"
    )
  })
})
