import * as React from "react"
import { render, screen} from "@testing-library/react"
import { OverflowMenu } from "./index"

describe("OverflowMenu", () => {
	
	test("renders a ClickableIcon as a toggle for the menu", async () => {
		render(<OverflowMenu />)
		expect(screen.getByRole("button")).toBeInTheDocument()
	})
	
	test("renders a ClickableIcon with aria-haspopup", async () => {
		render(<OverflowMenu />)
		expect(screen.getByRole("button")).toHaveAttribute("aria-haspopup")
	})
	
	test("renders a disabled OverflowMenu as passed", async () => {
		render(<OverflowMenu disabled/>)
		expect(screen.getByRole("button")).toBeDisabled()
	})
	
	test("renders a custom classname as passed", async () => {
		render(<OverflowMenu className={"my-custom-class"}/>)
		expect(screen.getByRole("button")).toHaveClass("my-custom-class")
	})
	
})