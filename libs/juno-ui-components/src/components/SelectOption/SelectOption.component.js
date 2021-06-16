import React from "react"
import PropTypes from "prop-types"

/** A basic SelectOption. Can only be used inside a Select. */
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
	/** Pass a visible label */
	label: PropTypes.string,
	/** Pass a value the option shoudl represent */
	value: PropTypes.string,
}

SelectOption.defaultProps = {
	value: null,
	label: null,
}
