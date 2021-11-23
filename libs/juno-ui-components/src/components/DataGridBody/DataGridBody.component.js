import React from "react"
import PropTypes from "prop-types"

export const DataGridBody = ({
	className,
	children,
	...props
}) => {
	return (
		<tbody className={`juno-datagrid-body ${className}`} {...props}>
			{children}
		</tbody>
	)
}

DataGridBody.propTypes = {
	/** Children to render in the DataGridBody */
	children: PropTypes.node,
	/** Add a classname */
	className: PropTypes.string,
}

DataGridBody.defaultProps = {
	className: "",
	children: null,
}