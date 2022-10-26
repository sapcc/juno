import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index"

const textinputstyles = `
	jn-bg-theme-textinput
	jn-text-theme-textinput
	jn-text-base
	jn-leading-4
	jn-p-4
	jn-h-textinput
	jn-border
	jn-border-transparent
	jn-rounded-3px
	focus:jn-outline-none
	focus:jn-ring-2
	focus:jn-ring-theme-focus
	disabled:jn-opacity-50
`

const invalidstyles = `
	jn-border-theme-error
`

/** 
A controlled Text Input.
Also covers email, telephone, password, url derivates. 
*/
export const TextInput = ({
	name,
	value,
	id,
	type,
	placeholder,
	disabled,
	readOnly,
	invalid,
	autoFocus,
	className,
	autoComplete,
	onChange,
	...props
}) => {
	
	const [val, setValue] = useState("")
	const [isInvalid, setIsInvalid] = useState(false)
	
	useEffect(() => {
		setValue(value)
	  }, [value])
		
	useEffect(() => {
		setIsInvalid(invalid)
	}, [invalid])
	  
	const handleInputChange = (event) => {
		setValue(event.target.value)
		onChange(event)
	 }
	
	return (
		<input 
			type={type}
			name={name || "unnamed input"}
			autoComplete={autoComplete}
			value={val} 
			id={id}
			placeholder={placeholder}
			disabled={disabled}
			readOnly={readOnly}
			autoFocus={autoFocus}
			onChange={handleInputChange}
			className={`juno-textinput ${textinputstyles} ${ isInvalid ? "juno-textinput-invalid " + invalidstyles : "" } ${className}`}
			{...props}
		/>
	)
}

TextInput.propTypes = { 
	/** Pass a name attribute */
	name: PropTypes.string,
	/** Pass a value */
	value: PropTypes.string,
	/** Pass an id */
	id: PropTypes.string,
	/** Pass a placeholder */
	placeholder: PropTypes.string,
	/** Render a disabled input */
	disabled: PropTypes.bool,
	/** Render a readonly input */
	readOnly: PropTypes.bool,
	/** Whether the field is invalid */
	invalid: PropTypes.bool,
	/** Whether the field receives autofocus */
	autoFocus: PropTypes.bool,
	/** Pass a classname */
	className: PropTypes.string,
	/** Pass a valid autocomplete value. We do not police validity. */
	autoComplete: PropTypes.string,
	/** Pass a handler */
	onChange: PropTypes.func,
	/** Specify the type attribute. Defaults to an input with no type attribute, which in turn will be treateas as type="text" by browsers. */
	type: PropTypes.oneOf(['text', 'email', 'password', 'tel', 'url', 'number'])
}

TextInput.defaultProps = {
	value: "",
	id: "",
	placeholder: "",
	disabled: false,
	readOnly: false,
	invalid: false,
	autoFocus: false,
	className: "",
	autoComplete: "off",
	onChange: undefined,
	type: null,
}