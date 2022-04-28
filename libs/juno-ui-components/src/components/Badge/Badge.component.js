import React from "react"
import PropTypes from "prop-types"

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
	return (
		<span className={`juno-badge juno-badge-${variant} ${badgeBaseStyles}`} {...props} >
			{children ? children : text}
		</span>
	)
}

Badge.propTypes = {
	variant: PropTypes.oneOf(["default", "info", "success", "warning", "danger", "error"]),
	icon: PropTypes.oneOf([PropTypes.bool, PropTypes.oneOf(["warning", "danger"])]),
	text: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node,
}

Badge.defaultProps = {
	variant: "default",
	icon: false,
	text: "",
	classname: "",
	children: null,
}