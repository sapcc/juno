import React from "react"
import PropTypes from "prop-types"

/* Import Icons here. The icon svgs in the icons folder correspond to the respective "xyz_24px.svg" from material-ui icons. 
*/
import Cancel from "./icons/cancel.svg"
import Close from "./icons/close.svg"
import Error from "./icons/error.svg"
import ExpandLess from "./icons/expand_less.svg"
import ExpandMore from "./icons/expand_more.svg"
import Help from "./icons/help.svg"
import Info from "./icons/info.svg"
import ManageAccounts from "./icons/manage_accounts.svg"
import Place from "./icons/place.svg"
import Success from "./icons/check_box.svg"
import Search from "./icons/search.svg"
import Warning from "./icons/warning.svg"

/**
Generic Icon component.
*/

const getColoredSizedIcon = ({icon, color, size, className, ...props}) => {	
		const iconClass = `fill-current ${color} ${className || ""}`
	  switch (icon) {
			case "cancel":
				return <Cancel width={size} height={size} className={iconClass} alt="cancel" role="img" {...props}/>
			case "close":
				return <Close width={size} height={size} className={iconClass} alt="close" role="img" {...props}/>
			case "error":
				return <Error width={size} height={size} className={iconClass} alt="error" role="img" {...props} />
			case "expandLess":
				return <ExpandLess width={size} height={size} className={iconClass} alt="expandLess" role="img" {...props} />
			case "expandMore":
				return <ExpandMore width={size} height={size} className={iconClass} alt="expandMore" role="img" {...props} />
			case "help":
				return <Help width={size} height={size} className={iconClass} alt="help" role="img" {...props} />
			case "info":
				return <Info width={size} height={size} className={iconClass} alt="info" role="img" {...props} />
			case "manageAccounts":
				return <ManageAccounts width={size} height={size} className={iconClass} alt="ManageAccounts" role="img" {...props} />
			case "place":
				return <Place width={size} height={size} className={iconClass} alt="location" role="img" {...props} />
			case "search":
				return <Search width={size} height={size} className={iconClass} alt="search" role="img" {...props} />
			case "success":
				return <Success width={size} height={size} className={iconClass} alt="success" role="img" {...props} />
			case "warning":
				return <Warning width={size} height={size} className={iconClass} alt="warning" role="img" {...props} />
		default:
		  return <Help width={size} height={size} className={iconClass} alt="help" role="img" {...props} />
	  }
	}

export const Icon = ({
	icon,
	color,
	size,
	className,
	...props
}) => {
	return ( getColoredSizedIcon({icon, color, size, className, ...props}) )
}

Icon.propTypes = { 
	/** The icon to display */
	icon: PropTypes.oneOf(["cancel", "close", "error", "expandLess", "expandMore", "help", "info", "manageAccounts", "place", "search", "success", "warning"]),
	/** The color of the icon */
	color: PropTypes.string,
	/** The size of the icon */
	size: PropTypes.string,
}

Icon.defaultProps = {
	icon: null,
	color: "text-theme-default",
	size: "24"
}