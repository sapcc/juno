import React from "react"
import PropTypes from "prop-types"

/* Import Icons here. The icon svgs in the icons folder correspond to the respective "xyz_24px.svg" from material-ui icons. 
*/
import AddCircle from "./icons/add_circle.svg"
import AutoAwesomeMosaic from "./icons/auto_awesome_mosaic.svg"
import AutoAwesomeMotion from "./icons/auto_awesome_motion.svg"
import Cancel from "./icons/cancel.svg"
import Close from "./icons/close.svg"
import Danger from "./icons/juno-danger.svg"
import Dangerous from "./icons/dangerous.svg"
import DeleteForever from "./icons/delete_forever.svg"
import Description from "./icons/description.svg"
import Error from "./icons/dangerous.svg"
import ExitToApp from "./icons/exit_to_app.svg"
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

const anchorIconStyles = `
	text-current
	focus:outline-none
	focus:ring-2
	focus:ring-theme-focus
	disabled:opacity-50
	disabled:cursor-not-allowed
`

const buttonIconStyles = `
	inline-block
	focus:outline-none
	focus:ring-2
	focus:ring-theme-focus
	disabled:opacity-50
	disabled:cursor-not-allowed
`

const getColoredSizedIcon = ({icon, color, size, title, className, ...props}) => {	
		const iconClass = `juno-icon juno-icon-${icon} inline-block fill-current ${color} ${className || ""}`
	  switch (icon) {
			case "addCircle":
				return <AddCircle width={size} height={size} className={iconClass} alt="add" title={ title ? title : "Add" } role="img" {...props} />
			case "autoAwesomeMosaic":
				return <AutoAwesomeMosaic width={size} height={size} className={iconClass} alt="mosaic" title={ title ? title : "Mosaic" } role="img" {...props} />
			case "autoAwesomeMotion":
				return <AutoAwesomeMotion width={size} height={size} className={iconClass} alt="items stacked behind each other" title={ title ? title : "Items stacked behind each other" } role="img" {...props} />
			case "cancel":
				return <Cancel width={size} height={size} className={iconClass} alt="cancel" title={ title ? title : "Cancel" } role="img" {...props} />
			case "close":
				return <Close width={size} height={size} className={iconClass} alt="close" title={ title ? title : "Close" } role="img" {...props} />
			case "danger":
				return <Danger width={size} height={size} className={iconClass} alt="danger" title={ title ? title : "Danger" } role="img" {...props} />
			case "dangerous":
				return <Dangerous width={size} height={size} className={iconClass} alt="dangerous" title={ title ? title : "Dangerous" } role="img" {...props} />
			case "deleteForever":
				return <DeleteForever width={size} height={size} className={iconClass} alt="delete forever" title={ title ? title : "Delete Forever" } role="img" {...props} />
			case "description":
				return <Description width={size} height={size} className={iconClass} alt="description" title={ title ? title : "Description" } role="img" {...props} />
			case "error":
				return <Error width={size} height={size} className={iconClass} alt="error" title={ title ? title : "Error" } role="img" {...props} />
			case "exitToApp":
				return <ExitToApp width={size} height={size} className={iconClass} alt="exit to other app" title={ title ? title : "Exit to app" } role="img" {...props} />
			case "expandLess":
				return <ExpandLess width={size} height={size} className={iconClass} alt="expand less" title={ title ? title : "Expand Less" } role="img" {...props} />
			case "expandMore":
				return <ExpandMore width={size} height={size} className={iconClass} alt="expand more" title={ title ? title : "Expand More" } role="img" {...props} />
			case "forum":
				return <Forum width={size} height={size} className={iconClass} alt="forum" title={ title ? title : "Forum" } role="img" {...props} />
			case "help":
				return <Help width={size} height={size} className={iconClass} alt="help" title={ title ? title : "Help" } role="img" {...props} />
			case "info":
				return <Info width={size} height={size} className={iconClass} alt="info" title={ title ? title : "Info" } role="img" {...props} />
			case "insertComment":
				return <InsertComment width={size} height={size} className={iconClass} alt="insert comment" title={ title ? title : "Insert comment" } role="img" {...props} />
			case "manageAccounts":
				return <ManageAccounts width={size} height={size} className={iconClass} alt="user account configuration" title={ title ? title : "User account configuration" } role="img" {...props} />
			case "openInBrowser":
				return <OpenInBrowser width={size} height={size} className={iconClass} alt="open in browser" title={ title ? title : "Open in browser" } role="img" {...props} />
			case "openInNew":
				return <OpenInNew width={size} height={size} className={iconClass} alt="open in new tab" title={ title ? title : "Open in new tab" } role="img" {...props} />
			case "place":
				return <Place width={size} height={size} className={iconClass} alt="location" title={ title ? title : "Location" } role="img" {...props} />
			case "search":
				return <Search width={size} height={size} className={iconClass} alt="search" title={ title ? title : "Search" } role="img" {...props} />
			case "success":
				return <Success width={size} height={size} className={iconClass} alt="success" title={ title ? title : "Success" } role="img" {...props} />
			case "warning":
				return <Warning width={size} height={size} className={iconClass} alt="warning" title={ title ? title : "Warning" } role="img" {...props} />
		default:
		  return <Help width={size} height={size} className={iconClass} alt="help" title={ title ? title : "Help" } role="img" {...props} />
	  }
	}

export const Icon = ({
	icon,
	color,
	size,
	title,
	className,
	href,
	onClick,
	...props
}) => {
	
	const icn = ( 
		getColoredSizedIcon({icon, color, size, title, className, ...props})
	)
	
	const button = (
		<button onClick={onClick} className={`juno-icon-button ${buttonIconStyles}`} >
			{icn}
		</button>
	)
	
	const anchor = (
		<a href={href} className={`juno-icon-link ${anchorIconStyles}`} >
			{icn}
		</a>
	)
	
	/* render an <a> if href was passed, otherwise render button if onClick was passes, otherwise render plain icon: */
	return ( href ? anchor : ( onClick ? button : icn))

}

Icon.propTypes = { 
	/** The icon to display */
	icon: PropTypes.oneOf(
		[
			"addCircle", 
			"autoAwesomeMosaic", 
			"autoAwesomeMotion", 
			"cancel", 
			"close", 
			"danger",
			"dangerous",
			"deleteForever",
			"description",
			"error", 
			"exitToApp", 
			"expandLess", 
			"expandMore",
			"forum", 
			"help", 
			"info", 
			"insertComment", 
			"manageAccounts", 
			"openInBrowser", 
			"openInNew", 
			"place", 
			"search", 
			"success", 
			"warning"
		]
	),
	/** By default, Icons will use the `color` of the current context. In order to use a different color just for the icon, a color class can be passed. These typically begin with "text-". */
	color: PropTypes.string,
	/** The size of the icon */
	size: PropTypes.string,
	/** The title of the icon. Important for accessibility, will also show as a tooltip: */
	title: PropTypes.string,
	/** A custom className */
	className: PropTypes.string,
	/** Optionally specify an href. This will render the Icon inside an <code><a></code> element with the given url. */
	 href: PropTypes.string,
	 /** Optionally specify a click handler. This will render the icon inside a <code><button></code> with the given handler.  */
	 onClick: PropTypes.func,
}

Icon.defaultProps = {
	icon: null,
	color: "",
	size: "24",
	title: "",
	className: "",
	href:"",
	onClick: undefined,
}