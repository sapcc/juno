import React from "react"
import PropTypes from "prop-types"

const gridRowBaseStyles = `
	jn-flex
	jn-flex-wrap
	jn-m-grid-row
`
/**
A grid row to hold GridColumn elements inside a Grid.
*/
export const GridRow = ({
	children,
	className,
	...props
}) => {
	return (
		<div className={`juno-grid-row ${gridRowBaseStyles} ${className}`} {...props} >
			{children}
		</div>
	)
}


GridRow.propTypes = {
	/** The children to render in the grid row */
	children: PropTypes.node,
	/** Add a class to the grid row */
	className: PropTypes.string,
}

GridRow.defaultProps = {
	children: null,
	className: ""
}
