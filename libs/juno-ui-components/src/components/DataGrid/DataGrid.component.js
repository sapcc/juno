import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

const dataGridStyles = `
	jn-grid
`

const gridTemplate = (columns, columnSize, columnMinSize, gridColumnTemplate) => {
	let template = gridColumnTemplate ? `${gridColumnTemplate}` : `repeat(${columns}, minmax(${columnMinSize}, ${columnSize}))`
	let styles = {
		gridTemplateColumns: template
	}
	return styles 
}

const DataGridContext = React.createContext()

export const useDataGridContext = () => React.useContext(DataGridContext)

// TODO: allow for passing in props addItems, addItemsLabel, search, etc.:
export const DataGrid = ({
	columns,
	columnSize,
	columnMinSize,
	gridColumnTemplate,
	className,
	children,
	...props
}) => {
	const dataGridConf = {
		// selectable: selectable
	}
	return (
		<DataGridContext.Provider value={dataGridConf}>
			<div 
				className={`juno-datagrid ${dataGridStyles} ${className}`} 
				style={gridTemplate(columns, columnSize, columnMinSize, gridColumnTemplate)}
				{...props} >
					{children}
			</div>
		</DataGridContext.Provider>
	)
}

DataGrid.propTypes = {
	/** Set number of columns */
	columns: PropTypes.number,
	/** Set column sizing. If columnMinSize is also set, this is used as the max size. Default: auto. For equally sized columns use "1fr" */
	columnSize: PropTypes.string,
	/** Set column minimum size. Default: 0px */
	columnMinSize: PropTypes.string,
	/** Set the grid column template in CSS grid 'grid-template-columns' notation. If this prop is passed, all other template props (columns, columnSize, columnMinSize) are ignored */
	gridColumnTemplate: PropTypes.string,
	/** Children to render in the DataGrid */
	children: PropTypes.node,
	/** Add a class name */
	className: PropTypes.string,
}

DataGrid.defaultProps = {
	columns: 1,
	columnSize: "auto",
	columnMinSize: "0px",
	gridColumnTemplate: undefined,
	className: "",
	children: null,
}