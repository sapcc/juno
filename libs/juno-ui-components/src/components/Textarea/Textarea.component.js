import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

const textareastyles = `
	jn-bg-theme-textinput
	jn-text-theme-textinput
	jn-text-base
	jn-leading-4
	jn-p-3
	jn-rounded-3px
	jn-h-[14rem]
	jn-border
	focus:jn-outline-none
	focus:jn-ring-2
	focus:jn-ring-theme-focus
	disabled:jn-opacity-50
`

const defaultborderstyles = `
	jn-border-transparent
`

const invalidstyles = `
	jn-border-theme-error
`

const validstyles = `
	jn-border-theme-success
`


/** A controlled Textarea component */
export const Textarea = ({
	name,
	value,
	placeholder,
	className,
	autoComplete,
	autoFocus,
	invalid,
	valid,
	onChange,
	...props
}) => {
	
	const [val, setValue] = useState("")
	const [isInvalid, setIsInvalid] = useState(false)
	const [isValid, setIsValid] = useState(false)
	
	useEffect(() => {
		setValue(value)
	  }, [value])
		
	useEffect(() => {
		setIsInvalid(invalid)
	}, [invalid])
	
	useEffect(() => {
		setIsValid(valid)
	}, [valid])
	  
	const handleInputChange = (event) => {
		setValue(event.target.value)
		onChange && onChange(event)
	 }
	
	return (
		<textarea
			name={name || "unnamed textarea"}
			value={val} 
			autoComplete={autoComplete}
			autoFocus={autoFocus}
			placeholder={placeholder}
			onChange={handleInputChange}
			className={`juno-textarea ${textareastyles} ${ isInvalid ? "juno-textarea-invalid " + invalidstyles : "" } ${ isValid ? "juno-textarea-valid " + validstyles : "" } ${ isInvalid || isValid ? "" : defaultborderstyles } ${className}`}
			{...props}
		/>
	)
}

Textarea.propTypes = { 
	/** Pass a name attribute */
	name: PropTypes.string,
	/** Pass a value */
	value: PropTypes.string,
	/** Pass a placeholder */
	placeholder: PropTypes.string,
	/** Specify whether textarea should autocomplete or not */
	autoComplete: PropTypes.oneOf(['on', 'off']),
	/** Specify whether textarea should autofocus on page load */
	autoFocus: PropTypes.bool,
	/** Whether the input is invalid */
	invalid: PropTypes.bool,
	/** Whether the input is valid */
	valid: PropTypes.bool,
	/** Pass a className */
	className: PropTypes.string,
	/** Pass a handler */
	onChange: PropTypes.func,
}

Textarea.defaultProps = {
	name: null,
	value: "",
	placeholder: "",
	autoComplete: null,
	autoFocus: false,
	invalid: false,
	valid: false,
	className: "",
	onChange: undefined,
}