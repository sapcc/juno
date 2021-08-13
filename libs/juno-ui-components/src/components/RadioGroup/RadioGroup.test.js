import * as React from "react"
import { render, screen } from "@testing-library/react"
import { RadioGroup } from "./index"
import {RadioRow} from "../RadioRow/index"


describe("RadioGroup", () => {
	
	test("does not render any radios if no children passed", async () => {
		render(
			<RadioGroup name="my-radiogroup"> 
			</RadioGroup>
		)
		expect(() => {
			screen.getByRole("radio");
		  }).toThrow()
	})
	
	test("renders radio rows as passed", async () => {
		render(
			<RadioGroup name="my-radiogroup"> 
				<RadioRow />
				<RadioRow />
				<RadioRow />
			</RadioGroup>
		)
		expect(screen.getAllByRole("radio")).toHaveLength(3)
	})
	
	test("renders individually named radios as passed", async () => {
		render(
			<RadioGroup name="my-radiogroup"> 
				<RadioRow />
			</RadioGroup>
		)
		expect(screen.getByRole("radio")).toHaveAttribute('name', "my-radiogroup")
	})
	
    test("renders a label for the group as passed", async () => {
		render(
			<RadioGroup name="my-radiogroup" label="My labeled RadioGroup" >
				<RadioRow />
			</RadioGroup>
		)
		expect(screen.getByText("My labeled RadioGroup")).toBeInTheDocument()
	})
	
	test("renders a required label as passed", async () => {
		render(
			<RadioGroup name="my-radiogroup" label="my-labeled-radiogroup" required >
				<RadioRow />
			</RadioGroup>
		)
		expect(screen.getByRole("radiogroup")).toBeInTheDocument()
		expect(document.querySelector('.required')).toBeInTheDocument()
	})
	
	test("renders a desiabled radiogroup as passes", async () => {
		render(
			<RadioGroup name="my-radiogroup" disabled >
				<RadioRow />
			</RadioGroup>
		)
		expect(screen.getByRole("radiogroup")).toBeInTheDocument()
		expect(screen.getByRole('radio')).toBeDisabled()
	})
	
})