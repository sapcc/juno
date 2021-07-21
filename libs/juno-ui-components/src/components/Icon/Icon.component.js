import React from "react"
import PropTypes from "prop-types"

/* Import Icons here. The icon svgs in the icons folder correspond to the respective "xyz_24px.svg" from material-ui icons. */
import Help from "./icons/help.svg"

/**
Generic Icon component.
*/

const getColorizedIcon = (icon, color) => {
	  switch (icon) {
		case "help":
		  return <Help fill={color} />
		default:
		  return <Help fill={color} />
	  }
	}

export const Icon = ({
	icon,
	color,
	...props
}) => {
	const clr = color || "var(--color-global-text)"
	return ( getColorizedIcon(icon, clr) )
}

Icon.propTypes = { 
	/** The icon to display */
	icon: PropTypes.string,
	/** The color of the icon */
	color: PropTypes.string,
}

Icon.defaultProps = {
	icon: null,
	color: null,
}