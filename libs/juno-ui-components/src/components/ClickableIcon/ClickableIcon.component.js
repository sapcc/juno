import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"

const clickableIconStyles = `
	inline-block
	w-4
	h-4
`

export const ClickableIcon = ({
	icon,
	size,
	color,
	onClick,
	...props
}) => {
	return (
		<button className={`clickableicon ${clickableIconStyles}`} onClick={onClick} {...props}>
			<Icon size={size} color={color} />
		</button>
	)
}

ClickableIcon.propTypes = {
	icon: PropTypes.string,
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
}

ClickableIcon.defaultProps = {
	icon: null,
	size: null,
	color: null,
	onClick: undefined,
}