import React, { useEffect, useState} from "react"
import PropTypes from "prop-types"


export const Menu = ({
	children,
	variant,
	className,
	...props
}) => {
	return (
		<div className={`juno-menu juno-menu-${variant} ${className}`} role="menu" {...props} >
			{ children }
		</div>
	)
}

Menu.propTypes = {
	/* The children of the Menu,, typically MenuItem */
	children: PropTypes.node,
	/** Whether the Menu will be in normal or small variant */
	variant: PropTypes.oneOf(["small", "normal"]),
	/* Add a className */
	className: PropTypes.string,
}

Menu.defaultProps = {
	children: null,
	variant: "normal",
	className: "",
}