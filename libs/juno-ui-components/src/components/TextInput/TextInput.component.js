import React from "react"
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

/** A basic, uncontrolled Text Input. Also covers email, telephone, password, url derivates. */
export const TextInput = ({
	name,
	value,
	type,
	className,
	autoComplete,
	onChange,
	...props
}) => {
	return (
		<input 
			type={type}
			name={name || "unnamed input"}
			autoComplete={autoComplete}
			defaultValue={value} // TODO: use value in a controlled component
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