import React from "react"
import PropTypes from "prop-types"

export const Checkbox = ({
	name,
	value,
	checked,
	onChange,
	...props
}) => {
	return (
		<input 
			type="checkbox"
			name={name || "unnamed checkbox"}
			value={value}
			defaultChecked={checked}
			onChange={onChange}
			{...props}
		/>
	)
}

Checkbox.propTypes = { 
	name: PropTypes.string,
	value: PropTypes.string,
	checked: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf([ 'multiple' ])
	]),
	onChange: PropTypes.func,
}

Checkbox.defaultProps = {
	checked: null,
	value: "",
	onChange: undefined,
}