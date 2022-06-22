import React from "react"
import { Tabs as ReactTabs } from "react-tabs" //
import PropTypes from "prop-types"


const Tabs = ({
	children,
	defaultIndex,
	selectedIndex,
	onSelect,
	className,
	...props
}) => {
	return (
		<ReactTabs 
			className={`juno-tabs ${className}`}
			defaultIndex={defaultIndex}
			selectedIndex={selectedIndex}
			onSelect={(index) => console.log(index)} //
			{...props} >
				{children}
		</ReactTabs>
	)
}	

Tabs.tabsRole = 'Tabs'

Tabs.propTypes = {
	/** All the child elements of the Tabs: Tab(s) inside a TabList and TabPanel(s) */
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

Tabs.defaultProps = {
	children: null,
	defaultIndex: 0,
	selectedIndex: null,
	className: "",
}

export { Tabs }