import React from "react"
import PropTypes from "prop-types"

const datalistrowbasestyles = `
	flex
	rounded-[3px]
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
	/** Custom classname */
	className: PropTypes.string,
	/** Children to render in the DataListRow */
	children: PropTypes.node,
}

DataListRow.defaultProps = {
	className: "",
	children: null,
}