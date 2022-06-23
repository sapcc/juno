import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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
	
	test("renders first Tab and associated TabPanel selected per default", async () => {
		render(
			<Tabs data-testid="tabs">
				<TabList>
					<Tab label="Tab 1" data-testid="tab-1"></Tab>
					<Tab label="Tab 2" data-testid="tab-2"></Tab>
					<Tab label="Tab 3" data-testid="tab-3"></Tab>
				</TabList>
				<TabPanel data-testid="panel-1"></TabPanel>
				<TabPanel data-testid="panel-2"></TabPanel>
				<TabPanel data-testid="panel-3"></TabPanel>
			</Tabs>
		)
		expect(screen.getByTestId("tab-1")).toHaveAttribute("aria-selected", "true")
		expect(screen.getByTestId("panel-1")).toHaveClass("juno-tabpanel-selected")
		expect(screen.getByTestId("tab-2")).toHaveAttribute("aria-selected", "false")
		expect(screen.getByTestId("panel-2")).not.toHaveClass("juno-tabpanel-selected")
		expect(screen.getByTestId("tab-3")).toHaveAttribute("aria-selected", "false")
		expect(screen.getByTestId("panel-3")).not.toHaveClass("juno-tabpanel-selected")
	})
	
	test("renders a selected Tab and associated TabPanel as passed in uncontrolled mode", async () => {
		render(
			<Tabs defaultIndex={1}>
				<TabList>
					<Tab label="Tab 1" data-testid="tab-1"></Tab>
					<Tab label="Tab 2" data-testid="tab-2"></Tab>
					<Tab label="Tab 3" data-testid="tab-3"></Tab>
				</TabList>
				<TabPanel data-testid="panel-1"></TabPanel>
				<TabPanel data-testid="panel-2"></TabPanel>
				<TabPanel data-testid="panel-3"></TabPanel>
			</Tabs>
		)
		expect(screen.getByTestId("tab-1")).toHaveAttribute("aria-selected", "false")
		expect(screen.getByTestId("panel-1")).not.toHaveClass("juno-tabpanel-selected")
		expect(screen.getByTestId("tab-2")).toHaveAttribute("aria-selected", "true")
		expect(screen.getByTestId("panel-2")).toHaveClass("juno-tabpanel-selected")
		expect(screen.getByTestId("tab-3")).toHaveAttribute("aria-selected", "false")
		expect(screen.getByTestId("panel-3")).not.toHaveClass("juno-tabpanel-selected")
	})
	
	test("selects a tab when user clicks", async () => {
		render(
			<Tabs>
				<TabList>
					<Tab label="Tab 1" data-testid="tab-1"></Tab>
					<Tab label="Tab 2" data-testid="tab-2"></Tab>
					<Tab label="Tab 3" data-testid="tab-3"></Tab>
				</TabList>
				<TabPanel data-testid="panel-1"></TabPanel>
				<TabPanel data-testid="panel-2"></TabPanel>
				<TabPanel data-testid="panel-3"></TabPanel>
			</Tabs>
		)
		expect(screen.getByTestId("tab-1")).toHaveAttribute("aria-selected", "true")
		expect(screen.getByTestId("tab-2")).toHaveAttribute("aria-selected", "false")
		expect(screen.getByTestId("tab-3")).toHaveAttribute("aria-selected", "false")
		expect(screen.getByTestId("panel-1")).toHaveClass("juno-tabpanel-selected")
		expect(screen.getByTestId("panel-2")).not.toHaveClass("juno-tabpanel-selected")
		expect(screen.getByTestId("panel-3")).not.toHaveClass("juno-tabpanel-selected")
		userEvent.click(screen.getByTestId("tab-2"))
		expect(screen.getByTestId("tab-1")).toHaveAttribute("aria-selected", "false")
		expect(screen.getByTestId("tab-2")).toHaveAttribute("aria-selected", "true")
		expect(screen.getByTestId("tab-3")).toHaveAttribute("aria-selected", "false")
		expect(screen.getByTestId("panel-1")).not.toHaveClass("juno-tabpanel-selected")
		expect(screen.getByTestId("panel-2")).toHaveClass("juno-tabpanel-selected")
		expect(screen.getByTestId("panel-3")).not.toHaveClass("juno-tabpanel-selected")
		userEvent.click(screen.getByTestId("tab-3"))
		expect(screen.getByTestId("tab-1")).toHaveAttribute("aria-selected", "false")
		expect(screen.getByTestId("tab-2")).toHaveAttribute("aria-selected", "false")
		expect(screen.getByTestId("tab-3")).toHaveAttribute("aria-selected", "true")
		expect(screen.getByTestId("panel-1")).not.toHaveClass("juno-tabpanel-selected")
		expect(screen.getByTestId("panel-2")).not.toHaveClass("juno-tabpanel-selected")
		expect(screen.getByTestId("panel-3")).toHaveClass("juno-tabpanel-selected")
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