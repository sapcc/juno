import * as React from "react"
import { render, screen } from "@testing-library/react"
import { composeStories } from '@storybook/testing-react'

import * as stories from './Tooltip.stories'

const { Default } = composeStories(stories)

describe("Tooltip", () => {
	
	test("renders a tooltip with a text as passed", async () => {
		render(<Default text="My simple Tooltip" />)
		expect(screen.getByRole("button")).toBeInTheDocument()		
	})
	
	test("renders a tooltip with a className as passed", async () => {
		render(<Default text="My simple Tooltip" className="my-custom-class" />)
		expect(screen.getByRole("button")).toBeInTheDocument()
		expect(screen.getByRole("button")).toHaveClass("my-custom-class")				
	})
	
})