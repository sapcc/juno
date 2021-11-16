import React from "react"
import PropTypes from "prop-types"

/** A basic SelectOption. Can only be used inside a Select. */
export const SelectOption = ({
	value,
	label,
	disabled,
	className,
	...props
	}) => {
	return (
		<option 
			value={value}
			disabled={disabled}
			className={className}
			{...props}
		>
		{label}
		</option>
	)
}

SelectOption.propTypes = {
	/** Pass a visible label */
	label: PropTypes.string,
	/** Pass a value the option should represent */
	value: PropTypes.string,
	/** Whether the option is disabled */
	disabled: PropTypes.bool,
	/** Add a class name to the option */
	className: PropTypes.string,
}

SelectOption.defaultProps = {
	value: null,
	label: null,
	disabled: false,
	className: null,
}
