import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { ClickableIcon } from "../ClickableIcon/index.js"



export const OverflowMenu = ({
	disabled,
	children,
	className,
	...props
}) => {
	const [isOpen, setIsOpen] = useState(false)
	
	const handleClick = (event) => {
		setIsOpen(!isOpen)
	}
	
	return (
		<>
			<ClickableIcon disabled={disabled} className={className} onClick={handleClick} aria-haspopup {...props}/>
		</>
	)
}

OverflowMenu.propTypes = {
	/** Whether the menu is disabled */
	disabled: PropTypes.bool,
	/** Children to render in the floating menu */
	children: PropTypes.node,
	/** Add custom classes to the toggle */
	className: PropTypes.string,
}

OverflowMenu.defaultProps = {
	disabled: false,
	children: null,
	className: null,
}