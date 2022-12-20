import React, { forwardRef} from "react"
import PropTypes from "prop-types"

/* Import Icons here. The icon svgs in the icons folder correspond to the respective "xyz_24px.svg" from material-ui icons.
 */
import AccountCircle from "./icons/account_circle.svg"
import AddCircle from "./icons/add_circle.svg"
import AutoAwesomeMosaic from "./icons/auto_awesome_mosaic.svg"
import AutoAwesomeMotion from "./icons/auto_awesome_motion.svg"
import Bolt from "./icons/bolt.svg"
import Cancel from "./icons/cancel.svg"
import CheckCircle from "./icons/check_circle.svg"
import ChevronLeft from "./icons/chevron_left.svg"
import ChevronRight from "./icons/chevron_right.svg"
import Close from "./icons/close.svg"
import ContentCopy from "./icons/content_copy.svg"
import Danger from "./icons/juno-danger.svg"
import Dangerous from "./icons/dangerous.svg"
import DeleteForever from "./icons/delete_forever.svg"
import Description from "./icons/description.svg"
import DNS from "./icons/dns.svg"
import Edit from "./icons/edit.svg"
import Error from "./icons/dangerous.svg"
import ExitToApp from "./icons/exit_to_app.svg"
import ExpandLess from "./icons/expand_less.svg"
import ExpandMore from "./icons/expand_more.svg"
import FilterAlt from "./icons/filter_alt.svg"
import Forum from "./icons/forum.svg"
import Help from "./icons/help.svg"
import Home from "./icons/home_sharp.svg"
import Info from "./icons/info.svg"
import InsertComment from "./icons/insert_comment.svg"
import ManageAccounts from "./icons/manage_accounts.svg"
import MoreVert from "./icons/more_vert.svg"
import OpenInBrowser from "./icons/open_in_browser.svg"
import OpenInNew from "./icons/open_in_new.svg"
import Place from "./icons/place.svg"
import Success from "./icons/check_box.svg"
import Search from "./icons/search.svg"
import SeverityLow from "./icons/juno_severity_low.svg"
import SeverityMedium from "./icons/juno_severity_medium.svg"
import SeverityHigh from "./icons/juno_severity_high.svg"
import SeverityCritical from "./icons/juno_severity_critical.svg"
import Warning from "./icons/warning.svg"
import Widgets from "./icons/widgets.svg"

/**
Generic Icon component.
*/
// hover style needs to be revisited. only works if no icon color was passed
const anchorIconStyles = `
	jn-text-current
  hover:jn-text-theme-high
  focus:jn-outline-none 
  focus-visible:jn-ring-2
  focus-visible:jn-ring-theme-focus
  focus-visible:jn-ring-offset-1
  focus-visible:jn-ring-offset-theme-focus
	disabled:jn-opacity-50
	disabled:jn-cursor-not-allowed
`

// hover style needs to be revisited. only works if no icon color was passed
const buttonIconStyles = `
  hover:jn-text-theme-high
	jn-inline-block
  focus:jn-outline-none 
  focus-visible:jn-ring-2
  focus-visible:jn-ring-theme-focus
  focus-visible:jn-ring-offset-1
  focus-visible:jn-ring-offset-theme-focus
	disabled:jn-opacity-50
	disabled:jn-cursor-not-allowed
`
// export all known icons as an array of their names to be used with PropTypes here and from other components:
export const knownIcons = [
  "accountCircle",
  "addCircle",
  "autoAwesomeMosaic",
  "autoAwesomeMotion",
  "bolt",
  "cancel",
  "checkCircle",
  "chevronLeft",
  "chevronRight",
  "close",
  "contentCopy",
  "danger",
  "dangerous",
  "default",
  "deleteForever",
  "description",
  "dns",
  "edit",
  "error",
  "exitToApp",
  "expandLess",
  "expandMore",
  "filterAlt",
  "forum",
  "help",
  "home",
  "info",
  "insertComment",
  "manageAccounts",
  "moreVert",
  "openInBrowser",
  "openInNew",
  "place",
  "search",
  "severityLow",
  "severityMedium",
  "severityHigh",
  "severityCritical",
  "success",
  "warning",
  "widgets",
]

const getColoredSizedIcon = ({
  icon,
  color,
  size,
  title,
  iconClassName,
  ...iconProps
}) => {
  const iconClass = `juno-icon juno-icon-${icon} jn-inline-block jn-fill-current ${color} ${iconClassName}`
  switch (icon) {
    case "accountCircle":
      return (
        <AccountCircle
          width={size}
          height={size}
          className={iconClass}
          alt="account"
          title={title ? title : "Account"}
          role="img"
          {...iconProps}
        />
      )
    case "addCircle":
      return (
        <AddCircle
          width={size}
          height={size}
          className={iconClass}
          alt="add"
          title={title ? title : "Add"}
          role="img"
          {...iconProps}
        />
      )
    case "autoAwesomeMosaic":
      return (
        <AutoAwesomeMosaic
          width={size}
          height={size}
          className={iconClass}
          alt="mosaic"
          title={title ? title : "Mosaic"}
          role="img"
          {...iconProps}
        />
      )
    case "autoAwesomeMotion":
      return (
        <AutoAwesomeMotion
          width={size}
          height={size}
          className={iconClass}
          alt="items stacked behind each other"
          title={title ? title : "Items stacked behind each other"}
          role="img"
          {...iconProps}
        />
      )
    case "bolt":
      return (
        <Bolt
          width={size}
          height={size}
          className={iconClass}
          alt="bolt"
          title={title ? title : "Bolt"}
          role="img"
          {...iconProps}
        />
      )
    case "cancel":
      return (
        <Cancel
          width={size}
          height={size}
          className={iconClass}
          alt="cancel"
          title={title ? title : "Cancel"}
          role="img"
          {...iconProps}
        />
      )
    case "checkCircle":
      return (
        <CheckCircle 
          width={size}
          height={size}
          className={iconClass}
          alt="checkCircle"
          title={title ? title : "CheckCircle"}
          role="img"
          {...iconProps}
        />
      )
    case "chevronLeft":
      return (
        <ChevronLeft
          width={size}
          height={size}
          className={iconClass}
          alt="chevronLeft"
          title={title ? title : "ChevronLeft"}
          role="img"
          {...iconProps}
        />
      )
    case "chevronRight":
      return (
        <ChevronRight
          width={size}
          height={size}
          className={iconClass}
          alt="chevronRight"
          title={title ? title : "ChevronRight"}
          role="img"
          {...iconProps}
        />
      )
    case "close":
      return (
        <Close
          width={size}
          height={size}
          className={iconClass}
          alt="close"
          title={title ? title : "Close"}
          role="img"
          {...iconProps}
        />
      )
    case "contentCopy":
      return (
        <ContentCopy
          width={size}
          height={size}
          className={iconClass}
          alt="copy"
          title={title ? title : "Copy"}
          role="img"
          {...iconProps}
        />
      )
    case "danger":
      return (
        <Danger
          width={size}
          height={size}
          className={iconClass}
          alt="danger"
          title={title ? title : "Danger"}
          role="img"
          {...iconProps}
        />
      )
    case "dangerous":
      return (
        <Dangerous
          width={size}
          height={size}
          className={iconClass}
          alt="dangerous"
          title={title ? title : "Dangerous"}
          role="img"
          {...iconProps}
        />
      )
    case "deleteForever":
      return (
        <DeleteForever
          width={size}
          height={size}
          className={iconClass}
          alt="delete forever"
          title={title ? title : "Delete Forever"}
          role="img"
          {...iconProps}
        />
      )
    case "description":
      return (
        <Description
          width={size}
          height={size}
          className={iconClass}
          alt="description"
          title={title ? title : "Description"}
          role="img"
          {...iconProps}
        />
      )
    case "dns":
      return (
        <DNS
          width={size}
          height={size}
          className={iconClass}
          alt="service"
          title={title ? title : "Service"}
          role="img"
          {...iconProps}
        />
      )
    case "edit":
      return (
        <Edit
          width={size}
          height={size}
          className={iconClass}
          alt="edit"
          title={title ? title : "Edit"}
          role="img"
          {...iconProps}
        />
      )
    case "error":
      return (
        <Error
          width={size}
          height={size}
          className={iconClass}
          alt="error"
          title={title ? title : "Error"}
          role="img"
          {...iconProps}
        />
      )
    case "exitToApp":
      return (
        <ExitToApp
          width={size}
          height={size}
          className={iconClass}
          alt="exit to other app"
          title={title ? title : "Exit to app"}
          role="img"
          {...iconProps}
        />
      )
    case "expandLess":
      return (
        <ExpandLess
          width={size}
          height={size}
          className={iconClass}
          alt="expand less"
          title={title ? title : "Expand Less"}
          role="img"
          {...iconProps}
        />
      )
    case "expandMore":
      return (
        <ExpandMore
          width={size}
          height={size}
          className={iconClass}
          alt="expand more"
          title={title ? title : "Expand More"}
          role="img"
          {...iconProps}
        />
      )
    case "filterAlt":
      return (
        <FilterAlt
          width={size}
          height={size}
          className={iconClass}
          alt="filter"
          title={title ? title : "Filter"}
          role="img"
          {...iconProps}
        />
      )
    case "forum":
      return (
        <Forum
          width={size}
          height={size}
          className={iconClass}
          alt="forum"
          title={title ? title : "Forum"}
          role="img"
          {...iconProps}
        />
      )
    case "help":
      return (
        <Help
          width={size}
          height={size}
          className={iconClass}
          alt="help"
          title={title ? title : "Help"}
          role="img"
          {...iconProps}
        />
      )
    case "home":
      return (
        <Home 
          width={size}
          height={size}
          className={iconClass}
          alt="home"
          title={title ? title : "Home"}
          role="img"
          {...iconProps}
        />
      )
    case "info":
      return (
        <Info
          width={size}
          height={size}
          className={iconClass}
          alt="info"
          title={title ? title : "Info"}
          role="img"
          {...iconProps}
        />
      )
    case "insertComment":
      return (
        <InsertComment
          width={size}
          height={size}
          className={iconClass}
          alt="insert comment"
          title={title ? title : "Insert comment"}
          role="img"
          {...iconProps}
        />
      )
    case "manageAccounts":
      return (
        <ManageAccounts
          width={size}
          height={size}
          className={iconClass}
          alt="user account configuration"
          title={title ? title : "User account configuration"}
          role="img"
          {...iconProps}
        />
      )
    case "moreVert":
      return (
        <MoreVert 
          width={size}
          height={size}
          className={iconClass}
          alt="more"
          title={title ? title : "More"}
          role="img"
          {...iconProps}
        />
      )
    case "openInBrowser":
      return (
        <OpenInBrowser
          width={size}
          height={size}
          className={iconClass}
          alt="open in browser"
          title={title ? title : "Open in browser"}
          role="img"
          {...iconProps}
        />
      )
    case "openInNew":
      return (
        <OpenInNew
          width={size}
          height={size}
          className={iconClass}
          alt="open in new tab"
          title={title ? title : "Open in new tab"}
          role="img"
          {...iconProps}
        />
      )
    case "place":
      return (
        <Place
          width={size}
          height={size}
          className={iconClass}
          alt="location"
          title={title ? title : "Location"}
          role="img"
          {...iconProps}
        />
      )
    case "search":
      return (
        <Search
          width={size}
          height={size}
          className={iconClass}
          alt="search"
          title={title ? title : "Search"}
          role="img"
          {...iconProps}
        />
      )
    case "severityLow":
      return (
        <SeverityLow
          width={size}
          height={size}
          className={iconClass}
          alt="Severity low"
          title={title ? title : "Severity Low"}
          role="img"
          {...iconProps}
        />
      )
    case "severityMedium":
      return (
        <SeverityMedium
          width={size}
          height={size}
          className={iconClass}
          alt="Severity medium"
          title={title ? title : "Severity Medium"}
          role="img"
          {...iconProps}
        />
      )
    case "severityHigh":
      return (
        <SeverityHigh
          width={size}
          height={size}
          className={iconClass}
          alt="Severity high"
          title={title ? title : "Severity High"}
          role="img"
          {...iconProps}
        />
      )
    case "severityCritical":
      return (
        <SeverityCritical
          width={size}
          height={size}
          className={iconClass}
          alt="Severity critical"
          title={title ? title : "Severity Critical"}
          role="img"
          {...iconProps}
        />
      )
    case "success":
      return (
        <Success
          width={size}
          height={size}
          className={iconClass}
          alt="success"
          title={title ? title : "Success"}
          role="img"
          {...iconProps}
        />
      )
    case "widgets":
      return (
        <Widgets
          width={size}
          height={size}
          className={iconClass}
          alt="widgets"
          title={title ? title : "Widgets"}
          role="img"
          {...iconProps}
        />
      )
    case "warning":
      return (
        <Warning
          width={size}
          height={size}
          className={iconClass}
          alt="warning"
          title={title ? title : "Warning"}
          role="img"
          {...iconProps}
        />
      )
    case "default": // keep explicit default case to allow consuming components to use 'default'  w/o throwing warnings
      return (
        <Help
          width={size}
          height={size}
          className={iconClass}
          alt="help"
          title={title ? title : "Help"}
          role="img"
          {...iconProps}
        />
      )
    default:
      return (
        <Help
          width={size}
          height={size}
          className={iconClass}
          alt="help"
          title={title ? title : "Help"}
          role="img"
          {...iconProps}
        />
      )
  }
}

export const Icon = forwardRef(({
  icon,
  color,
  size,
  title,
  className,
  href,
  onClick,
  ...props
}, ref) => {
  // if href or onClick was passed, then we want to add the passed classes and passed arbitrary props to the button or anchor
  // otherwise add the passed classes/props to the icon itself
  const iconClassName = href || onClick ? "" : className
  const iconProps = href || onClick ? {} : props

  const icn = getColoredSizedIcon({
    icon,
    color,
    size,
    title,
    iconClassName,
    ...iconProps,
  })
  
  const handleClick = (event) => {
    onClick && onClick(event)
  }

  const button = (
    <button
      onClick={handleClick}
      className={`juno-icon-button ${buttonIconStyles} ${className}`}
      aria-label={title || icon}
      ref={ref}
      {...props}
    >
      {icn}
    </button>
  )

  const anchor = (
    <a
      href={href}
      className={`juno-icon-link ${anchorIconStyles} ${className}`}
      aria-label={title || icon}
      ref={ref}
      {...props}
    >
      {icn}
    </a>
  )

  /* render an <a> if href was passed, otherwise render button if onClick was passes, otherwise render plain icon: */
  /* if plain icon, add ref to the icon. In the other cases the ref goes on the anchor or button */
  return href ? anchor : onClick ? button : <span ref={ref}>{icn}</span>
})

Icon.propTypes = {
  /** The icon to display */
  icon: PropTypes.oneOf(knownIcons),
  /** By default, Icons will use the `color` of the current context. In order to use a different color just for the icon, a text color class can be passed. These begin with "jn-text-". */
  color: PropTypes.string,
  /** The size of the icon as a number of pixels (without "px": "16" will render an icon of 16px x 16px)*/
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
  href: "",
  onClick: undefined,
}
