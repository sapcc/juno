import React from "react"
import PropTypes from "prop-types"

export const DataListCell = ({
	className,
	children,
	...props
}) => {
	return (
		<div className={`datalist-cell ${className}`} {...props} >
			{children}
		</div>
	)
}

DataListCell.propTypes = {
	/** Custom classnamne */
	className: PropTypes.string,
	/** Children to render in the DataList */
	children: PropTypes.node,
}

DataListCell.defaultProps = {
	className: "",
	children: null,
}