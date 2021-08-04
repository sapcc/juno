import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"

const clickableIconStyles = `
	inline-block
	w-4
	h-4
	focus:outline-none
	focus:ring-2
	focus:ring-focus
`

export const ClickableIcon = ({
	icon,
	size,
	color,
	className,
	onClick,
	...props
}) => {
	return (
		<button className={`clickableicon ${clickableIconStyles} ${className}`} onClick={onClick} {...props}>
			<Icon size={size} color={color} />
		</button>
	)
}

ClickableIcon.propTypes = {
	/** The icon to render */
	icon: PropTypes.string,
	/** Size of the icon */
	size: PropTypes.string,
	/** The color of the icon */
	color: PropTypes.string,
	/** Pass a className */
	className: PropTypes.string,
	/** Pass a click handler */
	onClick: PropTypes.func,
}

ClickableIcon.defaultProps = {
	icon: null,
	size: null,
	color: null,
	className: "",
	onClick: undefined,
}