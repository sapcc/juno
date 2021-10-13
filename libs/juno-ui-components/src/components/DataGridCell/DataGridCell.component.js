import React from "react"
import PropTypes from "prop-types"

export const DataGridCell = ({
	className,
	children,
	props
}) => {
	return (
		<td classname={className} {...props}>
			{children}
		</td>
	)
}

DataGridCell.propTypes = {
	/** Children to render in the DataGridCell */
	children: PropTypes.node,
}

DataGridCell.defaultProps = {
	className: "",
	children: null,
}