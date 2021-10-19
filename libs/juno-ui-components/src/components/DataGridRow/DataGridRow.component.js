import React from "react"
import PropTypes from "prop-types"
import { useDataGridContext } from "../DataGrid/DataGrid.component.js"
import { DataGridCheckboxCell } from "../DataGridCheckboxCell/DataGridCheckboxCell.component.js" 

export const DataGridRow = ({
	className,
	children,
	props
}) => {
	const dataGridContext = useDataGridContext()
	const selectable = dataGridContext.selectable
	return (
		<tr className={className} {...props}>
			{ selectable ? <DataGridCheckboxCell /> : ''}
			{children}
		</tr>
	)
}

DataGridRow.propTypes = {
	/** Children to render in the DataGridRow */
	children: PropTypes.node,
	/** Add a classname */
	className: PropTypes.string,
}

DataGridRow.defaultProps = {
	className: "",
	children: null,
}