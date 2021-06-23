import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { SelectGroup } from "./index"


describe("TextInputGroup", () => {
	
	test("renders a select group", async () => {
		render(<SelectGroup data-testid="select-group" />)
		expect(screen.getByTestId("select-group")).toBeInTheDocument()
	})
	
	test("renders a select group with a select and an associated label with an id as passed", async () => {
		render(<SelectGroup data-testid="select-group" label="my-select" id="select-group" />)
		expect(screen.getByRole("combobox")).toBeInTheDocument()
		expect(screen.getByLabelText("my-select")).toBeInTheDocument()
		expect(screen.getByRole("combobox")).toHaveAttribute("id", 'select-group')
	})
	
	test("renders a horizontal select group as passed", async () => {
		render(<SelectGroup data-testid="select-group" layout="horizontal" />)
		expect(screen.getByTestId("select-group")).toHaveClass("selectgroup-horizontal")
	})
	
	test("renders a vertical select group as passed", async () => {
		render(<SelectGroup data-testid="select-group" layout="vertical" />)
		expect(screen.getByTestId("select-group")).toHaveClass("selectgroup-vertical")
	})
	
	test("renders a help text as passed", async () => {
		render(<SelectGroup helptext="Helptext goes here" />)
		expect(screen.getByText("Helptext goes here")).toBeInTheDocument()
	})
	
})