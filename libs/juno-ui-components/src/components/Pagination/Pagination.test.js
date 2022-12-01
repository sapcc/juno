import * as React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Pagination } from "./index"

describe("Pagination", () => {
  
  test("renders a Pagination", async () => {
    render(<Pagination data-testid="my-pagination" />)
    expect(screen.getByTestId("my-pagination")).toBeInTheDocument()
    expect(screen.getByTestId("my-pagination")).toHaveClass("juno-pagination")
  })
  
  test("renders a default Pagination with only two buttons by default", async () => {
    render(<Pagination data-testid="my-pagination" />)
    expect(screen.getByTestId("my-pagination")).toBeInTheDocument()
    expect(screen.getByTestId("my-pagination")).toHaveClass("juno-pagination-default")
    expect(screen.queryAllByRole("button")).toHaveLength(2)
    expect(screen.queryAllByRole("combobox")).toHaveLength(0)
    expect(screen.queryAllByRole("textbox")).toHaveLength(0)
  })
  
  test("renders a number variant Pagination as passed", async () => {
    render(<Pagination variant="number" currentPage={12} data-testid="my-pagination" />)
    expect(screen.getByTestId("my-pagination")).toBeInTheDocument()
    expect(screen.getByTestId("my-pagination")).toHaveClass("juno-pagination-number")
    expect(screen.getByTestId("my-pagination")).toHaveTextContent("12")
    expect(screen.queryAllByRole("button")).toHaveLength(2)
    expect(screen.queryAllByRole("combobox")).toHaveLength(0)
    expect(screen.queryAllByRole("textbox")).toHaveLength(0)
  })
  
  test("renders a select variant Pagination as passed", async () => {
    render(<Pagination variant="select" data-testid="my-pagination" />)
    expect(screen.getByTestId("my-pagination")).toBeInTheDocument()
    expect(screen.getByTestId("my-pagination")).toHaveClass("juno-pagination-select")
    expect(screen.queryAllByRole("button")).toHaveLength(2)
    expect(screen.queryAllByRole("combobox")).toHaveLength(1)
    expect(screen.queryAllByRole("textbox")).toHaveLength(0)
  })
  
  test("renders an input variant Pagination as passed", async () => {
    render(<Pagination variant="input" currentPage={43} data-testid="my-pagination" />)
    expect(screen.getByTestId("my-pagination")).toBeInTheDocument()
    expect(screen.getByTestId("my-pagination")).toHaveClass("juno-pagination-input")
    expect(screen.queryAllByRole("button")).toHaveLength(2)
    expect(screen.queryAllByRole("combobox")).toHaveLength(0)
    expect(screen.queryByRole("textbox")).toBeInTheDocument()
  })
  
  test("fires onPressPrevious handler as passed when Prev button is clicked", async () => {
    const handlePressPrev = jest.fn()
    render(<Pagination onPressPrevious={handlePressPrev} />)
    userEvent.click(screen.getByRole("button", {name: 'Previous Page'}))
    expect(handlePressPrev).toHaveBeenCalledTimes(1)
  })
  
  test("fires onPressNext handler as passed when Next button is clicked", async () => {
    const handlePressNext = jest.fn()
    render(<Pagination onPressNext={handlePressNext} />)
    userEvent.click(screen.getByRole("button", {name: 'Next Page'}))
    expect(handlePressNext).toHaveBeenCalledTimes(1)
  })
  
  test("fires onChange handler as passed when Select changes for select variant", async () => {
    const handleChange = jest.fn()
    const { container } = render(
      <Pagination variant="select" pages={6} onSelectChange={handleChange} />
    )
    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'a' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
  
  test("fires onKeyPress handler on Enter as passed for input variant", async () => {
    const handleKeyPress = jest.fn()
    render(<Pagination variant="input" onKeyPress={handleKeyPress} />)
    userEvent.type(screen.getByRole("textbox"), '{enter}')
    expect(handleKeyPress).toHaveBeenCalledTimes(1)
  })
  
  test("renders a custom className as passed", async () => {
    render(<Pagination className="my-class" data-testid="my-pagination"/>)
    expect(screen.getByTestId("my-pagination")).toBeInTheDocument()
    expect(screen.getByTestId("my-pagination")).toHaveClass("my-class")
  })
  
  test("renders all props as passed", async () => {
    render(<Pagination data-testid="my-pagination" data-lolol="123-456"/>)
    expect(screen.getByTestId("my-pagination")).toBeInTheDocument()
    expect(screen.getByTestId("my-pagination")).toHaveAttribute("data-lolol", "123-456")
  })


})
