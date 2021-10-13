import React from "react"
import PropTypes from "prop-types"

export const DataGridFoot = ({
	className,
	children,
	props
}) => {
	return (
		<tfoot classname={className} {...props}>
			{children}
		</tfoot>
	)
}

const DataGridFoot.propTypes = {
	/** Children to render in the DataGrid */
	children: PropTypes.node,
}

DataGridFoot.defaultProps = {
	className: "",
	children: null,
}