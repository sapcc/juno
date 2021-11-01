import React from "react"
import PropTypes from "prop-types"

/* Import Icons here. The icon svgs in the icons folder correspond to the respective "xyz_24px.svg" from material-ui icons. 
*/
import Cancel from "./icons/cancel.svg"
import Error from "./icons/error.svg"
import ExpandLess from "./icons/expand_less.svg"
import ExpandMore from "./icons/expand_more.svg"
import Help from "./icons/help.svg"
import Info from "./icons/info.svg"
import Place from "./icons/place.svg"
import Success from "./icons/check_box.svg"
import Search from "./icons/search.svg"
import Warning from "./icons/warning.svg"

/**
Generic Icon component.
*/

const getColoredSizedIcon = ({icon, color, size, ...props}) => {	
	  switch (icon) {
			case "cancel":
				return <Cancel width={size} height={size} className={`fill-current ${color}`} {...props}/>
			case "error":
				return <Error width={size} height={size} className={`fill-current ${color}`} {...props} />
			case "expandLess":
				return <ExpandLess width={size} height={size} className={`fill-current ${color}`} {...props} />
			case "expandMore":
				return <ExpandMore width={size} height={size} className={`fill-current ${color}`} {...props} />
			case "help":
				return <Help width={size} height={size} className={`fill-current ${color}`} {...props} />
			case "info":
				return <Info width={size} height={size} className={`fill-current ${color}`} {...props} />
			case "place":
				return <Place width={size} height={size} className={`fill-current ${color}`} {...props} />
			case "search":
				return <Search width={size} height={size} className={`fill-current ${color}`} {...props} />
			case "success":
				return <Success width={size} height={size} className={`fill-current ${color}`} {...props} />
			case "warning":
				return <Warning width={size} height={size} className={`fill-current ${color}`} {...props} />
		default:
		  return <Help width={size} height={size} className={`fill-current ${color}`} {...props} />
	  }
	}

export const Icon = ({
	icon,
	color,
	size,
	...props
}) => {
	const clr = color || "text-theme-default"
	return ( getColoredSizedIcon({icon, clr, size, ...props}) )
}

Icon.propTypes = { 
	/** The icon to display */
	icon: PropTypes.oneOf(["cancel", "error", "expandLess", "expandMore", "help", "info", "place", "search", "success", "warning"]),
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