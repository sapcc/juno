import React from "react"
import PropTypes from "prop-types"

/** A basic, uncontrolled Text Input. Also covers email, telephone, password, url derivates. */
export const TextInput = ({
	name,
	value,
	type,
	onChange,
	...props
}) => {
	return (
		<input 
			type={type}
			name={name || "unnamed input"}
			defaultValue={value}
			onChange={onChange}
			{...props}
		/>
	)
}

TextInput.propTypes = { 
	/** Pass a name attribute */
	name: PropTypes.string,
	/** Pass a value for initial rendering. Will NOT be updated with user changes for now! */
	value: PropTypes.string,
	/** Pass a handler */
	onChange: PropTypes.func,
	/** Specify the type attribute. Defaults to an input with no type attribute, which in turn will be treateas as type="text" by browsers. */
	type: PropTypes.oneOf(['text', 'email', 'password', 'tel', 'url'])
}

TextInput.defaultProps = {
	value: "",
	onChange: undefined,
	type: null,
}