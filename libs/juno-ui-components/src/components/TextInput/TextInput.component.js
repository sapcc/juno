import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

const textinputstyles = `
	bg-theme-textinput
	text-theme-textinput
	text-base
	leading-4
	p-4
	h-textinput
	border
	border-transparent
	rounded-3px
	focus:outline-none
	focus:ring-2
	focus:ring-theme-focus
	disabled:opacity-50
`

/** A controlled Text Input. Also covers email, telephone, password, url derivates. */
export const TextInput = ({
	name,
	value,
	id,
	type,
	placeholder,
	disabled,
	readOnly,
	className,
	autoComplete,
	onChange,
	...props
}) => {
	
	const [val, setValue] = useState("")
	
	useEffect(() => {
		setValue(value)
	  }, [value])
	  
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
			onChange={handleInputChange}
			className={`juno-textinput ${textinputstyles} ${className}`}
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
	className: "",
	autoComplete: "off",
	onChange: undefined,
	type: null,
}