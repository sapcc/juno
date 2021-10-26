import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useDataGridContext } from "../DataGrid/DataGrid.component.js"
import { DataGridCell } from "../DataGridCell/DataGridCell.component.js"

// TODO: if used in selectable DataGrid, compensate first cell padding for width of checkboxes in the body rows
export const DataGridFootRow = ({
	className,
	children,
	...props
}) => {
	const dataGridContext = useDataGridContext() || {}
	const selectable = dataGridContext.selectable
	// render empty first cell in footer row to compensate checkbox cells in selectable datagrid:
	return (
		<tr className={className} {...props}>
			{ selectable ? <DataGridCell /> : null }
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