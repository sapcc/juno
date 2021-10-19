import React from "react"
import PropTypes from "prop-types"
import { ClickableIcon } from "../ClickableIcon/index.js"

const datagridcellbasestyles = `
	text-left
`

const sorticonstyles = `
	ml-2
`

export const DataGridHeadCell = ({
	sortable,
	className,
	children,
	props
}) => {
	return (
		<th className={`${datagridcellbasestyles} ${className}`} {...props}>
			{children}
			{ sortable ? <ClickableIcon size={'1rem'} className={`${sorticonstyles}`}/> : ''}
		</th>
	)
}

DataGridHeadCell.propTypes = {
	/** Whether the DataGrid should be sortable by this column */
	sortable: PropTypes.bool,
	/** Children to render in the DataGridHeadCell */
	children: PropTypes.node,
	/** Add a classname */
	className: PropTypes.string,
}

DataGridHeadCell.defaultProps = {
	sortable: false,
	className: "",
	children: null,
}