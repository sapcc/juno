import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Tabs } from "./index"
import { Tab } from "../Tab/index"
import { TabList } from "../TabList/index"
import { TabPanel } from "../TabPanel/index"

describe("Tabs", () => {
	
	test("renders Tabs", async () => {
		render(<Tabs data-testid="tabs" />)
		expect(screen.getByTestId("tabs")).toBeInTheDocument()
		expect(screen.getByTestId("tabs")).toHaveClass("juno-tabs")
	})
	
	test("renders all children as passed", async () => {
		render(
			<Tabs data-testid="tabs">
				<TabList>
					<Tab label="Tab 1"></Tab>
				</TabList>
				<TabPanel></TabPanel>
			</Tabs>
		)
		expect(screen.getByRole("tablist")).toBeInTheDocument()
		expect(screen.getByRole("tab")).toBeInTheDocument()
		expect(screen.getByRole("tabpanel")).toBeInTheDocument()
	})
	
	test("renders a custom classNames", async () => {
		render(<Tabs data-testid="tabs" className="my-custom-class" />)
		expect(screen.getByTestId("tabs")).toBeInTheDocument()
		expect(screen.getByTestId("tabs")).toHaveClass("my-custom-class")
	})
	
	test("renders all other props", async () => {
		render(<Tabs data-testid="tabs" data-lolol="13" />)
		expect(screen.getByTestId("tabs")).toBeInTheDocument()
		expect(screen.getByTestId("tabs")).toHaveAttribute("data-lolol", '13')
	})
	
})