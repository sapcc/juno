import React from "react"
import PropTypes from "prop-types"
import { Checkbox } from "../Checkbox/index.js"
import { Label } from "../Label/index.js" 

const checkboxrow = `
	flex
	flex-row
`

const helptextstyles = `
	text-xs
	text-theme-disabled
	mt-1
`


/** A checkbox input group containing a checkbox, associated label, and structural markup */
export const CheckboxRow =({
	value,
	name,
	label,
	id,
	helptext,
	required,
	className,
	onChange,
	...props
}) => {
	return (
		<div
			className={`${checkboxrow}`}
			{...props}
		>
			<div>
				<Checkbox name={name} onChange={onChange} id={id} value={value || ""} className={className} />
			</div>
			<div>
				<Label text={label} htmlFor={id} required={required} />
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
	/** Specify whether the checkbox is required */
	required: PropTypes.bool,
	/** Pass a custom className */
	className: PropTypes.string,
	/** Pass a handler to the checkbox element */
	onChange: PropTypes.func,
}

CheckboxRow.defaultProps = {
	value: null,
	name: null,
	label: null,
	id: null,
	helptext: null,
	required: null,
	onChange: undefined,
	className: "",
}

