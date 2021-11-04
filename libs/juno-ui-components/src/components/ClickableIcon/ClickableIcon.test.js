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
	
	test("renders a disabled ClickableIcon button", async () => {
		render(<ClickableIcon disabled />)
		expect(screen.getByRole("button")).toBeInTheDocument()
		expect(screen.getByRole("button")).toBeDisabled()
	})
	
	test("renders all props as passed", async () => {
		render(<ClickableIcon data-xyz={true}/>)
		expect(screen.getByRole("button")).toBeInTheDocument()
		expect(screen.getByRole("button")).toHaveAttribute('data-xyz')
	})
	
	test('an onclick handler is called as passed', () => {
		const handleClick = jest.fn();
		render(<ClickableIcon onClick={handleClick} />);
		screen.getByRole('button').click();
		expect(handleClick).toHaveBeenCalled();
	})
	
})