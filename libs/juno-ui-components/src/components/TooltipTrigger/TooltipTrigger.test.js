import * as React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react'

import * as stories from './TooltipTrigger.stories'

const { Default, AsChildTooltipTrigger } = composeStories(stories)

describe("Tooltip", () => {
	
	// test("renders a tooltip with a text as passed", async () => {
	// 	render(<Default text="My simple Tooltip" />)
	// 	expect(screen.getByRole("button")).toBeInTheDocument()	
	// 	userEvent.click(screen.getByRole('button'));
	// 	expect(screen.getByText("My simple Tooltip")).toBeInTheDocument()			
	// })
	
	// test("renders a Tooltip with children as passed", async () => {
	// 	render(
	// 		<AsChildTooltipTrigger>
	// 			<button>Child</button>
	// 		</AsChildTooltipTrigger>
	// 	)
	// 	expect(screen.getByRole("button")).toBeInTheDocument()
	// 	userEvent.click(screen.getByRole('button'));
	// 	expect(screen.getByRole("button", {name: "Child"})).toBeInTheDocument()
	// })
	
	// test("renders a plain tooltip popover without an icon by default", async () => {
	// 	render(<Default text="Tooltip" />)
	// 	expect(screen.getByRole("button")).toBeInTheDocument()	
	// 	userEvent.click(screen.getByRole('button'));
	// 	expect(document.querySelector("juno-tooltip-popover-icon")).not.toBeInTheDocument()
	// })
	
	// test("renders an Info Tooltip as passed", async () => {
	// 	render(<Default variant="info" />)
	// 	expect(screen.getByRole("button")).toBeInTheDocument()	
	// 	userEvent.click(screen.getByRole('button'));
	// 	expect(document.querySelector(".juno-tooltip-popover-info")).toBeInTheDocument()
	// 	expect(screen.getByTitle("Info")).toBeInTheDocument()
	// })
	
	// test("renders a Warning Tooltip as passed", async () => {
	// 	render(<Default variant="warning" />)
	// 	expect(screen.getByRole("button")).toBeInTheDocument()	
	// 	userEvent.click(screen.getByRole('button'));
	// 	expect(document.querySelector(".juno-tooltip-popover-warning")).toBeInTheDocument()
	// 	expect(screen.getByTitle("Warning")).toBeInTheDocument()
	// })
	
	// test("renders an Error Tooltip as passed", async () => {
	// 	render(<Default variant="error" />)
	// 	expect(screen.getByRole("button")).toBeInTheDocument()	
	// 	userEvent.click(screen.getByRole('button'));
	// 	expect(document.querySelector(".juno-tooltip-popover-error")).toBeInTheDocument()
	// 	expect(screen.getByTitle("Dangerous")).toBeInTheDocument()
	// })
	
	// test("renders a Danger Tooltip as passed", async () => {
	// 	render(<Default variant="danger" />)
	// 	expect(screen.getByRole("button")).toBeInTheDocument()	
	// 	userEvent.click(screen.getByRole('button'));
	// 	expect(document.querySelector(".juno-tooltip-popover-danger")).toBeInTheDocument()
	// 	expect(screen.getByTitle("Danger")).toBeInTheDocument()
	// })
	
	// test('fires onClick handler as passed', async () => {
	// 	const handleClick = jest.fn();
	// 	render(<Default onClick={handleClick} />);
	// 	expect(screen.getByRole('button')).toBeInTheDocument();
	// 	userEvent.click(screen.getByRole('button'));
	// 	await waitFor(() => {
	// 	  expect(handleClick).toHaveBeenCalledTimes(1);
	// 	});
	//   });
	
	// test("renders a tooltip trigger with a className as passed", async () => {
	// 	render(<Default className="my-custom-class" />)
	// 	expect(screen.getByRole("button")).toBeInTheDocument()
	// 	expect(screen.getByRole("button")).toHaveClass("my-custom-class")				
	// })
	
})