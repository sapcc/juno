import React from "react"
import PropTypes from "prop-types"


export const OverflowMenuFloatingMenu = ({
	children,
	...props
}) => {
	return (
		<ul className={`overflow-menu-floating-menu`} {...props}>
			{children}
		</ul>
	)
}

OverflowMenuFloatingMenu.propTpyes = {
	children: PropTypes.node,
}

OverflowMenuFloatingMenu.defaultProps = {
	children: null
}