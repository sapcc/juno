import React from "react"
import PropTypes from "prop-types"
import { useGrid } from "../Grid/Grid.component.js"

const gridrowstyles = `
	flex
	flex-wrap
	gap-grid
`

export const GridRow = ({
	children,
	className,
	...props
}) => {
	const grid = useGrid()
	return (
		<div className={`grid-row ${gridrowstyles} ${className}`}>
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
