import React from "react"
import PropTypes from "prop-types"

export const DataGridBody = ({
	className,
	children,
	props
}) => {
	return (
		<tbody classname={className} {...props}>
			{children}
		</tbody>
	)
}

const DataGridBody.propTypes = {
	/** Children to render in the DataGrid */
	children: PropTypes.node,
}

DataGridBody.defaultProps = {
	className: "",
	children: null,
}