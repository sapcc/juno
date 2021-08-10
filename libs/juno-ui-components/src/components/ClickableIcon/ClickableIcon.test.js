import * as React from "react"
import { render, screen } from "@testing-library/react"
import { ClickableIcon } from "./index"

describe("ClickableIcon", () => {
		
	test("renders a clickable icon as a button", async () => {
		render(<ClickableIcon />)
		expect(screen.getByRole("button")).toBeInTheDocument()
	})
	
	test("renders a custom classname", async () => {
		render(<ClickableIcon className="my-custom-classname"/>)
		expect(screen.getByRole("button")).toBeInTheDocument()
		expect(screen.getByRole("button")).toHaveClass("my-custom-classname")
	})
	
	test('an onclick handler is called as passed', () => {
		const handleClick = jest.fn();
		render(<ClickableIcon onClick={handleClick} />);
		screen.getByRole('button').click();
		expect(handleClick).toHaveBeenCalled();
	})
	
})