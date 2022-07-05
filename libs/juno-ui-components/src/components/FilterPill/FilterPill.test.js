import * as React from "react"
import { render, screen} from "@testing-library/react"
import { FilterPill } from "./index"

describe("FilterPill", () => {
	
	test("renders a FilterPill", async () => {
		render(<FilterPill data-testid="my-filterpill" />)
		expect(screen.getByTestId("my-filterpill")).toBeInTheDocument()
		expect(screen.getByTestId("my-filterpill")).toHaveClass("juno-filterpill")
	})
	
	test("renders a key label as passed", async () => {
		render(<FilterPill keyLabel="My FilterPill Key" />)
		expect(screen.getByText("My FilterPill Key")).toBeInTheDocument()
	})
	
	test("renders a value label as passed", async () => {
		render(<FilterPill valueLabel="My FilterPill Value" />)
		expect(screen.getByText("My FilterPill Value")).toBeInTheDocument()
	})
	
	test("renders a custom className", async () => {
		render(<FilterPill data-testid="my-filterpill" className="my-custom-class" />)
		expect(screen.getByTestId("my-filterpill")).toBeInTheDocument()
		expect(screen.getByTestId("my-filterpill")).toHaveClass("my-custom-class")
	})
	
	test("renders all props as passed", async () => {
		render(<FilterPill data-testid="23" data-lolol={true}/>)
		expect(screen.getByTestId("23")).toBeInTheDocument()
		expect(screen.getByTestId("23")).toHaveAttribute('data-lolol')
	})
	
})