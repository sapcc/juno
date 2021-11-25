import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Button } from "../Button/index"
import { ButtonRow } from "./index"

describe("ButtonRow", () => {
	
	
	test("renders a ButtonRow", async () => {
		render(<ButtonRow data-testid="button-row" />)
		expect(screen.getByTestId("button-row")).toBeInTheDocument()
	})
	
	test("renders children as passed", async () => {
		render(
				<ButtonRow>
					<Button label="My Button" title="My Button" />
				</ButtonRow>
			)
		expect(screen.getByRole("button")).toBeInTheDocument()
	})
	
	test("renders a custom className", async () => {
		render(<ButtonRow data-testid="my-button-row" className="my-classname" />)
		expect(screen.getByTestId("my-button-row")).toHaveClass("my-classname")
	})
	
	test("renders all props as passed", async () => {
		render(<ButtonRow data-testid="my-button-row" data-lolol="some-prop" />)
		expect(screen.getByTestId("my-button-row")).toHaveAttribute("data-lolol", 'some-prop')
	})
	
})