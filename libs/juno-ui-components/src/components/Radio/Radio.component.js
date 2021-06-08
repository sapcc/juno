import React from "react"
import PropTypes from "prop-types"

export const Radio = ({
	name,
	value,
	checked,
	onChange,
	...props
}) => {
	return (
		<input 
			type="radio"
			name={name || "unnamed radio"}
			value={value}
			defaultChecked={checked}
			onChange={onChange}
			{...props}
		/>
	)
}

Radio.propTypes = { 
	name: PropTypes.string,
	value: PropTypes.string,
	checked: PropTypes.bool,
	onChange: PropTypes.func,
}

Radio.defaultProps = {
	checked: null,
	value: "",
	onChange: undefined,
}