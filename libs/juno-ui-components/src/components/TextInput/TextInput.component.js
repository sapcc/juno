import React from "react"
import PropTypes from "prop-types"

const textinputstyles = `
	bg-theme-textinput
	text-theme-textinput
	text-base
	leading-4
	p-3
	h-textinput
	border
	border-transparent
	rounded-3px
	focus:outline-none
	focus:border-theme-focus
`

/** A basic, uncontrolled Text Input. Also covers email, telephone, password, url derivates. */
export const TextInput = ({
	name,
	value,
	type,
	className,
	onChange,
	...props
}) => {
	return (
		<input 
			type={type}
			name={name || "unnamed input"}
			defaultValue={value}
			onChange={onChange}
			className={`${textinputstyles} ${className}`}
			{...props}
		/>
	)
}

TextInput.propTypes = { 
	/** Pass a name attribute */
	name: PropTypes.string,
	/** Pass a value for initial rendering. Will NOT be updated with user changes for now! */
	value: PropTypes.string,
	/** Pass a classname */
	className: PropTypes.string,
	/** Pass a handler */
	onChange: PropTypes.func,
	/** Specify the type attribute. Defaults to an input with no type attribute, which in turn will be treateas as type="text" by browsers. */
	type: PropTypes.oneOf(['text', 'email', 'password', 'tel', 'url'])
}

TextInput.defaultProps = {
	value: "",
	className: "",
	onChange: undefined,
	type: null,
}