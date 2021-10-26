import React from "react"
import PropTypes from "prop-types"
import { Checkbox } from "../Checkbox/Checkbox.component.js"
import { DataGridCell } from "../DataGridCell/DataGridCell.component.js"

export const DataGridCheckboxCell = ({
	selected,
	disabled,
	className,
	onChange,
	...props
}) => {
	return (
		<DataGridCell className={className} {...props}>
			<Checkbox disabled={disabled} checked={selected} onChange={onChange} />
		</DataGridCell>
	)
}

DataGridCheckboxCell.propTypes = {
	/** Whether the row this cell belongs to is selected */
	selected: PropTypes.bool,
	/** Whether the item is disabled */
	disabled: PropTypes.bool,
	/** Add a classname to the cell */
	className: PropTypes.string,
	/** Handler to change the selected state of the row */
	onChange: PropTypes.func,
}

DataGridCheckboxCell.defaultProps = {
	selected: false,
	disabled: false,
	className: "",
	onChange: undefined,
}