import React from "react"
import PropTypes from "prop-types"
import { useGrid } from "../Grid/Grid.component.js"

export const GridColumn = ({
	width,
	cols,
	className,
	children,
	...props
}) => {
	const grid = useGrid()
	return (
		<div className={`grid-column ${className}`} >
			{children}
		</div>
	)
}


GridColumn.propTypes = {
	/** The number of reference columns in a fixed grid to span the column over. Requires to have columns=[n] set to the parent Grid.*/
	cols: PropTypes.number,
	/** The width in percent as a number without "%" for auto-layout grids TODO: or "auto". If a width is given, it will override the "cols" prop. */
	width: PropTypes.number,
	/** Add a class to a grid column */
	className: PropTypes.string,
	/** Children to be rendered in the column element */
	children: PropTypes.node
}

GridColumn.defaultProps = {
	width: null,
	cols: null,
	className: "",
}