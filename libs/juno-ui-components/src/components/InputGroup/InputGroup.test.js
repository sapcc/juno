import * as React from "react"
import { render, screen } from "@testing-library/react"
import { InputGroup } from "./index"
import { Button } from "../Button/index"
import { TextInput } from "../TextInput/index"
import { Select } from "../Select/index"
import { SelectOption } from "../SelectOption/index"

describe("InputGroup", () => {
  
  test("renders an InputGroup", async () => {
    render(<InputGroup />)
    expect(document.querySelector(".juno-input-group")).toBeInTheDocument()
  })
  
  test("renders children as passed", async () => {
    render(
      <InputGroup>
        <Button label="A Button" />
        <TextInput />
        <Select>
          <SelectOption label="A Select Option" value="sel-opt-1" />
          <SelectOption label="Another Select Option" value="sel-opt-2" />
        </Select>
      </InputGroup>
    )
    expect(document.querySelector(".juno-input-group")).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toBeInTheDocument() // use listbox for radix-based select
    // TODO …
  })
  
  test("renders a className a spassed", async () => {
    render(<InputGroup className="my-class" />)
    expect(document.querySelector(".juno-input-group")).toBeInTheDocument()
    expect(document.querySelector(".juno-input-group")).toHaveClass("my-class")
  })
  
  test("renders all props as passed", async () => {
    render(<InputGroup data-test="my-prop" />)
    expect(document.querySelector(".juno-input-group")).toBeInTheDocument()
    expect(document.querySelector(".juno-input-group")).toHaveAttribute("data-test", "my-prop")
  })
  
})
  