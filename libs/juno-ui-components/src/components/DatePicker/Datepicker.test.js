import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Datepicker } from "./index"


describe("Datepicker", () => {
  
  test("renders a Datepicker", async () => {
    render(<Datepicker />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text")
    expect(screen.getByRole("textbox")).toHaveClass("juno-dateppicker-input")
  })
  
  test("renders a label as passed", async () => {
    render(<Datepicker label="The Datepicker Label" id="my-textinput"/>)
    expect(document.querySelector(".juno-label")).toBeInTheDocument()
    expect(document.querySelector(".juno-label")).toHaveTextContent("The Datepicker Label")
  })
  
  test("renders an id as passed", async () => {
    render(<Datepicker id="my-datepicker" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute('id', "my-datepicker")
  })
  
  test("renders a datepicker with an auto-generated id if no id is passed", async () => {
    render(<Datepicker />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("id")
    expect(screen.getByRole("textbox").getAttribute("id")).toMatch("juno-datepicker")
  })
  
  test("renders a datepicker with a label associated by an id as passed", async () => {
    render(<Datepicker label="The Datepicker Label" id="dp-1"/>)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("id")
    expect(screen.getByRole("textbox").getAttribute("id")).toMatch("dp-1")
    expect(screen.getByLabelText("The Datepicker Label")).toBeInTheDocument()
  })
  
  test("renders a datepicker with a label associated by an auto-generated id if no id was passed ", async () => {
    render(<Datepicker label="This is a Datepicker" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByLabelText("This is a Datepicker")).toBeInTheDocument()
  })
  
  test("renders a className as passed", async () => {
    render(<Datepicker className="my-custom-class" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveClass("my-custom-class")
  })
  
  test("renders other props as passed", async () => {
    render(<Datepicker data-lolol="527" />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute('data-lolol', "527")
  })
  
})