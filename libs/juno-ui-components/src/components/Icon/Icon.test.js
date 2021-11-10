import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Icon } from "./index"

describe("Icon", () => {
  
  test("renders an Icon as passed", async () => {
    render(<Icon icon="warning" />)
    expect(screen.getByRole("img")).toBeInTheDocument()
    expect(screen.getByRole("img")).toHaveAttribute("alt", "warning")
  })
  
  test("renders a custom className as passed", async () => {
    render(<Icon className="my-custom-class" />)
    expect(screen.getByRole("img")).toBeInTheDocument()
    expect(screen.getByRole("img")).toHaveClass("my-custom-class")
  })

  test("renders a default icon when none was passed", async () => {
    render(<Icon />)
    expect(screen.getByRole("img")).toBeInTheDocument()
    // note: currently the default icon is the help icon
    expect(screen.getByRole("img")).toHaveAttribute("alt", "help")
  })

  test("renders an Icon with default color", async () => {
    render(<Icon />)
    expect(screen.getByRole("img")).toBeInTheDocument()
    expect(screen.getByRole("img")).toHaveClass("text-theme-default")
  })
  
  test("renders an Icon with color as passed", async () => {
    render(<Icon color="text-juno-blue" />)
    expect(screen.getByRole("img")).toBeInTheDocument()
    expect(screen.getByRole("img")).toHaveClass("text-juno-blue")
  })
  
  test("renders an Icon with default size", async () => {
    render(<Icon />)
    expect(screen.getByRole("img")).toBeInTheDocument()
    expect(screen.getByRole("img")).toHaveAttribute("width", "24")
    expect(screen.getByRole("img")).toHaveAttribute("height", "24")
  })
  
  test("renders an Icon with size as passed", async () => {
    render(<Icon size="48" />)
    expect(screen.getByRole("img")).toBeInTheDocument()
    expect(screen.getByRole("img")).toHaveAttribute("width", "48")
    expect(screen.getByRole("img")).toHaveAttribute("height", "48")
  })
  
  test("renders all props as passed", async () => {
    render(<Icon id="icon-1" data-lolol={true}/>)
    expect(screen.getByRole("img")).toBeInTheDocument()
    expect(screen.getByRole("img")).toHaveAttribute('id', 'icon-1')
    expect(screen.getByRole("img")).toHaveAttribute('data-lolol')
  })

})