import React from "react"
import PropTypes from "prop-types"

const gridcolumnstyles = `
	flex-grow
	flex-shrink-0
	flex-basis-0
`

export const GridColumn = ({
	width,
	span,
	children,
	...props
}) => {
	return (
		<div className={`grid-column ${gridcolumnstyles}`}>
			{children}
		</div>
	)
}


GridColumn.propTypes = {
	/** The width in percentages for auto-layout grids. If a width is given, it will override the span prop. */
	width: PropTypes.number,
	/** The number of columns in a fixed grid to span */
	span: PropTypes.node,
}

GridColumn.defaultProps = {
	width: null,
	span: null,
}