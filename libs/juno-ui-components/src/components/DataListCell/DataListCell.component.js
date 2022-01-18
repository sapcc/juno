import React from "react"
import PropTypes from "prop-types"

const datalistcellbasestyles = `
	flex
	p-2
	overflow-hidden
	overflow-ellipsis
	grow-0
	shrink-0
	flex-basis-auto
`

const datalistcellautostyles = `
	grow
	shrink-0
	flex-basis-0
`

const datalistcellgridstyles = `
	p-grid-column
`

const cols_1 = `
w-grid-col-1
`

const cols_2 = `
w-grid-col-2
`

const cols_3 = `
w-grid-col-3
`

const cols_4 = `
w-grid-col-4
`

const cols_5 = `
w-grid-col-6
`

const cols_6 = `
w-grid-col-6
`

const cols_7 = `
w-grid-col-7
`

const cols_8 = `
w-grid-col-8
`

const cols_9 = `
w-grid-col-9
`

const cols_10 = `
w-grid-col-10
`

const cols_11 = `
w-grid-col-11
`

const cols_12 = `
w-grid-col-12
`

const colsClass = (cols) => {
switch (cols) {
	case 1:
		return cols_1
	case 2:
		return cols_2
	case 3:
		return cols_3
	case 4:
		return cols_4
	case 5: 
		return cols_5
	case 6: 
		return cols_6
	case 7:
		return cols_7
	case 8: 
		return cols_8
	case 9:
		return cols_9
	case 10:
		return cols_10
	case 11:
		return cols_11
	case 12:
		return cols_12
	default: null
}
}

export const DataListCell = ({
	cols,
	width,
	auto,
	className,
	children,
	...props
}) => {
	// auto cell:
	const autoStyles = {
		flexGrow: "1",
		flexShrink: "0",
		flexBasis: "0"
	}
	// width cell:
	const widthStyles = width ? { width: width + '%', flexGrow: "0", flexShrink: "0", flexBasis: width + '%' } : {}
	// width overrides auto:
	const cellStyles = width ? widthStyles : ( auto ? autoStyles : {} )
	return (
		<div className={`juno-datalist-cell ${datalistcellbasestyles} ${cols ? colsClass(cols) : '' } ${className}`} style={cellStyles} {...props} >
			{children}
		</div>
	)
}

DataListCell.propTypes = {
	/** The number of columns to span the column over when fitting to the grid. */
	cols: PropTypes.number,
	/** The width in percent as a number without "%" for auto-layout grids TODO: or "auto". If a width is given, it will override the "cols" prop. */
	width: PropTypes.number,
	/** Whether the colum should set an auto width */
	auto: PropTypes.bool,
	/** Custom classname */
	className: PropTypes.string,
	/** Children to render in the DataListCell */
	children: PropTypes.node,
}

DataListCell.defaultProps = {
	cols: null,
	width: null,
	auto: false,
	className: "",
	children: null,
}