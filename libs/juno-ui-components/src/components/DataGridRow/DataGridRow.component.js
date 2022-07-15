import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
// import { useDataGridContext } from "../DataGrid/DataGrid.component.js"
// import { DataGridCheckboxCell } from "../DataGridCheckboxCell/DataGridCheckboxCell.component.js" 

const rowBaseStyle = `
	jn-contents
`
// const rowSelectedStyle = `
// 	jn-bg-theme-datagridrow-selected
// `

export const DataGridRow = ({
	selected,
	disabled,
	className,
	children,
	onChange,
	...props
}) => {
	// const dataGridContext = useDataGridContext() || {}
	// const selectable = dataGridContext.selectable
	
	// const [isSelected, setIsSelected] = useState(false)
	// useEffect( () => {
	// 	setIsSelected(selected)
	// }, [selected])
	
	// const toggleSelected = (event) => {
	// 	setIsSelected(!isSelected)
	// 	onChange(event)
	// }
	
	//  ${ selectable && isSelected ? rowSelectedStyle : '' }
	return (
		<div 
			className={`juno-datagrid-row ${rowBaseStyle} ${className}`}
			role="row"
			{...props}>
			{/* { selectable ? <DataGridCheckboxCell selected={selected} disabled={disabled} onChange={toggleSelected} /> : null } */}
			{children}
		</div>
	)
}

DataGridRow.propTypes = {
	// /** Whether the row / item is selected (only relevant in a `selectable` DataGrid */
	// selected: PropTypes.bool,
	// /** Whether the row/item is disabled (only relevant in a `selectable` DataGrid */
	// disabled: PropTypes.bool,
	/** Children to render in the DataGridRow */
	children: PropTypes.node,
	/** Add a classname */
	className: PropTypes.string,
	// /** Pass a handler to be executed when selected state changes */
	// onChange: PropTypes.func,
}

DataGridRow.defaultProps = {
	// selected: false,
	// disabled: false,
	className: "",
	children: null,
	// onChange: undefined,
}