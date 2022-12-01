import * as React from "react"
import { render, screen, waitFor } from "@testing-library/react"
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
