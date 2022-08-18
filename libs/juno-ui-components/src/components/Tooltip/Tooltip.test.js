import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react'

import * as stories from './Tooltip.stories'

const { Default } = composeStories(stories)

describe("Tooltip", () => {
	
	test("renders a tooltip with a text as passed", async () => {
		render(<Default text="My simple Tooltip" />)
		expect(screen.getByRole("button")).toBeInTheDocument()	
		userEvent.click(screen.getByRole('button'));
		expect(screen.getByText("My simple Tooltip")).toBeInTheDocument()			
	})
	
	test("renders a Tooltip with children as passed", async () => {
		render(
			<Default>
				<button>Child</button>
			</Default>
		)
		expect(screen.getByRole("button")).toBeInTheDocument()
		userEvent.click(screen.getByRole('button'));
		expect(screen.getByRole("button", {name: "Child"})).toBeInTheDocument()
	})
	
	// Skip for now: hard to test because there is alway an element[role="button"] aka the toggle in the document:
	test("renders a plain tooltip popover without an icon by default", async () => {
		render(<Default text="Tooltip" />)
		expect(screen.getByRole("button")).toBeInTheDocument()	
		userEvent.click(screen.getByRole('button'));
		expect(document.querySelector("juno-tooltip-popover-icon")).not.toBeInTheDocument()
	})
	
	test("renders an Info Tooltip as passed", async () => {
		render(<Default variant="info" />)
		expect(screen.getByRole("button")).toBeInTheDocument()	
		userEvent.click(screen.getByRole('button'));
		expect(document.querySelector(".juno-tooltip-popover-info")).toBeInTheDocument()
		expect(screen.getByTitle("Info")).toBeInTheDocument()
	})
	
	test("renders a Warning Tooltip as passed", async () => {
		render(<Default variant="warning" />)
		expect(screen.getByRole("button")).toBeInTheDocument()	
		userEvent.click(screen.getByRole('button'));
		expect(document.querySelector(".juno-tooltip-popover-warning")).toBeInTheDocument()
		expect(screen.getByTitle("Warning")).toBeInTheDocument()
	})
	
	test("renders an Error Tooltip as passed", async () => {
		render(<Default variant="error" />)
		expect(screen.getByRole("button")).toBeInTheDocument()	
		userEvent.click(screen.getByRole('button'));
		expect(document.querySelector(".juno-tooltip-popover-error")).toBeInTheDocument()
		expect(screen.getByTitle("Dangerous")).toBeInTheDocument()
	})
	
	test("renders a Danger Tooltip as passed", async () => {
		render(<Default variant="danger" />)
		expect(screen.getByRole("button")).toBeInTheDocument()	
		userEvent.click(screen.getByRole('button'));
		expect(document.querySelector(".juno-tooltip-popover-danger")).toBeInTheDocument()
		expect(screen.getByTitle("Danger")).toBeInTheDocument()
	})
	
	test("renders a tooltip with a className as passed", async () => {
		render(<Default text="My simple Tooltip" className="my-custom-class" />)
		expect(screen.getByRole("button")).toBeInTheDocument()
		expect(screen.getByRole("button")).toHaveClass("my-custom-class")				
	})
	
	test("renders a disabled tooltip as passed", async () => {
		render(<Default text="My disabled Tooltip" disabled />)
		expect(screen.getByRole("button")).toBeInTheDocument()
		expect(screen.getByRole("button")).toBeDisabled()
	})
	
})