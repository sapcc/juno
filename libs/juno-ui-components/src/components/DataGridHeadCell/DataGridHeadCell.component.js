import React from "react"
import PropTypes from "prop-types"

export const DataGridHeadCell = ({
	className,
	children,
	props
}) => {
	return (
		<th classname={className} {...props}>
			{children}
		</th>
	)
}

const DataGridHeadCell.propTypes = {
	/** Children to render in the DataGridHeadCell */
	children: PropTypes.node,
}

DataGridHeadCell.defaultProps = {
	className: "",
	children: null,
}