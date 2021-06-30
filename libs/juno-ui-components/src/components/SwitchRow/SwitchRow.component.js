import React from "react"
import PropTypes from "prop-types"
import { Switch } from "../Switch/index.js"

const switchrow = `
	flex
	flex-row
`

/** A checkbox input group containing a checkbox, associated label, and structural markup */
export const SwitchRow =({
	value,
	name,
	label,
	id,
	disabled,
	helptext,
	onChange,
	...props
}) => {

	return (
		<div
			className={`${switchrow}`}
			{...props}
		>
			<div>
				<Switch name={name} onChange={onChange} id={id} value={value || ""} disabled={disabled} />
			</div>
			<div>
				<label htmlFor={id}>{label}</label>
				{helptext ? <p>{helptext}</p> : ""}
			</div>
		</div>
	)
}

SwitchRow.propTypes = {
	/** Optional initial value */
	value: PropTypes.string,
	/** Name attribute of the checkbox element */
	name: PropTypes.string,
	/** Label text */
	label: PropTypes.string,
	/** Id */
	id: PropTypes.string,
	/** Disabled */
	disabled: PropTypes.bool,
	/** Help text */
	helptext: PropTypes.string,
	/** Pass a handler to the checkbox element */
	onChange: PropTypes.func,
}

SwitchRow.defaultProps = {
	value: null,
	name: null,
	label: null,
	id: null,
	disabled: null,
	helptext: null,
	onChange: undefined,
}

