import React from "react"
import PropTypes from "prop-types"

export const Grid = ({
	children,
	className,
	...props
}) => {
	return (
		<div className={`grid-container ${className}`}>
			{children}
		</div>
	)
}


Grid.propTypes = {
	/** The children to render in the grid */
	children: PropTypes.node,
	/** Add a class to the grid container */
	className: PropTypes.string,
}
