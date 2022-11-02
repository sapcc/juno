import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

// TODO: disabled styles missing

const inputstyles = `
	jn-w-4
	jn-h-4
	jn-opacity-0
	jn-cursor-pointer
`

const mockcheckboxstyles = `
	jn-w-4
	jn-h-4
	jn-rounded-sm
	jn-bg-theme-checkbox
	jn-cursor-pointer
	jn-relative
	focus:jn-outline-none
	focus:jn-ring-2
	focus:jn-ring-theme-focus
`

const mockfocusstyles = `
	jn-ring-2
	jn-ring-theme-focus
`

const mockcheckmarkstyles = `
	jn-absolute
	jn-top-0
	jn-left-0
	jn-text-theme-checkbox-checked
	jn-fill-current
`


const mockindeterminatestyles = `
	jn-absolute
	jn-w-2
	jn-h-0.5
	jn-top-2
	jn-left-1
	jn-inline-block
	jn-bg-theme-focus
`

const mockdisabledstyles = `
	jn-pointer-events-none
	jn-opacity-50
`

const errorstyles = `
	jn-border
	jn-border-theme-error
`

const validstyles = `
	jn-border
	jn-border-theme-success
`


/** 
A controlled Checkbox component.
*/
export const Checkbox = ({
	name,
	id,
	value,
	checked,
	indeterminate,
	className,
	disabled,
	invalid,
	valid,
	onChange,
	...props
}) => {
	const [isChecked, setIsChecked] = useState(false)
	const [isIndeterminate, setIndeterminate] = useState("")
	const [hasFocus, setFocus] = useState(false)
	const [isInvalid, setIsInvalid] = useState(false)
	const [isValid, setIsValid] = useState(false)
	
	useEffect( () => {
		setIsChecked(checked)
		setIndeterminate(indeterminate)
		setIsInvalid(invalid)
		setIsValid(valid)
	}, [checked, indeterminate, invalid, valid])
	
	
	const handleChange = (event) => {
		setIsChecked(!isChecked)
		onChange(event)
	}
	
	const handleFocus = () => {
		setFocus(true)
	}
	
	const handleBlur = () => {
		setFocus(false)
	}
		
	return (
		<div 
			className={`juno-checkbox ${mockcheckboxstyles} ${ hasFocus ? mockfocusstyles : "" } ${ disabled ? mockdisabledstyles : "" } ${ isInvalid ? errorstyles : "" } ${ isValid ? validstyles : "" } ${className}`}
			{...props}
		>
			{ isChecked ? 	<svg 
				xmlns="http://www.w3.org/2000/svg" 
				className={`${mockcheckmarkstyles}`} 
				width="16" 
				height="16" 
				viewBox="0 0 16 16">
					<polygon points="5.75 11.15 2.6 8 1.55 9.05 5.75 13.25 14.75 4.25 13.7 3.2"/>
				</svg>
			: 
				"" }
			<input
				type="checkbox"
				name={name || "unnamed checkbox"}
				value={value}
				id={id}
				checked={isChecked}
				className={`${inputstyles} ${ isInvalid ? "juno-checkbox-invalid" : ""} ${ isValid ? "juno-checkbox-valid" : ""} `}
				disabled={disabled}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			
			{ isIndeterminate && !isChecked ? <div className={`${mockindeterminatestyles}`}></div>
											: "" }
		</div>
	)
}

Checkbox.propTypes = {
	/** Name attribute */
	name: PropTypes.string,
	/** Id of the checkbox */
	id: PropTypes.string,
	/** Pass a value the checkbox should represent.*/
	value: PropTypes.string,
	/**  Pass checked state  */
	checked: PropTypes.bool,
	/** Whether the checkbox is indeterminate ( parent of multiple checkboxes with differing checked states) */
	indeterminate: PropTypes.bool,
	/** Whether the checkbox is disabled */
	disabled: PropTypes.bool,
	/** Whether the checkbox is invalid */
	invalid: PropTypes.bool,
	/** Whether the Checkbox is valid */
	valid: PropTypes.bool,
	/** Pass a className */
	className: PropTypes.string,
	/** Pass a handler */
	onChange: PropTypes.func,
}

Checkbox.defaultProps = {
	checked: false,
	value: "",
	id: "",
	className: "",
	disabled: false,
	invalid: false,
	valid: false,
	onChange: undefined,
}
