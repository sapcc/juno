import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

const datagridfullwidthstyles = `
	w-full
`

export const DataGrid = ({
	auto,
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
	/** Children to render in the DataGrid */
	children: PropTypes.node,
	/** Add a classname */
	className: PropTypes.string,
}

DataGrid.defaultProps = {
	className: "",
	children: null,
}