import * as React from "react"
import { cleanup, render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { ComboBox } from "./index"
import { ComboBoxOption } from "../ComboBoxOption/index"

describe("ComboBox", () => {
  
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })
  
  test("renders a ComboBox", async () => {
    render(<ComboBox />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute('type', "text")
    expect(screen.getByRole("combobox")).toHaveClass("juno-combobox-input")
  })
  
  test("renders a ComboBox with a label as passed", async () => {
    render(<ComboBox label="My Label"/>)
    expect(document.querySelector(".juno-label")).toBeInTheDocument()
    expect(document.querySelector(".juno-label")).toHaveTextContent("My Label")
  })
  
  test("renders a required ComboBox as passed", async () => {
    render(<ComboBox label="My Required ComboBox" required />)
    expect(document.querySelector(".juno-label")).toBeInTheDocument()
    expect(document.querySelector('.juno-required')).toBeInTheDocument()
  })
  
  test("renders a validated ComboBox as passed", async () => {
    render(<ComboBox valid />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-combobox-valid")
  })
  
  test("renders a validated ComboBox when a successtext was passed", async () => {
    render(<ComboBox successtext="Great Success!" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-combobox-valid")
  })
  
  test("renders an invalidated ComboBox as passed", async () => {
    render(<ComboBox invalid />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-combobox-invalid")
  })
  
  test("renders an invalidated ComboBox when an errortext was passed", async () => {
    render(<ComboBox errortext="Oh Snap!" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("juno-combobox-invalid")
  })
  
  test("renders a helptext as passed", async () => {
    render(<ComboBox helptext="A helptext goes here"/>)
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-help")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("A helptext goes here")
  })
  
  test("renders an errortext as passed", async () => {
    render(<ComboBox errortext="An errortext goes here"/>)
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-error")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("An errortext goes here")
  })
  
  test("renders a successtext as passed", async () => {
    render(<ComboBox successtext="A successtext goes here"/>)
    expect(document.querySelector(".juno-form-hint")).toBeInTheDocument()
    expect(document.querySelector(".juno-form-hint")).toHaveClass("juno-form-hint-success")
    expect(document.querySelector(".juno-form-hint")).toHaveTextContent("A successtext goes here")
  })
  
  test("renders a ComboBox with a custom className as passed", async () => {
    render(<ComboBox className="my-combobox" />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveClass("my-combobox")
  })
  
  
})