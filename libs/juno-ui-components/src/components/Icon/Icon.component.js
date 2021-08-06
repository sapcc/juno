import React from "react"
import PropTypes from "prop-types"

/* Import Icons here. The icon svgs in the icons folder correspond to the respective "xyz_24px.svg" from material-ui icons. 
*/
import Close from "./icons/cancel.svg"
import Error from "./icons/error.svg"
import ExpandLess from "./icons/expand_less.svg"
import ExpandMore from "./icons/expand_more.svg"
import Help from "./icons/help.svg"
import Info from "./icons/info.svg"
import Success from "./icons/check_box.svg"
import Search from "./icons/search.svg"
import Warning from "./icons/warning.svg"

/**
Generic Icon component.
*/

const getColoredSizedIcon = (icon, color, size) => {	
	  switch (icon) {
			case "cancel":
				return <Cancel width={size} height={size} className={`fill-current ${color}`}/>
			case "error":
				return <Error width={size} height={size} className={`fill-current ${color}`}/>
			case "expandLess":
				return <ExpandLess width={size} height={size} className={`fill-current ${color}`}/>
			case "expandMore":
				return <ExpandMore width={size} height={size} className={`fill-current ${color}`}/>
			case "help":
				return <Help width={size} height={size} className={`fill-current ${color}`}/>
			case "info":
				return <Info width={size} height={size} className={`fill-current ${color}`}/>
			case "search":
				return <Search width={size} height={size} className={`fill-current ${color}`}/>
			case "success":
				return <Success width={size} height={size} className={`fill-current ${color}`}/>
			case "warning":
				return <Warning width={size} height={size} className={`fill-current ${color}`}/>
		default:
		  return <Help width={size} height={size} className={`fill-current ${color}`}/>
	  }
	}

export const Icon = ({
	icon,
	color,
	size,
	...props
}) => {
	console.log(`=========== size: ${size}`)
	const clr = color || "text-theme-default"
	return ( getColoredSizedIcon(icon, clr, size || "24") )
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