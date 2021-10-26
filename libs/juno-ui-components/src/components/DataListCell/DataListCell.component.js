import React from "react"
import PropTypes from "prop-types"

const datalistcellbasestyles = `

`

export const DataListCell = ({
	cols,
	width,
	auto,
	className,
	children,
	...props
}) => {
	return (
		<div className={`datalist-cell ${datalistcellbasestyles} ${className}`} {...props} >
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