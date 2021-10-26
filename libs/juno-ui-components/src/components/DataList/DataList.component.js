import React from "react"
import PropTypes from "prop-types"

export const DataList = ({
	className,
	children,
	...props
}) => {
	return (
		<ul className={`datalist ${className}`} {...props} >
			{children}
		</ul>
	)
}

DataList.propTypes = {
	/** Custom classnamne */
	className: PropTypes.string,
	/** Children to render in the DataList */
	children: PropTypes.node,
}

DataList.defaultProps = {
	className: "",
	children: null,
}