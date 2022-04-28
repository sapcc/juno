import React from "react"
import PropTypes from "prop-types"

export const Badge = ({
	variant,
	icon,
	text,
	className,
	children,
	...props
}) => {
	return (
		<span className={`juno-badge juno-badge-${variant}`} {...props} >
			{children ? children : text}
		</span>
	)
}

Badge.propTypes = {
	variant: PropTypes.oneOf(["default", "info", "success", "warning", "danger", "error"]),
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