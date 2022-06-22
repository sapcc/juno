import React from "react"
import PropTypes from "prop-types"

const datagridcellbasestyles = `
	jn-text-left
`

export const DataGridCell = ({
	className,
	children,
	...props
}) => {
	return (
		<td className={`juno-datagrid-cell ${datagridcellbasestyles} ${className}`} {...props}>
			{children}
		</td>
	)
}

DataGridCell.propTypes = {
	/** Children to render in the DataGridCell */
	children: PropTypes.node,
	/** Add a classname */
	className: PropTypes.string,
}

DataGridCell.defaultProps = {
	className: "",
	children: null,
}