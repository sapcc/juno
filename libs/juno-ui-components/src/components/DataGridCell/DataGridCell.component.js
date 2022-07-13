import React from "react"
import PropTypes from "prop-types"

const cellBaseStyles = `
	jn-px-5
	jn-py-3
	jn-border-b
	jn-border-theme-background-lvl-2
`

const cellCustomStyles = (colSpan) => {
	let styles
	if (colSpan) {
		styles = { gridColumn: `span ${colSpan} / span ${colSpan}`}
	}
	return styles
}

export const DataGridCell = ({
	colSpan,
	className,
	children,
	...props
}) => {
	return (
		<div 
			className={`juno-datagrid-cell ${cellBaseStyles} ${className}`} 
			style={cellCustomStyles(colSpan)}
			{...props}>
			{children}
		</div>
	)
}

DataGridCell.propTypes = {
	/** Add a col span to the cell. This works like a colspan in a normal html table, so you have to take care not to place too many cells in a row if some of them have a colspan.  */
	colSpan: PropTypes.number,
	/** Children to render in the DataGridCell */
	children: PropTypes.node,
	/** Add a classname */
	className: PropTypes.string,
}

DataGridCell.defaultProps = {
	colSpan: undefined,
	className: "",
	children: null,
}