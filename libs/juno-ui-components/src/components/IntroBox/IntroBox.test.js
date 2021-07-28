import * as React from "react"
import { render, screen } from "@testing-library/react"
import { IntroBox } from "./index"

describe("IntroBox", () => {
  
	  test("renders an IntroBox", async () => {
		render(<IntroBox data-testid="my-introbox" />)
		expect(screen.getByTestId("my-introbox")).toBeInTheDocument()
	  })
		
	test("renders a title as passed", async () => {
		  render(<IntroBox data-testid="my-introbox" title="My IntroBox Heading" />)
		  expect(screen.getByTestId("my-introbox")).toHaveTextContent("My IntroBox Heading")
		})
		
	test("renders a text as passed", async () => {
		  render(<IntroBox data-testid="my-introbox" text="My IntroBox text goes here." />)
		  expect(screen.getByTestId("my-introbox")).toHaveTextContent("My IntroBox text goes here.")
		})
		
	test("renders a custom class as passed", async () => {
		  render(<IntroBox data-testid="my-introbox" className="my-custom-class" />)
		  expect(screen.getByTestId("my-introbox")).toHaveClass("my-custom-class")
		})
		
	test("renders text as passed as children", async () => {
		  render(<IntroBox data-testid="my-introbox">{"My Introbox children text goes here!"}</IntroBox>)
		  expect(screen.getByTestId("my-introbox")).toHaveTextContent("My Introbox children text goes here!")
		})
		
	test("renders text as passed as children if both children and 'text' prop were passed", async () => {
		  render(<IntroBox data-testid="my-introbox" text="I should not be here.">{"My Introbox children text goes here!"}</IntroBox>)
		  expect(screen.getByTestId("my-introbox")).toHaveTextContent("My Introbox children text goes here!")
		})
		
	test("renders other props as passed", async () => {
		  render(<IntroBox data-testid="my-introbox" name="My shiny little IntroBox" />)
		  expect(screen.getByTestId("my-introbox")).toHaveAttribute('name', "My shiny little IntroBox")
		})

})
