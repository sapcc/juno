import React from "react"
import { TabPanel as ReactTabPanel } from "react-tabs"
import PropTypes from "prop-types"


const TabPanel = ({
	padding,
	children,
	className,
	...props
}) => {
	
	return (
		<ReactTabPanel 
			className={`juno-tabpanel ${className}`}
			selectedClassName="juno-tabpanel-selected"
			{...props} >
				{children}
		</ReactTabPanel>
	)
}

TabPanel.tabsRole="TabPanel"

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

export { TabPanel }