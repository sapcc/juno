import React, { useEffect, useState} from "react"
import PropTypes from "prop-types"

const baseStyles = `
	jn-overflow-hidden
	jn-flex
	jn-flex-col
	jn-rounded
	jn-bg-theme-background-lvl-1
`

const smallStyles = `
	jn-text-sm
`

const normalStyles = `
	jn-text-base
`

const variantStyles = (variant) => {
	switch (variant) {
		case "small":
			return smallStyles
		default:
			return normalStyles
	}
}

/** A generic menu component */
export const Menu = ({
	children,
	variant,
	className,
	...props
}) => {
	return (
		<div className={`juno-menu juno-menu-${variant} ${baseStyles} ${variantStyles(variant)} ${className}`} 
			role="menu" 
			{...props} 
		>
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