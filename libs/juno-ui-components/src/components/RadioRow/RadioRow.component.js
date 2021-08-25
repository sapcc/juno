import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Radio } from "../Radio/index.js"
import { Label } from "../Label/index.js"

const radiorow = `
	flex
	flex-row
`

const helptextstyles = `
	text-xs
	text-theme-disabled
	mt-1
`

/** A controlled radio row containing a radio, associated label, and structural markup */
export const RadioRow =({
	value,
	name,
	checked,
	label,
	id,
	helptext,
	className,
	disabled,
	onChange,
	...props
}) => {
	const [isChecked, setIsChecked] = useState(false)
	
	useEffect(() => {
		setIsChecked(checked)
	}, [checked])
	
	const handleChange = (event) => {
		setIsChecked(!isChecked)
		onChange()
	}
	
	return (
		<div
			className={`radio-row ${radiorow}`}
			{...props}
		>
			<div>
				<Radio name={name} checked={isChecked} onChange={onChange} id={id} value={value || ""} disabled={disabled} className={className} />
			</div>
			<div>
				<Label text={label} htmlFor={id} disabled={disabled} />
				{helptext ? <p className={`${helptextstyles}`}>{helptext}</p> : ""}
			</div>
		</div>
	)
}

RadioRow.propTypes = {
	/** Optional initial value */
	value: PropTypes.string,
	/**  Pass checked state  */
	checked: PropTypes.bool,
	/** Name attribute of the checkbox element */
	name: PropTypes.string,
	/** Label text */
	label: PropTypes.string,
	/** Id */
	id: PropTypes.string,
	/** Help text */
	helptext: PropTypes.string,
	/** Pass a className */
	className: PropTypes.string,
	/** Pass to disable the checkbox */
	disabled: PropTypes.bool,
	/** Pass a handler to the checkbox element */
	onChange: PropTypes.func,
}

RadioRow.defaultProps = {
	value: null,
	checked: false,
	name: null,
	label: null,
	id: null,
	helptext: null,
	className: "",
	disabled: false,
	onChange: undefined,
}

