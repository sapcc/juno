import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Switch } from "../Switch/index.js"
import { Label } from "../Label/index.js"

const switchrow = `
	flex
	flex-row
	mb-5
`

const helptextstyles = `
	text-xs
	text-theme-disabled
	mt-1
`

/** A checkbox input group containing a checkbox, associated label, and structural markup */
export const SwitchRow =({
	name,
	label,
	id,
	on,
	disabled,
	helptext,
	required,
	className,
	onChange,
	...props
}) => {
	
	const [isOn, setIsOn] = useState(on)
	
	useEffect(() => {
		setIsOn(on)
	  }, [on])
	
	const handleChange = (event) => {
		setIsOn(!isOn)
		onChange(event)
	}
	
	
	return (
		<div
			className={`switch-row ${switchrow} ${className}`}
			{...props}
		>
			<div>
				<Switch 
					name={name} 
					onChange={handleChange} 
					id={id} 
					on={on}
					disabled={disabled} 
				/>
			</div>
			<div>
				<Label text={label} htmlFor={id} required={required} disabled={disabled} />
				{helptext ? <p className={`${helptextstyles}`}>{helptext}</p> : ""}
			</div>
		</div>
	)
}

SwitchRow.propTypes = {
	/** Name attribute of the checkbox element */
	name: PropTypes.string,
	/** Label text */
	label: PropTypes.string,
	/** Id */
	id: PropTypes.string,
	/** Whether the Switch inside the row is on */
	on: PropTypes.bool,
	/** Disabled */
	disabled: PropTypes.bool,
	/** Help text */
	helptext: PropTypes.string,
	/** Specify whether the Switch is required */
	required: PropTypes.bool,
	/** Pass a className */
	className: PropTypes.string,
	/** Pass a handler to the checkbox element */
	onChange: PropTypes.func,
}

SwitchRow.defaultProps = {
	name: null,
	label: null,
	id: null,
	on: false,
	disabled: null,
	helptext: null,
	required: null,
	className: "",
	onChange: undefined,
}

