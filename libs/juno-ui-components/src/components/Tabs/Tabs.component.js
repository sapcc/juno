import React, { useState, useEffect } from "react"
import { Tabs as ReactTabs } from "react-tabs" //
import PropTypes from "prop-types"

const JunoTabs =({ children, ...otherProps }) => (
	<ReactTabs {...otherProps} >
		{ children } 
	</ReactTabs>
)

JunoTabs.tabsRole = 'Tabs'

export const Tabs = ({
	children,
	defaultIndex,
	selectedIndex,
	onSelect,
	className,
	...props
}) => {
	return (
		<JunoTabs 
			className={`juno-tabs ${className}`}
			defaultIndex={defaultIndex}
			selectedIndex={selectedIndex}
			onSelect={(index) => console.log(index)} //
			{...props} >
				{children}
		</JunoTabs>
	)
}	

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