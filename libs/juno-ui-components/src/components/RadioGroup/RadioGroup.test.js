import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
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
		expect(document.querySelector('.juno-required')).toBeInTheDocument()
	})
	
	test("renders a disabled radiogroup as passes", async () => {
		render(
			<RadioGroup name="my-radiogroup" disabled={true} >
				<RadioRow />
			</RadioGroup>
		)
		expect(screen.getByRole("radiogroup")).toBeInTheDocument()
		expect(screen.getByRole('radio')).toBeDisabled()
	})
	
	test("renders a radiogroup with a selected option as passed to the parent", async () => {
		render(
			<RadioGroup name="my-radiogroup" selected="val2">
				<RadioRow value="val1" />
				<RadioRow value="val2" id="radio-2"/>
				<RadioRow value="val3" />
			</RadioGroup>
		)
		expect(screen.getByRole("radiogroup")).toBeInTheDocument()
		expect(document.querySelector("#radio-2")).toBeChecked()
	})
	
	test("renders a radiogroup with a checked radio as passed to a child", async () => {
		render(
			<RadioGroup name="my-radiogroup">
				<RadioRow value="v1" />
				<RadioRow value="v2" />
				<RadioRow value="v3" id="radio-3" checked />
			</RadioGroup>
		)
		expect(screen.getByRole("radiogroup")).toBeInTheDocument()
		expect(document.querySelector("#radio-3")).toBeChecked()
	})
	
	test("renders a valid RadioGroup as passed", async () => {
		render(
			<RadioGroup valid name="my-radiogroup">
				<RadioRow value="v1"/>
			</RadioGroup>
		)
		expect(screen.getByRole("radiogroup")).toBeInTheDocument()
		expect(screen.getByRole("radiogroup")).toHaveClass("juno-radiogroup-valid")
		expect(screen.getByTitle("CheckCircle")).toBeInTheDocument()
	})
	
	test("renders a valid RadioGroup when successtext is passed", async () => {
		render(
			<RadioGroup successtext="Great Success!" name="my-radiogroup">
				<RadioRow value="v1"/>
			</RadioGroup>
		)
		expect(screen.getByRole("radiogroup")).toBeInTheDocument()
		expect(screen.getByRole("radiogroup")).toHaveClass("juno-radiogroup-valid")
		expect(screen.getByTitle("CheckCircle")).toBeInTheDocument()
		expect(screen.getByText("Great Success!")).toBeInTheDocument()
	})
	
	test("renders a invalid RadioGroup as passed", async () => {
		render(
			<RadioGroup invalid name="my-radiogroup">
				<RadioRow value="v1"/>
			</RadioGroup>
		)
		expect(screen.getByRole("radiogroup")).toBeInTheDocument()
		expect(screen.getByRole("radiogroup")).toHaveClass("juno-radiogroup-invalid")
		expect(screen.getByTitle("Dangerous")).toBeInTheDocument()
	})
	
	test("renders an invalid RadioGroup when errortext is passed", async () => {
		render(
			<RadioGroup errortext="Big Error!" name="my-radiogroup">
				<RadioRow value="v1"/>
			</RadioGroup>
		)
		expect(screen.getByRole("radiogroup")).toBeInTheDocument()
		expect(screen.getByRole("radiogroup")).toHaveClass("juno-radiogroup-invalid")
		expect(screen.getByTitle("Dangerous")).toBeInTheDocument()
		expect(screen.getByText("Big Error!")).toBeInTheDocument()
	})
	
	test("renders a custom className", async () => {
		render(<RadioGroup name="my-radiogroup" className="my-classname" />)
		expect(screen.getByRole("radiogroup")).toBeInTheDocument()
		expect(screen.getByRole("radiogroup")).toHaveClass("my-classname")
	})
	
	test("renders all props", async () => {
		render(<RadioGroup name="my-radiogroup" data-lolol="some-prop" />)
		expect(screen.getByRole("radiogroup")).toBeInTheDocument()
		expect(screen.getByRole("radiogroup")).toHaveAttribute("data-lolol", 'some-prop')
	})

})