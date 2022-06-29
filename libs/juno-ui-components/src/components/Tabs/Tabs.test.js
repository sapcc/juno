import * as React from "react"
import { render, screen } from "@testing-library/react"
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
	
	test("renders Content variant Tabs by default", async () => {
		render(
			<Tabs data-testid="tabs">
				<TabList />
			</Tabs>
		)
		expect(screen.getByTestId("tabs")).toBeInTheDocument()
		expect(screen.getByTestId("tabs")).toHaveClass("juno-tabs-content")
		expect(screen.getByRole("tablist")).toBeInTheDocument()
		expect(screen.getByRole("tablist")).toHaveClass("juno-tablist-content")
	})
	
	test("renders Main variant Tabs by default", async () => {
		render(
			<Tabs data-testid="tabs" variant="main">
				<TabList />
			</Tabs>
		)
		expect(screen.getByTestId("tabs")).toBeInTheDocument()
		expect(screen.getByTestId("tabs")).toHaveClass("juno-tabs-main")
		expect(screen.getByRole("tablist")).toBeInTheDocument()
		expect(screen.getByRole("tablist")).toHaveClass("juno-tablist-main")
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
		expect(screen.getByText("Tab 1")).toBeInTheDocument()
	})

	test("renders in 'uncontrolled mode' and with first tab selected by default", async () => {
		render(
			<Tabs data-testid="tabs">
				<TabList>
					<Tab label="Tab 1" data-testid="tab-1"></Tab>
					<Tab label="Tab 2" data-testid="tab-2"></Tab>
				</TabList>
				<TabPanel>Tab 1 content</TabPanel>
				<TabPanel>Tab 2 content</TabPanel>
			</Tabs>
		)
		expect(screen.getByTestId("tab-1")).toHaveAttribute("aria-selected", "true")
		expect(screen.getByTestId("tab-2")).toHaveAttribute("aria-selected", "false")
		expect(screen.getByText("Tab 1 content")).toBeInTheDocument()
		expect(screen.queryByText("Tab 2 content")).not.toBeInTheDocument()
	})

	test("renders in 'uncontrolled mode' and with second tab selected by default as passed", async () => {
		render(
			<Tabs data-testid="tabs" defaultIndex={1}>
				<TabList>
					<Tab label="Tab 1" data-testid="tab-1"></Tab>
					<Tab label="Tab 2" data-testid="tab-2"></Tab>
				</TabList>
				<TabPanel>Tab 1 content</TabPanel>
				<TabPanel>Tab 2 content</TabPanel>
			</Tabs>
		)
		expect(screen.getByTestId("tab-1")).toHaveAttribute("aria-selected", "false")
		expect(screen.getByTestId("tab-2")).toHaveAttribute("aria-selected", "true")
		expect(screen.getByText("Tab 2 content")).toBeInTheDocument()
		expect(screen.queryByText("Tab 1 content")).not.toBeInTheDocument()
	})

	test("renders in 'controlled mode' and with second tab selected as passed", async () => {
		render(
			<Tabs data-testid="tabs" selectedIndex={1}>
				<TabList>
					<Tab label="Tab 1" data-testid="tab-1"></Tab>
					<Tab label="Tab 2" data-testid="tab-2"></Tab>
				</TabList>
				<TabPanel>Tab 1 content</TabPanel>
				<TabPanel>Tab 2 content</TabPanel>
			</Tabs>
		)
		expect(screen.getByTestId("tab-1")).toHaveAttribute("aria-selected", "false")
		expect(screen.getByTestId("tab-2")).toHaveAttribute("aria-selected", "true")
		expect(screen.getByText("Tab 2 content")).toBeInTheDocument()
		expect(screen.queryByText("Tab 1 content")).not.toBeInTheDocument()
	})

	// EVENTS

	test("renders in 'uncontrolled mode' and changes tabs when clicked", async () => {
		render(
			<Tabs data-testid="tabs">
				<TabList>
					<Tab label="Tab 1" data-testid="tab-1"></Tab>
					<Tab label="Tab 2" data-testid="tab-2"></Tab>
				</TabList>
				<TabPanel>Tab 1 content</TabPanel>
				<TabPanel>Tab 2 content</TabPanel>
			</Tabs>
		)
		expect(screen.getByTestId("tab-1")).toHaveAttribute("aria-selected", "true")
		expect(screen.getByTestId("tab-2")).toHaveAttribute("aria-selected", "false")
		expect(screen.getByText("Tab 1 content")).toBeInTheDocument()
		expect(screen.queryByText("Tab 2 content")).not.toBeInTheDocument()
		userEvent.click(screen.getByRole("tab", { name: 'Tab 2' }))
		expect(screen.getByTestId("tab-1")).toHaveAttribute("aria-selected", "false")
		expect(screen.getByTestId("tab-2")).toHaveAttribute("aria-selected", "true")
		expect(screen.getByText("Tab 2 content")).toBeInTheDocument()
		expect(screen.queryByText("Tab 1 content")).not.toBeInTheDocument()
	})
	
	test("renders in 'uncontrolled mode' and changes tabs using arrow keys", async () => {
		render(
			<Tabs data-testid="tabs">
				<TabList>
					<Tab label="Tab 1" data-testid="tab-1"></Tab>
					<Tab label="Tab 2" data-testid="tab-2"></Tab>
				</TabList>
				<TabPanel>Tab 1 content</TabPanel>
				<TabPanel>Tab 2 content</TabPanel>
			</Tabs>
		)
		expect(screen.getByTestId("tab-1")).toHaveAttribute("aria-selected", "true")
		expect(screen.getByTestId("tab-2")).toHaveAttribute("aria-selected", "false")
		expect(screen.getByText("Tab 1 content")).toBeInTheDocument()
		expect(screen.queryByText("Tab 2 content")).not.toBeInTheDocument()
		userEvent.type(screen.getByTestId("tab-1"), '{arrowright}')
		expect(screen.getByTestId("tab-1")).toHaveAttribute("aria-selected", "false")
		expect(screen.getByTestId("tab-2")).toHaveAttribute("aria-selected", "true")
		expect(screen.queryByText("Tab 1 content")).not.toBeInTheDocument()
		expect(screen.getByText("Tab 2 content")).toBeInTheDocument()
		userEvent.type(screen.getByTestId("tab-2"), '{arrowright}')
		expect(screen.getByTestId("tab-1")).toHaveAttribute("aria-selected", "true")
		expect(screen.getByTestId("tab-2")).toHaveAttribute("aria-selected", "false")
		expect(screen.getByText("Tab 1 content")).toBeInTheDocument()
		expect(screen.queryByText("Tab 2 content")).not.toBeInTheDocument()
	})

	test("on click on tab fires onSelect handler as passed", async () => {
    const handleSelect = jest.fn()
    render(
			<Tabs onSelect={handleSelect} >
				<TabList>
					<Tab label="Tab 1"></Tab>
				</TabList>
				<TabPanel>Tab 1 content</TabPanel>
			</Tabs>
		)
    userEvent.click(screen.getByRole("tab", { name: 'Tab 1' }))
		expect(handleSelect).toHaveBeenCalledTimes(1)
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