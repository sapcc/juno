import React from "react"
import PropTypes from "prop-types"

/* Import Icons here. The icon svgs in the icons folder correspond to the respective "xyz_24px.svg" from material-ui icons. 
*/
import Help from "-!@svgr/webpack?svgo=false!./icons/help.svg"

/**
Generic Icon component.
*/

const getColoredSizedIcon = (icon, color, size) => {	
	  switch (icon) {
		case "help":
		  return <Help fill={color} width={size} height={size} />
		default:
		  return <Help fill={color} width={size} height={size} />
	  }
	}

export const Icon = ({
	icon,
	color,
	size,
	...props
}) => {
	const clr = color || "var(--color-global-text)"
	return ( getColoredSizedIcon(icon, clr, size) )
}

Icon.propTypes = { 
	/** The icon to display */
	icon: PropTypes.string,
	/** The color of the icon */
	color: PropTypes.string,
	/** The size of the icon */
	size: PropTypes.string,
}

Icon.defaultProps = {
	icon: null,
	color: null,
	size: "24"
}