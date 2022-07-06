import React from "react"
import { Tab as ReactTab } from "react-tabs"
import PropTypes from "prop-types"


const tabStyles = `
	jn-flex
	jn-font-bold
	jn-px-[1.5625rem]
	jn-items-center
	jn-cursor-pointer
	focus:jn-outline-none 
`

const disabledTabStyles = `
	jn-pointer-events-none
	jn-opacity-50
`

const selectedTabStyles = `
	jn-border-b-[3px]
	jn-border-theme-tab-active-bottom
`

const Tab = ({
	children,
	label,
	disabled,
	className,
	...props
}) => {
	
	return (
		<ReactTab 
			className={`juno-tab ${tabStyles} ${className}`}
			disabledClassName={`juno-tab-disabled ${disabledTabStyles}`}
			selectedClassName={`juno-tab-selected ${selectedTabStyles}`}
			disabled={disabled}
			{...props} >
			{ children || label }
		</ReactTab>
	)
}

Tab.tabsRole = 'Tab'

Tab.propTypes = {
	/** The children to render inside the Tab (-button) */
	children: PropTypes.node,
	/** The Tab label (only rendered when no children are supplied) */
	label: PropTypes.string,
	/** Whether the Tab is disabled */
	disabled: PropTypes.bool,
	/** Add custom classNames to the Tab */
	className: PropTypes.string,
}

Tab.defaultProps = {
	children: null,
	label: "",
	disabled: false,
	className: "",
}

export { Tab }