import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"



export const ContextMenuItem = ({
	label,
	icon,
	children,
	className,
	...props
}) => {
	return (
		<div className={`${className}`} { ...props } >
			{ icon ? <Icon icon={icon} /> : null }
			{ label || children }
		</div>
	)
}

ContextMenuItem.propTypes = {
	label: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node,
}

ContextMenuItem.defaultProps = {
	label: "",
	className: "",
	children: null,
}