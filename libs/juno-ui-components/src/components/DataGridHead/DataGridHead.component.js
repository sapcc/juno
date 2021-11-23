import React from "react"
import PropTypes from "prop-types"

export const DataGridHead = ({
	className,
	children,
	...props
}) => {
	return (
		<thead className={`juno-datagrid-head ${className}`} {...props}>
			{children}
		</thead>
	)
}

DataGridHead.propTypes = {
	/** Children to render in the DataGridHead */
	children: PropTypes.node,
	/** Add a classname */
	className: PropTypes.string,
}

DataGridHead.defaultProps = {
	className: "",
	children: null,
}