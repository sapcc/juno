import React from "react"
import PropTypes from "prop-types"

const cellBaseStyles = `
	jn-px-5
	jn-py-3
	jn-border-b
	jn-border-theme-background-lvl-2
	jn-flex
	jn-flex-col
	jn-justify-center
	jn-h-full
`

const cellCustomStyles = (colSpan) => {
	let styles
	if (colSpan) {
		styles = { gridColumn: `span ${colSpan} / span ${colSpan}`}
	}
	return styles
}

const innerWrapperStyles = (wrap) => {
	return `
		${wrap ? '' : 'jn-whitespace-nowrap' }
	`
}

export const DataGridCell = ({
	colSpan,
	wrap,
	className,
	children,
	...props
}) => {
	return (
		<div 
			className={`juno-datagrid-cell ${cellBaseStyles} ${className}`} 
			style={cellCustomStyles(colSpan)}
			role="gridcell"
			{...props}>
			{/* The div wrapper is important, otherwise the flexbox layout of the cell causes unexpected behaviour if you don't know about it. With the cell content behaves as expected */}
			<div className={`juno-datagrid-cell-inner-wrapper ${innerWrapperStyles(wrap)}`}>
				{children}
			</div>
		</div>
	)
}

DataGridCell.propTypes = {
	/** Add a col span to the cell. This works like a colspan in a normal html table, so you have to take care not to place too many cells in a row if some of them have a colspan.  */
	colSpan: PropTypes.number,
	/** Set wrap to false if the content shouldn't wrap */
	wrap: PropTypes.bool,
	/** Children to render in the DataGridCell */
	children: PropTypes.node,
	/** Add a classname */
	className: PropTypes.string,
}

DataGridCell.defaultProps = {
	colSpan: undefined,
	wrap: true,
	className: "",
	children: null,
}