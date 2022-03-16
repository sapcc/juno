import * as React from "react"
import { render, screen} from "@testing-library/react"
import { CodeBlock } from "./index"

describe("CodeBlock", () => {
	
	test("renders a CodeBlock", async () => {
		render(<CodeBlock data-testid="my-codeblock" />)
		expect(screen.getByTestId("my-codeblock")).toBeInTheDocument()
	})
	
	test("renders a custom className", async () => {
		render(<CodeBlock data-testid="my-codeblock" className="my-custom-class" />)
		expect(screen.getByTestId("my-codeblock")).toBeInTheDocument()
		expect(screen.getByTestId("my-codeblock")).toHaveClass("my-custom-class")
	})
	
	test("renders a non-wrapping CodeBlock as passed", async () => {
		render(<CodeBlock data-testid="my-codeblock" wrap={false} />)
		expect(screen.getByTestId("juno-codeblock-pre")).toBeInTheDocument()
		expect(screen.getByTestId("juno-codeblock-pre")).toHaveClass("overflow-x-auto")
	})
	
	test("renders all props as passed", async () => {
		render(<CodeBlock data-testid="my-codeblock" data-lolol="some-props"/>)
		expect(screen.getByTestId("my-codeblock")).toBeInTheDocument()
		expect(screen.getByTestId("my-codeblock")).toHaveAttribute('data-lolol', "some-props")
	})
	
})