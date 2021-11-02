import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { ClickableIcon } from "../ClickableIcon/index.js"

export const OverflowMenu = ({
	disabled,
	className
}) => {
	const [isOpen, setIsOpen] = useState(false)
	
	const handleClick = (event) => {
		setIsOpen(!isOpen)
	}
	
	return (
		<ClickableIcon disabled={disabled} className={className} onClick={handleClick} aria-haspopup/>
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