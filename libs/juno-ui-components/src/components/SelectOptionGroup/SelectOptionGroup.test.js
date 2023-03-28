import * as React from "react"
import { render, screen } from "@testing-library/react"
import { SelectOptionGroup } from "./index"
import { SelectOption } from "../SelectOption/index"


describe("SelectOptionGroup", () => {
  
  test("renders a SelectOptionGroup", async () => {
    render(<SelectOptionGroup data-testid="select-option-group" />)
    expect(screen.getByTestId("select-option-group")).toBeInTheDocument()
  })
})