import React, { useEffect, useState} from "react"
import PropTypes from "prop-types"


export const Menu = ({
	children,
	className,
	...props
}) => {
	return (
		<div className={`juno-menu ${className}`} role="menu" {...props} >
			{ children }
		</div>
	)
}

Menu.propTypes = {
	/* The children of the Menu,, typically MenuItem */
	children: PropTypes.node,
	/* Add a className */
	className: PropTypes.string,
}

Menu.defaultProps = {
	children: null,
	className: "",
}