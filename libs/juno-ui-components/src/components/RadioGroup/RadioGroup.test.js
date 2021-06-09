import * as React from "react"
import { render, screen } from "@testing-library/react"
import { RadioGroup } from "./index"
import {Radio} from "../Radio/index"


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
	
	test("renders radios as passed", async () => {
		render(
			<RadioGroup name="my-radiogroup"> 
				<Radio />
				<Radio />
				<Radio />
			</RadioGroup>
		)
		expect(screen.getAllByRole("radio")).toHaveLength(3)
	})
	
	test("renders individually named checkboxes as passed", async () => {
		render(
			<RadioGroup name="my-radiogroup"> 
				<Radio />
			</RadioGroup>
		)
		expect(screen.getByRole("radio")).toHaveAttribute('name', "my-radiogroup")
	})
	
})