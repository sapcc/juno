import React from "react"
import PropTypes from "prop-types"

export const DataGridHeadCell = ({
	className,
	children,
	props
}) => {
	return (
		<th className={className} {...props}>
			{children}
		</th>
	)
}

DataGridHeadCell.propTypes = {
	/** Children to render in the DataGridHeadCell */
	children: PropTypes.node,
	/** Add a classname */
	className: PropTypes.string,
}

DataGridHeadCell.defaultProps = {
	className: "",
	children: null,
}