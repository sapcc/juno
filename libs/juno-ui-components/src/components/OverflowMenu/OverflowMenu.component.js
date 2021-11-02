import React from "react"
import PropTypes from "prop-types"
import { ClickableIcon } from "../ClickableIcon/index.js"

export const OverflowMenu = ({
	disabled,
	className
}) => {
	return (
		<ClickableIcon disabled={disabled} className={className} aria-haspopup/>
	)
}

OverflowMenu.propTypes = {
	/** Whether the menu is disabled */
	disabled: PropTypes.bool,
	/** Add custom classes to the toggle */
	className: PropTypes.string,
}

OverflowMenu.defaultProps = {
	disabled: false,
	classname: null,
}