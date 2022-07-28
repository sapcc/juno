import * as React from "react"
import { render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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
	
	test("renders a CodeBlock with a Copy button by default", async () => {
		render(<CodeBlock />)
		expect(screen.getByRole("button", {name: "contentCopy"})).toBeInTheDocument()
	})
	
	test("renders a tabbed codeblock as passed", async () => {
		const tabs = ["tab-a", "tab-b", "tab-c"]
		const contents = ["a-content", "b-content", "c-content"]
		render(<CodeBlock contents={contents} tabs={tabs} />)
		expect(screen.getByRole("tab", {name: "tab-a"})).toBeInTheDocument()
		expect(screen.getByRole("tab", {name: "tab-b"})).toBeInTheDocument()
		expect(screen.getByRole("tab", {name: "tab-c"})).toBeInTheDocument()
		expect(screen.getByRole("tab", {name: "tab-a"})).toHaveAttribute("aria-selected", "true")
		expect(screen.getByText("a-content")).toBeInTheDocument()
		userEvent.click(screen.getByRole("tab", { name: 'tab-c' }))
		expect(screen.getByRole("tab", {name: "tab-c"})).toHaveAttribute("aria-selected", "true")
		expect(screen.getByRole("tab", {name: "tab-a"})).not.toHaveAttribute("aria-selected", "true")
		expect(screen.getByText("c-content")).toBeInTheDocument()
	})
	
	
	/* Uncomment test below once https://github.com/testing-library/user-event/issues/839 is resolved: */
	// test("copies Codeblock content to the clipboard", async () => {
	// 	const user = userEvent.setup()
	// 	render(<CodeBlock>yadayada</CodeBlock>)
	// 	await user.click(screen.getByRole("button", {name: "contentCopy"}))
	// 	const clipboardText = await navigator.clipboard.readText();
	// 	expect(clipboardText).toBe("yadayada");
	// })
	
	test("renders all props as passed", async () => {
		render(<CodeBlock data-testid="my-codeblock" data-lolol="some-props"/>)
		expect(screen.getByTestId("my-codeblock")).toBeInTheDocument()
		expect(screen.getByTestId("my-codeblock")).toHaveAttribute('data-lolol', "some-props")
	})
	
})