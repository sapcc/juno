import React from "react"
import PropTypes from "prop-types"
import { Checkbox } from "../Checkbox/index.js"

const checkboxrow = `
	flex
	flex-row
`

const helptextstyles = `
	text-xs
	text-theme-disabled
`

const labelstyles = `
	text-sm
	text-theme-high
`

/** A checkbox input group containing a checkbox, associated label, and structural markup */
export const CheckboxRow =({
	value,
	name,
	label,
	id,
	helptext,
	onChange,
	...props
}) => {
	return (
		<div
			className={`${checkboxrow}`}
			{...props}
		>
			<div>
				<Checkbox name={name} onChange={onChange} id={id} value={value || ""} />
			</div>
			<div>
				<label  className={`${labelstyles}`} htmlFor={id}>{label}</label>
				{helptext ? <p className={`${helptextstyles}`}>{helptext}</p> : ""}
			</div>
		</div>
	)
}

CheckboxRow.propTypes = {
	/** Optional initial value */
	value: PropTypes.string,
	/** Name attribute of the checkbox element */
	name: PropTypes.string,
	/** Label text */
	label: PropTypes.string,
	/** Id */
	id: PropTypes.string,
	/** Help text */
	helptext: PropTypes.string,
	/** Pass a handler to the checkbox element */
	onChange: PropTypes.func,
}

CheckboxRow.defaultProps = {
	value: null,
	name: null,
	label: null,
	id: null,
	helptext: null,
	onChange: undefined,
}

