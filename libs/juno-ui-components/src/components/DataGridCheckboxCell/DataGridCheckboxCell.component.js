import React from "react"
import PropTypes from "prop-types"
import { Checkbox } from "../Checkbox/Checkbox.component.js"
import { DataGridCell } from "../DataGridCell/DataGridCell.component.js"

export const DataGridCheckboxCell = ({
	disabled,
	className,
	props
}) => {
	return (
		<DataGridCell className={className}>
			<Checkbox disabled={disabled}/>
		</DataGridCell>
	)
}

DataGridCheckboxCell.propTypes = {
	/** Whether the item is disabled */
	disabled: PropTypes.bool,
	/** Add a classname to the cell */
	className: PropTypes.string,
}

DataGridCheckboxCell.defaultProps = {
	disabled: false,
	className: ""
}