import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useDataGridContext } from "../DataGrid/DataGrid.component.js"
import { DataGridCheckboxCell } from "../DataGridCheckboxCell/DataGridCheckboxCell.component.js" 


export const DataGridHeadRow = ({
	selected,
	className,
	children,
	...props
}) => {
	const dataGridContext = useDataGridContext() || {}
	const selectable = dataGridContext.selectable
	
	const toggleItemsSelected = () => {
		console.log('not implemented')	
	}
	
	return (
		<tr className={`juno-datagrid-head-row ${className}`} {...props}>
			{ selectable ? <DataGridCheckboxCell onChange={toggleItemsSelected} /> : null }
			{children}
		</tr>
	)
}

DataGridHeadRow.propTypes = {
	/** Whether to display a checkbox to select/de-select all items in the DataGrid (only relevant in a `selectable` DataGrid */
	selected: PropTypes.bool,
	/** Add a classname */
	className: PropTypes.string,
	/** Children to render in the DataGridRow */
	children: PropTypes.node
}

DataGridHeadRow.defaultProps = {
	selected: false,
	className: "",
	children: null,
}