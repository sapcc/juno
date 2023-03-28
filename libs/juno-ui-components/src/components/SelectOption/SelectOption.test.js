import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Select } from "../Select/index"
import { SelectOption } from "../SelectOption/index"

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe("SelectOption", () => {
  
  // Skip for now, as ResizeObserver seems to cause errors here. Nothing to do with SelectOption but with the necessity to 1. render the option into a Select, and 2) render the Select open, otherwise SelectOptions woul not be rendered:
  test.skip("renders a SelectOptionGroup", async () => {
    window.ResizeObserver = ResizeObserver;
    render(
      <Select open>
        <SelectOption />
      </Select>
    )
    expect(screen.getByRole("option")).toBeInTheDocument()
  })
  
  test.skip("renders a value as passed", async () => {
    
  })
  
  test.skip("renders a label as passed", async () => {
    
  })
  
  test.skip("renders children instead of label if both children and label are being passed", async () => {
    
  })
  
  test.skip("renders the value as a fallback label if neither children nor label are being passed", async () => {
    
  })
  
  test.skip("renders all children as passed", async () => {
    
  })
  
  test.skip("renders a className as passed", async () => {
    
  })
  
  test.skip("renders all props as passed", async () => {
    
  })
  

  
})