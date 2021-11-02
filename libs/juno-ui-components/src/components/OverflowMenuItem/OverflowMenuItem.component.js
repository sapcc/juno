import React from "react"
import PropTypes from "prop-types"

export const OverflowMenuItem = ({
	children,
	...props
}) => {
	return (
		<li className={`overflow-menu-item`} {...props}>
			{children}
		</li>
	)
}

OverflowMenuItem.propTpyes = {
	children: PropTypes.node,
}

OverflowMenuItem.defaultProps = {
	children: null,
}