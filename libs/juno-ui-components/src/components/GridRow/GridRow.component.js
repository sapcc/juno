import React from "react"
import PropTypes from "prop-types"

const gridrowstyles = `
	flex
	flex-wrap
	gap-grid
`

export const GridRow = ({
	children,
	...props
}) => {
	return (
		<div className={`grid-row ${gridrowstyles}`}>
			{children}
		</div>
	)
}


GridRow.propTypes = {
	/** The children to render in the grid row */
	children: PropTypes.node,
}
