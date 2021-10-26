import React from "react"
import PropTypes from "prop-types"

const datalistrowbasestyles = `
	flex
`

export const DataListRow = ({
	className,
	children,
	...props
}) => {
	return (
		<li className={`datalist-row ${datalistrowbasestyles} ${className}`} {...props} >
			{children}
		</li>
	)
}

DataListRow.propTypes = {
	/** Custom classnamne */
	className: PropTypes.string,
	/** Children to render in the DataList */
	children: PropTypes.node,
}

DataListRow.defaultProps = {
	className: "",
	children: null,
}