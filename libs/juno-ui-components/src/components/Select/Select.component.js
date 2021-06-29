import React from "react"
import PropTypes from "prop-types"

/*+ A basic, uncontrolled Select. Takes SelectOption and SelectOptionGroup as children. */
export const Select = ({
	name,
	children,
	onChange,
	...props
}) => {
	return (
		<select 
			name={name || "unnamed select"}
			onChange={onChange}
			{...props}
		>
		{children}
		</select>
	)
}

Select.propTypes = {
	/** Pass a name. */
	name: PropTypes.string,
	/** Pass SelectOption and SelectOptionGroup as children. */
	children: PropTypes.node,
	/** Pass a handler */
	onChange: PropTypes.func,
}

Select.defaultProps = {
	name: null,
	onChange: undefined,
}