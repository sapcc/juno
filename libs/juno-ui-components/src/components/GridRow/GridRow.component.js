import React from "react"
import PropTypes from "prop-types"
import { useGrid } from "../Grid/Grid.component.js"

const gridrowstyles = `
	flex
	flex-wrap
	m-grid-row-default
`

export const GridRow = ({
	children,
	className,
	...props
}) => {
	// calculate margin if exist in grid context:
	const grid = useGrid()
	const margin_x = grid ? ( grid.gutter_x ? grid.gutter_x * -1 : null ) : null
	const margin_y = grid ? ( grid.gutter_y ? grid.gutter_y : null ) : null
	const rowStyle = grid ? {marginLeft: margin_x, marginRight: margin_x, marginBottom: margin_y} : null
	return (
		<div className={`grid-row ${gridrowstyles} ${className}`} style={rowStyle}>
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
