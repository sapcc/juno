import React from "react"
import PropTypes from "prop-types"

const filterStyles = `
`

export const Filters = ({
	search,
	filter,
	children,
	className,
	...props
}) => { 
	return (
		<div className={`juno-filters ${filterStyles} ${className}`} {...props}>
			{ children }
		</div>
	)
}

Filters.propTypes = {
	/** Pass a SearchInput component */
	search: PropTypes.node,
	/** Pass an object describing the filters */
	filters: PropTypes.string, // TBD
	/** add custom classNames */
	className: PropTypes.string,	
}

Filters.defaultProps = {
	search: null,
	filters: null,
	className: ""
}