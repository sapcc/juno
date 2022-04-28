import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"

const badgeBaseStyles = `
	rounded
	text-sm
	text-theme-default
	py-0.5
	px-1
`

const defaultStyles = `bg-theme-badge-default`

const infoStyles = `bg-theme-info/25`

const successStyles = `bg-theme-success/25`

const warningStyles = `bg-theme-warning/25`

const dangerStyles = `bg-theme-danger/25`

const errorStyles = `bg-theme-error/25`

const iconStyles = `mr-1 mt-[-0.125rem]`

const knownVariants = ["info", "success", "warning", "danger", "error"]

const knownIcons = ["info", "success", "warning", "danger", "error"] // TODO export available icons from Icon component and import here

const getVariantStyle = (variant) => {
	switch (variant) {
		case "info":
			return infoStyles
		case "success":
			return successStyles
		case "warning":
			return warningStyles
		case "danger":
			return dangerStyles
		case "error":
			return errorStyles
		default:
			return defaultStyles
			
	}
}

export const Badge = ({
	variant,
	icon,
	text,
	className,
	children,
	...props
}) => {
	
	const getIcon = (icon, variant) => {
		
		if (icon && knownIcons.includes(icon)) { // if icon is an available icon, return as passed:
			return icon  
		} else if (icon === true) { // otherwise return icon as per variant if === "true" (map if not congruent!):
			return variant
		} else {
			return null
		}
	}
	
	return (
		<span className={`juno-badge juno-badge-${variant} ${badgeBaseStyles} ${getVariantStyle(variant)} ${className}`} {...props} >
			{icon 
				?  
				<Icon icon={getIcon(icon, variant)} size="1.125rem" className={`${iconStyles}`} color={`text-theme-${variant}`} /> 
				: 
				null 
			}
			{children ? children : text}
		</span>
	)
}

Badge.propTypes = {
	variant: PropTypes.oneOf(["default", ...knownVariants]),
	icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(knownIcons)]),  // WIP, TODO: refactor to use const of existing icons exported from icon component
	text: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node,
}

Badge.defaultProps = {
	variant: "default",
	icon: false,
	text: "",
	className: "",
	children: null,
}