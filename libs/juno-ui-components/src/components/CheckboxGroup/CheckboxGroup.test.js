import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { CheckboxGroup } from "./index"
import { CheckboxRow } from "../CheckboxRow/index"

describe("CheckboxGroup", () => {
	
	test("renders a CheckboxGroup container", async () => {
		render(
			<CheckboxGroup name="my-checkboxgroup" > 
			</CheckboxGroup>
		)
		expect(document.querySelector('.checkbox-group')).toBeInTheDocument()
	})
	
	test("renders a CheckboxGroup with a label as passed", async () => {
		render(
			<CheckboxGroup name="my-checkboxgroup" label="My Group of Checkboxes"> 
			</CheckboxGroup>
		)
		expect(screen.getByRole("group")).toBeInTheDocument()
		expect(screen.getByText("My Group of Checkboxes")).toBeInTheDocument()
	})
	
	test("does not render any checkboxes if no children passed", async () => {
		render(
			<CheckboxGroup name="my-checkboxgroup"> 
			</CheckboxGroup>
		)
		expect(() => {
			screen.getByRole("checkbox");
		  }).toThrow()
	})
	
	test("renders CheckboxRows as passed", async () => {
		render(
			<CheckboxGroup> 
				<CheckboxRow />
				<CheckboxRow />
				<CheckboxRow />
			</CheckboxGroup>
		)
		expect(screen.getAllByRole("checkbox")).toHaveLength(3)
	})
	
	test("renders individually named CheckboxRows as passed", async () => {
		render(
			<CheckboxGroup name="my-checkboxgroup"> 
				<CheckboxRow />
				<CheckboxRow />
				<CheckboxRow />
			</CheckboxGroup>
		)
		expect(screen.getAllByRole("checkbox")).toHaveLength(3)
	})
	
	test("renders CheckboxRows as passed", async () => {
		render(
			<CheckboxGroup name="my-checkboxgroup"> 
				<CheckboxRow />
			</CheckboxGroup>
		)
		expect(screen.getByRole("checkbox")).toHaveAttribute("name", "my-checkboxgroup")
	})
	
	test("renders checked CheckboxRows as passed", async () => {
		render(
			<CheckboxGroup selected={["test-checkbox"]}>
				<CheckboxRow value="test-checkbox"/>
			</CheckboxGroup>
		)
		expect(screen.getByRole("checkbox")).toBeChecked()
	})
	
})