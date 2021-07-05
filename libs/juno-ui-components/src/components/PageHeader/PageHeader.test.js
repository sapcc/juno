import * as React from "react"
import { render, screen } from "@testing-library/react"
import { composeStories } from '@storybook/testing-react';

// import PageHeader stories file as a module
import * as stories from './PageHeader.stories';

const { Simple, WithHeading } = composeStories(stories);

describe("PageHeader", () => {
  
  test("renders a simple Page Header and has flexbox layout", async () => {
		render(<Simple />)
		expect(screen.getByRole("banner")).toBeInTheDocument()
		expect(screen.getByRole("banner")).toHaveClass(
      "flex"
    )
	})

  test("renders a Page Header with heading as passed", async () => {
		render(<WithHeading heading="My Test Heading" />)
		expect(screen.getByRole("banner")).toBeInTheDocument()
		expect(screen.getByRole("banner")).toHaveTextContent("My Test Heading")
	})


})
