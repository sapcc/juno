import React from "react"
import PropTypes from "prop-types"
import "./menu-section.scss"

const titleStyles = `
	jn-text-xs
`

export const MenuSection = ({
	title,
	children,
	className,
	...props
}) => {
	return (
		<div className={`juno-menu-section ${className}`} {...props} >
			{ title ? <div className={`juno-menu-section-title ${titleStyles}`}>{title}</div> : null }
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