import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

export const DataGrid = ({
	className,
	children,
	props
}) => {
	return (
		<table classname={className} {...props}>
			{children}
		</table>
	)
}

DataGrid.propTypes = {
	/** Children to render in the DataGrid */
	children: PropTypes.node,
}

DataGrid.defaultProps = {
	className: "",
	children: null,
}