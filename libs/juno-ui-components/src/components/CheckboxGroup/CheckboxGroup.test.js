import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { CheckboxGroup } from "./index"
import { Checkbox } from "../Checkbox/index"
import { CheckboxRow } from "../CheckboxRow/index"

describe("CheckboxGroup", () => {
	
	test("renders a CheckboxGroup container", async () => {
		render(
			<CheckboxGroup name="my-checkboxgroup" data-testid="checkbox-group"> 
			</CheckboxGroup>
		)
		expect(screen.getByTestId("checkbox-group")).toBeInTheDocument()
	})
	
	test("renders a CheckboxGroup with a label as passed", async () => {
		render(
			<CheckboxGroup name="my-checkboxgroup" label="My Group of Checkboxes"> 
			</CheckboxGroup>
		)
		expect(screen.getByRole("group")).toBeInTheDocument()
		expect(screen.getByText("My Group of Checkboxes")).toBeInTheDocument()
	})
	
	test("renders a required label as passed", async () => {
		render(
			<CheckboxGroup name="my-checkboxgroup" label="my-labeled-checkboxgroup" required >
			</CheckboxGroup>
		)
		expect(screen.getByRole("group")).toBeInTheDocument()
		expect(document.querySelector('.juno-required')).toBeInTheDocument()
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
	
	test("renders a valid CheckboxGroup as passed", async () => {
		render(
			<CheckboxGroup valid>
				<CheckboxRow value="test-checkbox"/>
			</CheckboxGroup>
		)
		expect(screen.getByRole("group")).toBeInTheDocument()
		expect(screen.getByRole("group")).toHaveClass("juno-checkbox-group-valid")
		expect(screen.getByTitle("CheckCircle")).toBeInTheDocument()
	})
	
	test("renders a valid CheckboxGroup when successtext is passed", async () => {
		render(
			<CheckboxGroup successtext="Great Success!">
				<CheckboxRow value="test-checkbox"/>
			</CheckboxGroup>
		)
		expect(screen.getByRole("group")).toBeInTheDocument()
		expect(screen.getByRole("group")).toHaveClass("juno-checkbox-group-valid")
		expect(screen.getByTitle("CheckCircle")).toBeInTheDocument()
		expect(screen.getByText("Great Success!")).toBeInTheDocument()
	})
	
	test("renders an invalid CheckboxGroup as passed", async () => {
		render(
			<CheckboxGroup invalid>
				<CheckboxRow value="test-checkbox"/>
			</CheckboxGroup>
		)
		expect(screen.getByRole("group")).toBeInTheDocument()
		expect(screen.getByRole("group")).toHaveClass("juno-checkbox-group-invalid")
		expect(screen.getByTitle("Dangerous")).toBeInTheDocument()
	})
	
	test("renders an invalid CheckboxGroup when errortext is passed", async () => {
		render(
			<CheckboxGroup errortext="Big Error!">
				<CheckboxRow value="test-checkbox"/>
			</CheckboxGroup>
		)
		expect(screen.getByRole("group")).toBeInTheDocument()
		expect(screen.getByRole("group")).toHaveClass("juno-checkbox-group-invalid")
		expect(screen.getByTitle("Dangerous")).toBeInTheDocument()
		expect(screen.getByText("Big Error!")).toBeInTheDocument()
	})
	
	test("renders a custom className", async () => {
		render(
			<CheckboxGroup name="my-checkboxgroup" className="my-custom-classname"> 
				<CheckboxRow value="test-checkbox"/>
			</CheckboxGroup>
		)
		expect(screen.getByRole("group")).toBeInTheDocument()
		expect(screen.getByRole("group")).toHaveClass("my-custom-classname")
	})
	
	test("renders all props", async () => {
		render(
			<CheckboxGroup name="my-checkboxgroup" data-lolol="some-prop"> 
				<CheckboxRow value="test-checkbox"/>
			</CheckboxGroup>
		)
		expect(screen.getByRole("group")).toBeInTheDocument()
		expect(screen.getByRole("group")).toHaveAttribute("data-lolol", 'some-prop')
	})
	
})