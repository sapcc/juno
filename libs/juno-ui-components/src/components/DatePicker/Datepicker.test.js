import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Datepicker } from "./index"


describe("Datepicker", () => {
  
  test("renders a Datepicker", async () => {
    render(<Datepicker />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text")
    expect(screen.getByRole("textbox")).toHaveClass("juno-datepicker-input")
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
  
  test("renders a disabled datepicker as passed", async () => {
    render(<Datepicker disabled />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toBeDisabled()
  })
  
  test("renders a helptext as passed", async () => {
    render(<Datepicker helptext="this is a helptext"/>)
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-help")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("this is a helptext")
  })
  
  test("renders a valid datepicker as passed", async () => {
    render(<Datepicker valid />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveClass("juno-datepicker-input-valid")
  })
  
  test("renders an invalid datepicker as passed", async () => {
    render(<Datepicker invalid />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveClass("juno-datepicker-input-invalid")
  })
  
  test("renders a successtext as passed and validates the element", async () => {
    render(<Datepicker successtext="great success!" />)
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-success")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("great success!")
    expect(screen.getByRole("textbox")).toHaveClass("juno-datepicker-input-valid")
  })
  
  test("renders an errortext as passed and invalidates the element", async () => {
    render(<Datepicker errortext="this is an error!" />)
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-error")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("this is an error!")
    expect(screen.getByRole("textbox")).toHaveClass("juno-datepicker-input-invalid")
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