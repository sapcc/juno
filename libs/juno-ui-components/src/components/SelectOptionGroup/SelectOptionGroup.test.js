import * as React from "react"
import { render, screen} from "@testing-library/react"
import { SelectOptionGroup } from "./index"

describe("SelectOptionGroup", () => {
	
	test("renders an optgroup element", async () => {
		render(<SelectOptionGroup />)
		expect(screen.getByRole("group")).toBeInTheDocument()
	})
	
	test("renders an optgroup with a label as passed", async () => {
		render(<SelectOptionGroup label="My Select Option Group"/>)
		expect(screen.getByRole("group")).toBeInTheDocument()
		expect(screen.getByRole("group")).toHaveAttribute('label', "My Select Option Group")
	})
	
	test("renders a disabled optgroup as passed", async () => {
		render(<SelectOptionGroup disabled />)
		expect(screen.getByRole("group")).toBeInTheDocument()
		expect(screen.getByRole("group")).toHaveAttribute('disabled')
	})
	
})