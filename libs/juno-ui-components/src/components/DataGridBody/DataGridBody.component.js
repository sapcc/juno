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

DataGridBody.propTypes = {
	/** Children to render in the DataGridBody */
	children: PropTypes.node,
}

DataGridBody.defaultProps = {
	className: "",
	children: null,
}