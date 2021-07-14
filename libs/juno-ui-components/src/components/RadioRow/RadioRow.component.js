import React from "react"
import PropTypes from "prop-types"
import { Radio } from "../Radio/index.js"

const radiorow = `
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

/** A radio input row containing a radio, associated label, and structural markup */
export const RadioRow =({
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
			className={`radio-row ${radiorow}`}
			{...props}
		>
			<div>
				<Radio name={name} onChange={onChange} id={id} value={value || ""} />
			</div>
			<div>
				<label className={`${labelstyles}`} htmlFor={id}>{label}</label>
				{helptext ? <p className={`${helptextstyles}`}>{helptext}</p> : ""}
			</div>
		</div>
	)
}

RadioRow.propTypes = {
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

RadioRow.defaultProps = {
	value: null,
	name: null,
	label: null,
	id: null,
	helptext: null,
	onChange: undefined,
}

