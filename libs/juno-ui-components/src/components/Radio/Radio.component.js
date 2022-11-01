import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

const inputstyles = `
	jn-w-4
	jn-h-4
	jn-opacity-0
	jn-z-50
`

const checkedstyles = `
	jn-inline-block
	jn-absolute
	jn-bg-theme-radio-checked
	jn-rounded-full
	jn-w-3
	jn-h-3
	jn-top-0.5
	jn-left-0.5
`

const mockradiostyles = `
	jn-w-4
	jn-h-4
	jn-rounded-full
	jn-bg-theme-radio
	jn-relative
`

const mockfocusradiostyles = `
	jn-outline-none
	jn-ring-2
	jn-ring-theme-focus
`

const mockdisabledradiostyles = `
	jn-opacity-50
	jn-cursor-not-allowed
`

const errorstyles = `
	jn-border
	jn-border-theme-error
`


/** A controlled Radio component, label not included. */
export const Radio = ({
	name,
	id,
	value,
	checked,
	className,
	disabled,
	invalid,
	onChange,
	...props
}) => {
	const [isChecked, setIsChecked] = useState(false)
	const [hasFocus, setHasFocus] = useState(false)
	const [isInvalid, setIsInvalid] = useState(false)
	
	useEffect( () => {
		setIsChecked(checked)
	}, [checked])
	
	useEffect(() => {
		setIsInvalid(invalid)
	}, [invalid])
	
	const handleChange = (event) => {
		setIsChecked(!isChecked)
		onChange(event)
	}
	
	const handleFocus = () => {
		setHasFocus(true)
	}
	
	const handleBlur = () => {
		setHasFocus(false)
	}
	
	return (
		<div
			className={`juno-radio ${mockradiostyles} ${ hasFocus ? mockfocusradiostyles : "" } ${ disabled ? mockdisabledradiostyles : "" } ${ isInvalid ? errorstyles : "" } ${className}`}
			{...props}
		>
			<input 
				type="radio"
				name={name || "unnamed radio"}
				value={value}
				id={id}
				checked={isChecked}
				className={`${inputstyles} ${isInvalid ? "juno-radio-invalid" : ""}`}
				disabled={disabled}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			{ isChecked ? 
				<span className={`${checkedstyles}`}></span>
			:
				""
			}
		</div>
	)
}

Radio.propTypes = {
	/** Name attribute */
	name: PropTypes.string,
	/** Id of the checkbox */
	id: PropTypes.string,
	/** Pass a value the checkbox should represent.*/
	value: PropTypes.string,
	/**  Pass checked state  */
	checked: PropTypes.bool,
	/** Pass a className */
	className: PropTypes.string,
	/** Whether the checkbox is disabled */
	disabled: PropTypes.bool,
	/** Whether the Radio is invalid */
	invalid: PropTypes.bool,
	/** Pass a handler */
	onChange: PropTypes.func,
}

Radio.defaultProps = {
	checked: false,
	value: "",
	id: "",
	className: "",
	disabled: false,
	invalid: false,
	onChange: undefined,
}
