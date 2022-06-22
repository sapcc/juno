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
	
	test("renders a wrapping CodeBlock by default", async () => {
		render(<CodeBlock data-testid="my-codeblock" />)
		expect(screen.getByTestId("juno-codeblock-pre")).toBeInTheDocument()
		expect(screen.getByTestId("juno-codeblock-pre")).toHaveClass("jn-whitespace-pre-wrap")
	})

	test("renders a non-wrapping CodeBlock as passed", async () => {
		render(<CodeBlock data-testid="my-codeblock" wrap={false} />)
		expect(screen.getByTestId("juno-codeblock-pre")).toBeInTheDocument()
		expect(screen.getByTestId("juno-codeblock-pre")).toHaveClass("jn-overflow-x-auto")
	})

	test("renders a CodeBlock without height restriction by default", async () => {
		render(<CodeBlock data-testid="my-codeblock" />)
		expect(screen.getByTestId("juno-codeblock-pre")).toBeInTheDocument()
		expect(screen.getByTestId("juno-codeblock-pre")).not.toHaveAttribute('class', expect.stringContaining('jn-max-h-'))
	})

	test("renders a CodeBlock without height restriction if size auto is passed", async () => {
		render(<CodeBlock data-testid="my-codeblock" size="auto" />)
		expect(screen.getByTestId("juno-codeblock-pre")).toBeInTheDocument()
		expect(screen.getByTestId("juno-codeblock-pre")).not.toHaveAttribute('class', expect.stringContaining('jn-max-h-'))
	})

	test("renders a CodeBlock with height restriction and overflow-y if size other than auto is passed", async () => {
		render(<CodeBlock data-testid="my-codeblock" size="small" />)
		expect(screen.getByTestId("juno-codeblock-pre")).toBeInTheDocument()
		expect(screen.getByTestId("juno-codeblock-pre")).toHaveAttribute('class', expect.stringContaining('jn-max-h-'))
		expect(screen.getByTestId("juno-codeblock-pre")).toHaveClass("jn-overflow-y-auto")
	})
	
	test("renders all props as passed", async () => {
		render(<CodeBlock data-testid="my-codeblock" data-lolol="some-props"/>)
		expect(screen.getByTestId("my-codeblock")).toBeInTheDocument()
		expect(screen.getByTestId("my-codeblock")).toHaveAttribute('data-lolol', "some-props")
	})
	
})