import React from "react"
import { Tabs } from "../Tabs/index.js"
import PropTypes from "prop-types"

export const MainTabs = ({
	children,
	defaultIndex,
	selectedIndex,
	onSelect,
	className,
	...props
}) => {
	return (
		<Tabs 
			defaultIndex={defaultIndex}
			selectedIndex={selectedIndex}
			onSelect={onSelect}
			className={className}
			variant="main">
				{ children }
		</Tabs>
	)
}

MainTabs.propTypes = {
	/** All the child elements of MainTabs: Tab(s) inside a TabList and TabPanel(s) */
	children: PropTypes.node,
	/** The index of the Tab to be selected by default in "Uncontrolled Mode" (default) where Tabs handle their state internally. Do not use in "Controlled Mode".*/
	defaultIndex: PropTypes.number,
	/** The index of the Tab to be selected by default. This enables "Controlled Mode" where the developer takes over control of the Tabs state and behaviour. Requires onSelect to be set.*/
	selectedIndex: PropTypes.number,
	/** Handler required in "Controlled Mode" */
	onSelect: PropTypes.func,
	/** Add a custom className to the whole Tabs construct */
	className: PropTypes.string,
}

MainTabs.defaultTabs = {
	children: null,
	defaultIndex: undefined,
	selectedIndex: undefined,
	onSelect: undefined,
	className: "",
}