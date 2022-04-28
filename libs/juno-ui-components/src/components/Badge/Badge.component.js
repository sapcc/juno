import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"

const badgeBaseStyles = `
`

const defaultStyles = ``

const infoStyles = ``

const successStyles = ``

const warningStyles = ``

const dangerStyles = ``

const errorStyles = ``


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
		if (icon) {
			// TODO:
			// if icon is an available icon, return as passed:
			// otherwise return icon as per variant:
			// otherwise return default icon:
			// return <Icon icon={variant} />
			return "[icon] "
		} else {
			return null
		}
	}
	return (
		<span className={`juno-badge juno-badge-${variant} ${badgeBaseStyles} ${className}`} {...props} >
			{icon ? getIcon(icon, variant) : null }
			{children ? children : text}
		</span>
	)
}

Badge.propTypes = {
	variant: PropTypes.oneOf(["default", "info", "success", "warning", "danger", "error"]),
	icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(["info", "success", "warning", "danger", "error"])]),  // TODO: refactor to use const of existing icons exported from icon component
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