import React from "react"
import PropTypes from "prop-types"

/* Import Icons here. The icon svgs in the icons folder correspond to the respective "xyz_24px.svg" from material-ui icons. 
*/
import AutoAwesomeMosaic from "./icons/auto_awesome_mosaic.svg"
import AutoAwesomeMotion from "./icons/auto_awesome_motion.svg"
import Cancel from "./icons/cancel.svg"
import Close from "./icons/close.svg"
import Danger from "./icons/danger.svg"
import Dangerous from "./icons/dangerous.svg"
import Description from "./icons/description.svg"
import Error from "./icons/error.svg"
import ExpandLess from "./icons/expand_less.svg"
import ExpandMore from "./icons/expand_more.svg"
import Forum from "./icons/forum.svg"
import Help from "./icons/help.svg"
import Info from "./icons/info.svg"
import InsertComment from "./icons/insert_comment.svg"
import ManageAccounts from "./icons/manage_accounts.svg"
import OpenInBrowser from "./icons/open_in_browser.svg"
import OpenInNew from "./icons/open_in_new.svg"
import Place from "./icons/place.svg"
import Success from "./icons/check_box.svg"
import Search from "./icons/search.svg"
import Warning from "./icons/warning.svg"

/**
Generic Icon component.
*/

const getColoredSizedIcon = ({icon, color, size, className, ...props}) => {	
		const iconClass = `juno-icon juno-icon-${icon} fill-current ${color} ${className || ""}`
	  switch (icon) {
			case "autoAwesomeMosaic":
				return <AutoAwesomeMosaic width={size} height={size} className={iconClass} alt="mosaic" role="img" {...props} />
			case "autoAwesomeMotion":
				return <AutoAwesomeMotion width={size} height={size} className={iconClass} alt="items stacked behind each other" role="img" {...props} />
			case "cancel":
				return <Cancel width={size} height={size} className={iconClass} alt="cancel" role="img" {...props} />
			case "close":
				return <Close width={size} height={size} className={iconClass} alt="close" role="img" {...props} />
			case "danger":
				return <Danger width={size} height={size} className={iconClass} alt="danger" role="img" {...props} />
			case "dangerous":
				return <Dangerous width={size} height={size} className={iconClass} alt="dangerous" role="img" {...props} />
			case "description":
				return <Description width={size} height={size} className={iconClass} alt="description" role="img" {...props} />
			case "error":
				return <Error width={size} height={size} className={iconClass} alt="error" role="img" {...props} />
			case "expandLess":
				return <ExpandLess width={size} height={size} className={iconClass} alt="expand less" role="img" {...props} />
			case "expandMore":
				return <ExpandMore width={size} height={size} className={iconClass} alt="expand more" role="img" {...props} />
			case "forum":
				return <Forum width={size} height={size} className={iconClass} alt="forum" role="img" {...props} />
			case "help":
				return <Help width={size} height={size} className={iconClass} alt="help" role="img" {...props} />
			case "info":
				return <Info width={size} height={size} className={iconClass} alt="info" role="img" {...props} />
			case "insertComment":
				return <InsertComment width={size} height={size} className={iconClass} alt="insert comment" role="img" {...props} />
			case "manageAccounts":
				return <ManageAccounts width={size} height={size} className={iconClass} alt="user account configuration" role="img" {...props} />
			case "openInBrowser":
				return <OpenInBrowser width={size} height={size} className={iconClass} alt="open in browser" role="img" {...props} />
			case "openInNew":
				return <OpenInNew width={size} height={size} className={iconClass} alt="open in new tab" role="img" {...props} />
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
	icon: PropTypes.oneOf(
		[
			"autoAwesomeMosaic", 
			"autoAwesomeMotion", 
			"cancel", 
			"close", 
			"dangerous",
			"description",
			"error", 
			"expandLess", 
			"expandMore", 
			"forum", 
			"help", 
			"insertComment", 
			"info", 
			"manageAccounts", 
			"openInBrowser", 
			"openInNew", 
			"place", 
			"search", 
			"success", 
			"warning"
		]
	),
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