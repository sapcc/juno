import * as React from "react"
import { render, screen} from "@testing-library/react"
import { OverflowMenu } from "./index"

describe("OverflowMenu", () => {
	
	test("renders a ClickableIcon as a toggle for the mneu", async () => {
		render(<OverflowMenu />)
		expect(screen.getByRole("button")).toBeInTheDocument()
	})
	
	test("renders a disabled OverflowMenu as passed", async () => {
		render(<OverflowMenu disabled/>)
		expect(screen.getByRole("button")).toBeDisabled()
	})
	
})