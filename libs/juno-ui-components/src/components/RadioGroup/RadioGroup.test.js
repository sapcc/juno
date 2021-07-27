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
	
	test("applies a custom class to individual radios as passed", async () => {
		render(
			<RadioGroup name="my-radiogroup" className="my-custom-class" > 
				<RadioRow />
			</RadioGroup>
		)
		expect(screen.getByRole("radio")).toHaveClass("my-custom-class")
	})
	
})