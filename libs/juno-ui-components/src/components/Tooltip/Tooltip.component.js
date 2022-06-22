import React, { useState } from "react"
import ReactDOM from "react-dom";
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"

/* Styles */

const popover = `
	jn-p-2
	jn-rounded
	jn-text-xs
	jn-inline-block
	jn-absolute
	jn-bg-theme-tooltip-popover
	jn-text-theme-tooltip-popover
`

/* Create tooltip popover with content as passed */
const TooltipPopover = ({
	text,
	isOpen
}) => {
	if (!isOpen) return null 
	return (
		<div className={`juno-tooltip-popover ${popover}`}>
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
TODO: Use InPortal component.
TODO: Can render an icon or will be triggered by any children wrapped inside / passed to it.
*/
export const Tooltip = ({
	position,
	text,
	className,
	disabled,
	...props
}) => {
	const [open, setOpen] = useState(false)
	return (		
		<span className={`tooltip`} {...props}>
			<Icon onClick={() => setOpen(!open)} className={className} disabled={disabled}/>
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
	/** Pass a className to render to the icon button*/
	className: PropTypes.string,
	/** Disable the tooltip */
	disabled: PropTypes.bool,
}

Tooltip.defaultProps = {
	position: "top",
	text: null,
	className: "",
	disabled: null,
}
