import React, { useState } from "react"
import ReactDOM from "react-dom";
import PropTypes from "prop-types"

/* Styles */
const tooltip = `
	
`

const iconbutton = `
	
`

const popover = `
	p-2
	text-xs
	inline-block
	absolute
	bg-theme-tooltip-popover
	text-theme-tooltip-popover
`

/* Create tooltip popover with content as passed */
const TooltipPopover = ({
	text,
	isOpen
}) => {
	if (!isOpen) return null 
	return (
		<div className={`tooltip-popover ${popover}`}>
			<p>{text}</p>
		</div>
	)
}

/* Portal to render Tooltip contents. Could be replaced with a generic portal component should we make one */
const InPortal = ({
	children
}) => {
	return ( ReactDOM.createPortal( children, document.body ))
}

/** 
An all purpose Tooltip component. 
TODO: Factor out portal into a separate, generic and re-usable component.
TODO: Use a proper icon
TODO: Can render an icon or will be triggered by any children wrapped inside / passed to it.
*/
export const Tooltip = ({
	position,
	text,
	...props
}) => {
	const [open, setOpen] = useState(false)
	return (		
		<span className={`tooltip ${tooltip}`} {...props}>
			<button 
				className={`${iconbutton}`} 
				onClick={() => setOpen(!open)}
			>
				(?)
			</button>
			<InPortal>
				<TooltipPopover text={text} isOpen={open} />
			</InPortal>
		</span>
	)
}

Tooltip.propTypes = {
	/** TODO: Position of the tooltip relative to the trigger */
	position: PropTypes.oneOf(["top", "right", "bottom", "left"]),
	/** Text to display in the tooltip */
	text: PropTypes.string.isRequired,
}

Tooltip.defaultProps = {
	position: "top",
	text: null,
}
