import React from "react"
import PropTypes from "prop-types"

const cellBaseStyles = `
	jn-px-5
	jn-py-3
	jn-border-b
	jn-border-theme-background-lvl-2
`

export const DataGridCell = ({
	className,
	children,
	...props
}) => {
	return (
		<div className={`juno-datagrid-cell ${cellBaseStyles} ${className}`} {...props}>
			{children}
		</div>
	)
}

DataGridCell.propTypes = {
	/** Children to render in the DataGridCell */
	children: PropTypes.node,
	/** Add a classname */
	className: PropTypes.string,
}

DataGridCell.defaultProps = {
	className: "",
	children: null,
}