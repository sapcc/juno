import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"

const headCellBaseStyles = `
	jn-font-bold
	jn-text-theme-high
	jn-bg-theme-background-lvl-1
	jn-px-5
	jn-py-3
`

const sortIconStyles = `
	jn-ml-2
`

export const DataGridHeadCell = ({
	// sortable,
	className,
	children,
	...props
}) => {
	return (
		<div className={`juno-datagrid-head-cell ${headCellBaseStyles} ${className}`} {...props}>
			{children}
			{/* { sortable ? <Icon size={'1rem'} className={`${sortIconStyles}`}/> : ''} */}
		</div>
	)
}

DataGridHeadCell.propTypes = {
	/** Whether the DataGrid should be sortable by this column */
	// sortable: PropTypes.bool,
	/** Children to render in the DataGridHeadCell */
	children: PropTypes.node,
	/** Add a classname */
	className: PropTypes.string,
}

DataGridHeadCell.defaultProps = {
	// sortable: false,
	className: "",
	children: null,
}