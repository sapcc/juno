import React from "react"
import PropTypes from "prop-types"

export const SelectOption = ({
	value,
	label,
	...props
	}) => {
	return (
		<option 
			value={value}
			{...props}
		>
		{label}
		</option>
	)
}

SelectOption.propTypes = {
	value: PropTypes.string,
	label: PropTypes.string,
}

SelectOption.defaultProps = {
	value: null,
	label: null,
}
