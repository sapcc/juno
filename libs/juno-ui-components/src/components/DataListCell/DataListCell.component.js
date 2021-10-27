import React from "react"
import PropTypes from "prop-types"

const datalistcellbasestyles = `
	flex
	p-2
	overflow-hidden
	overflow-ellipsis
`

const datalistcellautostyles = `
	flex-grow
	flex-shrink-0
	flex-basis-0
`

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
		<div className={`datalist-cell ${datalistcellbasestyles} ${className}`} style={cellStyles} {...props} >
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