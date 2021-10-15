import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

export const DataGrid = ({
	className,
	children,
	props
}) => {
	return (
		<table className={className} {...props}>
			{children}
		</table>
	)
}

DataGrid.propTypes = {
	/** Children to render in the DataGrid */
	children: PropTypes.node,
	/** Add a classname */
	className: PropTypes.string,
}

DataGrid.defaultProps = {
	className: "",
	children: null,
}