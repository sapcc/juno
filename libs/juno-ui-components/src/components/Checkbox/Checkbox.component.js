import React from "react"
import PropTypes from "prop-types"

/** A very basic, for the time being uncontrolled Checkbox. */
export const Checkbox = ({
	name,
	value,
	checked,
	className,
	onChange,
	...props
}) => {
	return (
		<input 
			type="checkbox"
			name={name || "unnamed checkbox"}
			value={value}
			className={className}
			defaultChecked={checked}
			onChange={onChange}
			{...props}
		/>
	)
}

Checkbox.propTypes = { 
	/** Name attribute */
	name: PropTypes.string,
	/** Pass a value the checkbox should represent.*/
	value: PropTypes.string,
	/**  Pass checked state for initial rendering. Will NOT be updated once user changes the state of the checkbox for now! */
	checked: PropTypes.bool,
	/** Pass a className */
	className: PropTypes.string,
	/** Pass a handler */
	onChange: PropTypes.func,
}

Checkbox.defaultProps = {
	checked: null,
	value: "",
	className: "",
	onChange: undefined,
}