import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

const dataGridStyles = `
	jn-grid
	jn-items-stretch
`

const gridTemplate = (columns, columnMaxSize, columnMinSize, minContentColumns, gridColumnTemplate) => {
	let styles
	
	// gridColumnTemplate was passed. Return it and ignore all other settings
	if (gridColumnTemplate && gridColumnTemplate.length > 0) {
		styles = { gridTemplateColumns: gridColumnTemplate }
		return styles
	}

	let generatedTemplate = ""
	// if a configuration for min-content columns has been passed iteratively generate the gridTemplateColumn sizes,
	// else generate a simpler statement using the repeat function
	if ( minContentColumns && Array.isArray(minContentColumns) && minContentColumns.length > 0 ) {
		// for each configured column check if it should have normal or min-content sizing and add the respective string to the template string
		[...Array(columns)].map((_, i) => {
			generatedTemplate += minContentColumns.includes(i) ? 'min-content ' : `minmax(${columnMinSize}, ${columnMaxSize}) `
		})
	} else {
		generatedTemplate = `repeat(${columns}, minmax(${columnMinSize}, ${columnMaxSize}))`
	}

	styles = { gridTemplateColumns: generatedTemplate }
	return styles 
}

const DataGridContext = React.createContext()

export const useDataGridContext = () => React.useContext(DataGridContext)

// TODO: allow for passing in props addItems, addItemsLabel, search, etc.:
/** The DataGrid component is the main way to display lists of items that have a bunch of metadata that you want to display.
 */
export const DataGrid = ({
	columns,
	columnMaxSize,
	columnMinSize,
	minContentColumns,
	gridColumnTemplate,
	cellVerticalAlignment,
	className,
	children,
	...props
}) => {
	const dataGridConf = {
		cellVerticalAlignment: cellVerticalAlignment
		// selectable: selectable
	}
	return (
		<DataGridContext.Provider value={dataGridConf}>
			<div 
				className={`juno-datagrid ${dataGridStyles} ${className}`} 
				style={gridTemplate(columns, columnMaxSize, columnMinSize, minContentColumns, gridColumnTemplate)}
				role="grid"
				{...props} >
					{children}
			</div>
		</DataGridContext.Provider>
	)
}

DataGrid.propTypes = {
	/** Set number of columns */
	columns: PropTypes.number,
	/** Set column max sizing. Default: auto. For equally sized columns use "1fr" */
	columnMaxSize: PropTypes.string,
	/** Set column minimum size. Default: 0px */
	columnMinSize: PropTypes.string,
	/** Specify which columns should be sized by minimum content size (i.e. as small as possible). Pass an array of column numbers (first column is 0) */
	minContentColumns: PropTypes.arrayOf(PropTypes.number),
	/** Set the grid column template in CSS grid 'grid-template-columns' notation. If this prop is passed, all other template props (columns, columnMaxSize, columnMinSize, minContentColumns) are ignored */
	gridColumnTemplate: PropTypes.string,
	/** Set the vertical alignment for all GridCells. Default: center. PLEASE NOTE: the center alignment is achieved by using a flexbox column layout, 
	 * which means that all child elements of the cell will be stacked vertically. To avoid this, wrap the elements in their own div */
	cellVerticalAlignment: PropTypes.oneOf(["center", "top"]),
	/** Children to render in the DataGrid */
	children: PropTypes.node,
	/** Add a class name */
	className: PropTypes.string,
}

DataGrid.defaultProps = {
	columns: 1,
	columnMaxSize: "auto",
	columnMinSize: "0px",
	minContentColumns: undefined,
	gridColumnTemplate: undefined,
	cellVerticalAlignment: "center",
	className: "",
	children: null,
}