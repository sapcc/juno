import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { DataGridToolbar } from "../DataGridToolbar/DataGridToolbar.component.js"

const datagridfullwidthstyles = `
	jn-w-full
`

const DataGridContext = React.createContext()

export const useDataGridContext = () => React.useContext(DataGridContext)

// TODO: allow for passing in props addItems, addItemsLabel, search, etc.:
export const DataGrid = ({
	auto,
	selectable,
	showToolbar,
	className,
	children,
	...props
}) => {
	const dataGridConf = {
		selectable: selectable
	}
	return (
		<DataGridContext.Provider value={dataGridConf}>
			<div className={`juno-datagrid-container ${className}`} {...props} >
				{ showToolbar ? <DataGridToolbar /> : null }
				<table className={`${ auto ? '' : datagridfullwidthstyles }`}>
					{children}
				</table>
			</div>
		</DataGridContext.Provider>
	)
}

DataGrid.propTypes = {
	/** Whether the DataGrid should auto-size its width. By default a Datagrid will take up 100% of the available width. */
	auto: PropTypes.bool,
	/** Whether the Rows in a DataGrid should be selectable */
	selectable: PropTypes.bool,
	/** Whether to display a toolbar */
	showToolbar: PropTypes.bool,
	/** Children to render in the DataGrid */
	children: PropTypes.node,
	/** Add a classname */
	className: PropTypes.string,
}

DataGrid.defaultProps = {
	auto: false,
	selectable: false,
	showToolbar: false,
	className: "",
	children: null,
}