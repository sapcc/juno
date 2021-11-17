import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Message } from "./index"

describe("Message", () => {
  
	  test("renders a Message", async () => {
		render(<Message data-testid="my-message" />)
		expect(screen.getByTestId("my-message")).toBeInTheDocument()
	  })
  
	test("renders a default Message if no variant passed", async () => {
		render(<Message data-testid="my-message" />)
		expect(screen.getByTestId("my-message")).toHaveClass("message-default")
		expect(screen.getByRole("img")).toHaveClass("default")
	})
	
	test("renders a warning Message as passed", async () => {
	  render(<Message data-testid="my-message" variant="warning" />)
	  expect(screen.getByTestId("my-message")).toHaveClass("message-warning")
	  expect(screen.getByRole("img")).toHaveClass("warning")
	 })
	
	test("renders an error Message as passed", async () => {
		render(<Message data-testid="my-message" variant="error" />)
		expect(screen.getByTestId("my-message")).toHaveClass("message-error")
		expect(screen.getByRole("img")).toHaveClass("error")
	})
	
	test("renders a success Message as passed", async () => {
		render(<Message data-testid="my-message" variant="success" />)
		expect(screen.getByTestId("my-message")).toHaveClass("message-success")
		expect(screen.getByRole("img")).toHaveClass("success")
	})
		
	test("renders a title as passed", async () => {
		render(<Message data-testid="my-message" title="My Message Heading" />)
		expect(screen.getByTestId("my-message")).toHaveTextContent("My Message Heading")
	})
		
	test("renders a text as passed", async () => {
		render(<Message data-testid="my-message" text="My Message text goes here." />)
		expect(screen.getByTestId("my-message")).toHaveTextContent("My Message text goes here.")
	})
		
	test("renders text as passed as children", async () => {
		render(<Message data-testid="my-message">{"My Message children text goes here!"}</Message>)
		expect(screen.getByTestId("my-message")).toHaveTextContent("My Message children text goes here!")
	})
		
	test("renders text as passed as children if both children and 'text' prop were passed", async () => {
		render(<Message data-testid="my-message" text="I should not be here.">{"My Message children text goes here!"}</Message>)
		expect(screen.getByTestId("my-message")).toHaveTextContent("My Message children text goes here!")
	})
		
	test("renders custom classNames as passed", async () => {
		render(<Message data-testid="my-message" className="my-custom-class" />)
		expect(screen.getByTestId("my-message")).toHaveClass("my-custom-class")
	})
		
	test("renders all props as passed", async () => {
		render(<Message data-testid="my-message" name="My shiny little Message" />)
		expect(screen.getByTestId("my-message")).toHaveAttribute('name', "My shiny little Message")
	})


})
