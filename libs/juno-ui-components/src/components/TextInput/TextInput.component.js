import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

const textinputstyles = `
	bg-theme-textinput
	text-theme-textinput
	text-base
	leading-4
	p-3
	pt-3.5
	h-textinput
	border
	border-transparent
	rounded-3px
	focus:outline-none
	focus:border-theme-focus
`

/** A controlled Text Input. Also covers email, telephone, password, url derivates. */
export const TextInput = ({
	name,
	value,
	type,
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
			value={val} // TODO: use value in a controlled component
			onChange={handleInputChange}
			className={`${textinputstyles} ${className}`}
			{...props}
		/>
	)
}

TextInput.propTypes = { 
	/** Pass a name attribute */
	name: PropTypes.string,
	/** Pass a value */
	value: PropTypes.string,
	/** Pass a classname */
	className: PropTypes.string,
	/** Pass a valid autocomplete value. We do not police validity. */
	autoComplete: PropTypes.string,
	/** Pass a handler */
	onChange: PropTypes.func,
	/** Specify the type attribute. Defaults to an input with no type attribute, which in turn will be treateas as type="text" by browsers. */
	type: PropTypes.oneOf(['text', 'email', 'password', 'tel', 'url'])
}

TextInput.defaultProps = {
	value: "",
	className: "",
	autoComplete: "off",
	onChange: undefined,
	type: null,
}