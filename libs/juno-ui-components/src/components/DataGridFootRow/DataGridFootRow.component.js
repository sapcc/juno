import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

// TODO: if used in selectable DataGrid, compensate first cell padding for width of checkboxes in the body rows
export const DataGridFootRow = ({
	className,
	children,
	props
}) => {

	
	return (
		<tr className={className} {...props}>
			{children}
		</tr>
	)
}

DataGridFootRow.propTypes = {
	/** Add a classname */
	className: PropTypes.string,
	/** Children to render in the DataGridRow */
	children: PropTypes.node
}

DataGridFootRow.defaultProps = {
	className: "",
	children: null,
}