import React from "react"
import PropTypes from "prop-types"

export const DataGridFoot = ({
	className,
	children,
	...props
}) => {
	return (
		<tfoot className={className} {...props}>
			{children}
		</tfoot>
	)
}

DataGridFoot.propTypes = {
	/** Children to render in the DataGridFoot */
	children: PropTypes.node,
	/** Add a classname */
	className: PropTypes.string,
}

DataGridFoot.defaultProps = {
	className: "",
	children: null,
}