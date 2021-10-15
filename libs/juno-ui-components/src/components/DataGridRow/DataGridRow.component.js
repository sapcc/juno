import React from "react"
import PropTypes from "prop-types"

export const DataGridRow = ({
	className,
	children,
	props
}) => {
	return (
		<tr className={className} {...props}>
			{children}
		</tr>
	)
}

DataGridRow.propTypes = {
	/** Children to render in the DataGridRow */
	children: PropTypes.node,
	/** Add a classname */
	className: PropTypes.string,
}

DataGridRow.defaultProps = {
	className: "",
	children: null,
}