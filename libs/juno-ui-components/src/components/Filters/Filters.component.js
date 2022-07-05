import React from "react"
import PropTypes from "prop-types"

export const Filters = ({
	search,
	filter,
	children,
	className,
	...props
}) => { 
	return (
		<div className={`juno-filters ${className}`} {...props}>
			{ children }
		</div>
	)
}

Filters.propTypes = {
	search: PropTypes.node,
	filters: PropTypes.string, // TBD
	className: PropTypes.string,	
}

Filters.defaultProps = {
	className: ""
}