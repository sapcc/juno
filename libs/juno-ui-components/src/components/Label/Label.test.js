import * as React from "react"
import { render, screen} from "@testing-library/react"
import { Label } from "./index"

describe("Label", () => {
  
  test("renders a label with a text as passed", async () => {
	 	render(<Label text="my-label"/>)
		expect(screen.getByText("my-label")).toBeInTheDocument()
  })
  
  test("renders a label for an element with an id as passed", async () => {
		render(<Label text="my-label" htmlFor="my-input" />)
		expect(screen.getByText("my-label")).toHaveAttribute('for', "my-input")
  })
  
  test("renders a custom className as passed", async () => {
     render(<Label text="my-label" className="my-custom-class" />)
    expect(screen.getByText("my-label")).toBeInTheDocument()
    expect(screen.getByText("my-label")).toHaveClass("my-custom-class")
  })
  
})
