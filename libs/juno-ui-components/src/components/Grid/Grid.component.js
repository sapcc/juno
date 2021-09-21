import React from "react"
import PropTypes from "prop-types"

export const Grid = ({
	children,
	...props
}) => {
	return (
		<div className={`grid-container`}>
			{children}
		</div>
	)
}


Grid.propTypes = {
	/** The children to render in the grid */
	children: PropTypes.node,
}
