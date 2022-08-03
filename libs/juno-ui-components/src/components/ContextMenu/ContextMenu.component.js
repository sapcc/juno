import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"

export const ContextMenu = ({
	icon,
	className,
	children,
	...props
}) => {
	return (
		<>
		<Icon />
		<div>
			{ children }
		</div>
		</>
	)
}

ContextMenu.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
}

ContextMenu.defaultProps = {
	className: "",
	children: null,
}