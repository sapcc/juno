import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

const datagridfullwidthstyles = `
	w-full
`

export const DataGrid = ({
	auto,
	selectable,
	className,
	children,
	props
}) => {
	return (
		<table className={`${ auto ? '' : datagridfullwidthstyles } ${className}`} {...props}>
			{children}
		</table>
	)
}

DataGrid.propTypes = {
	/** Whether the DataGrid should auto-size its width. By default a Datagrid will take up 100% of the available width. */
	auto: PropTypes.bool,
	/** Whether the Rows in a DataGrid should be selectable */
	selectable: PropTypes.bool,
	/** Children to render in the DataGrid */
	children: PropTypes.node,
	/** Add a classname */
	className: PropTypes.string,
}

DataGrid.defaultProps = {
	auto: false,
	selectable: false,
	className: "",
	children: null,
}