import React from "react"
import PropTypes from "prop-types"

// apply if no col given:
const autogridcolumnstyles = `
	flex-grow
	flex-shrink-0
	flex-basis-0
`

// apply if col given:
const colgridcolumnstyles = `
	flex-grow-0
	flex-shrink-0
	flex-basis-auto
`

const col1 = `
	w-grid-col-1
`

const col2 = `
	w-grid-col-2
`

const col3 = `
	w-grid-col-3
`

const col4 = `
	w-grid-col-4
`

const col5 = `
	w-grid-col-5
`

const col6 = `
	w-grid-col-6
`

const col7 = `
	w-grid-col-7
`

const col8 = `
	w-grid-col-8
`

const col9 = `
	w-grid-col-9
`

const col10 = `
	w-grid-col-10
`

const col11 = `
	w-grid-col-11
`

const col12 = `
	w-grid-col-12
	
`

const basecolstyles = (col) => {
	if (col) {
		return colgridcolumnstyles
	} else {
		return autogridcolumnstyles
	}
}

const colstyles = (col) => {
	switch (col) {
		case 1:
			return col1
		case 2:
			return col2
		case 3:
			return col3
		case 4:
			return col4
		case 5:
			return col5
		case 6:
			return col6
		case 7:
			return col7
		case 8:
			return col8
		case 9:
			return col9
		case 10:
			return col10
		case 11:
			return col11
		case 12:
			return col12
		default:
			return ``
	}
}

export const GridColumn = ({
	width,
	col,
	className,
	children,
	...props
}) => {
	return (
		<div className={`grid-column ${basecolstyles(col)} ${colstyles(col)} ${className}`} style={ width ? { width: width + "%"} : {} } >
			{children}
		</div>
	)
}


GridColumn.propTypes = {
	/** The width in percent as a number without "%" for auto-layout grids. If a width is given, it will override the "col" prop. */
	width: PropTypes.number,
	/** The number of columns in a fixed grid to span */
	col: PropTypes.number,
	/** Add a class to a grid column */
	className: PropTypes.string,
	/** Children to be rendered in the column element */
	children: PropTypes.node
}

GridColumn.defaultProps = {
	width: null,
	col: null,
	className: "",
}