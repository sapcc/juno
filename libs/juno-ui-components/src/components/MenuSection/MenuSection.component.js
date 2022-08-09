import React from "react"
import PropTypes from "prop-types"

export const MenuSection = ({
	title,
	children,
	className,
	...props
}) => {
	return (
		<div className={`juno-menu-section ${className}`} {...props} >
			{ title ? <div>{title}</div> : null }
			{ children }
		</div>
	)
}

MenuSection.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
}

MenuSection.defaultProps = {
	title: "",
	children: null,
	className: "",
}