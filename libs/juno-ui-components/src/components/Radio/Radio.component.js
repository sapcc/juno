import React from "react"
import PropTypes from "prop-types"

/** A very basic, for the time being uncontrolled Radio. */
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
	/** Name attribute. Radios with the same name will work together as mutually exclusive options. */
	name: PropTypes.string,
	/** Pass a value the radio should represent.*/
	value: PropTypes.string,
	/**  Pass checked state for initial rendering. Will NOT be updated once user changes the state of the radio for now! */
	checked: PropTypes.bool,
	/** Pass a handler */
	onChange: PropTypes.func,
}

Radio.defaultProps = {
	checked: null,
	value: "",
	onChange: undefined,
}