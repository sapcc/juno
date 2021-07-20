import React from "react"
import PropTypes from "prop-types"
import Help from "./icons/help.svg"


/**
* A Message holds generally important information to help understand the contents, purpose, or state of a whole page or view. Use sparingly, there should never be any two or more subsequent instances of Message as direct siblings/neighbors on an individual view.
The icon svgs in the icons folder correspond to the respective "xyz_24px.svg" from material-ui icons.
*/

const getColorizedIcon = (icon, color) => {
	
	// TODO: determine default color based on theme
	
	  switch (icon) {
		case "help":
		  return <Help fill={color} />
		default:
		  return <Help  fill={color} />
	  }
	}

export const Icon = ({
	icon,
	color,
	...props
}) => {
	return ( getColorizedIcon(icon, color) )
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