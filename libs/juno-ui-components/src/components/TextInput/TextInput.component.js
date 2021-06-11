import React from "react"
import PropTypes from "prop-types"

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
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	type: PropTypes.oneOf(['text', 'email', 'password', 'tel', 'url'])
}

TextInput.defaultProps = {
	value: "",
	onChange: undefined,
	type: null,
}