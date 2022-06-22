import React, { useState, useEffect } from "react"
import { TabPanel as ReactTabPanel } from "react-tabs"
import PropTypes from "prop-types"

const JunoTabPanel =({ children, ...otherProps }) => (
	<ReactTabPanel { ...otherProps } >
		{ children } 
	</ReactTabPanel>
)

JunoTabPanel.tabsRole="TabPanel"

export const TabPanel = ({
	children,
	className,
	...props
}) => {
	
	return (
		<JunoTabPanel 
			className={`juno-tabpanel ${className}`}
			selectedClassName="juno-tabpanel-selected"
			{...props} >
				{children}
		</JunoTabPanel>
	)
}

TabPanel.propTypes = {
	/** The content to show/render when the associated Tab is selected */
	children: PropTypes.node,
	/** Add a custom classList to the TabPanel */
	className: PropTypes.string,
}

TabPanel.defaultProps = {
	children: null,
	className: "",
}
