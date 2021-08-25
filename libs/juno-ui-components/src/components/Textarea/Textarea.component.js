import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

const textareastyles = `
	bg-theme-textinput
	text-theme-textinput
	text-base
	leading-4
	p-3
	rounded-3px
	focus:outline-none
	focus:ring-2
	focus:ring-focus
	disabled:opacity-50
`

/** A controlled  Textarea */
export const Textarea = ({
	name,
	value,
	className,
	autoComplete,
	autoFocus,
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
		<textarea
			name={name || "unnamed textarea"}
			value={val} 
			autoComplete={autoComplete}
			autoFocus={autoFocus}
			onChange={handleInputChange}
			className={`${textareastyles} ${className}`}
			{...props}
		/>
	)
}

Textarea.propTypes = { 
	/** Pass a name attribute */
	name: PropTypes.string,
	/** Pass a value */
	value: PropTypes.string,
	/** Pass a className */
	className: PropTypes.string,
	/** Specify whether textarea shoudl autocomplete or not */
	autoComplete: PropTypes.oneOf(['on', 'off']),
	/** Specify whether textarea should autofocus on page load */
	autoFocus: PropTypes.bool,
	/** Pass a handler */
	onChange: PropTypes.func,
}

Textarea.defaultProps = {
	name: null,
	value: "",
	className: "",
	autoComplete: null,
	autoFocus: false,
	onChange: undefined,
}