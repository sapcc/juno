import React from "react"
import PropTypes from "prop-types"

const datagridcellbasestyles = `
	text-left
`

export const DataGridHeadCell = ({
	className,
	children,
	props
}) => {
	return (
		<th className={`${datagridcellbasestyles} ${className}`} {...props}>
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