import React from "react"
import PropTypes from "prop-types"

/*+ A basic, uncontrolled Select. Takes SelectOption and SelectOptionGroup as children. */
export const Select = ({
	name,
	children,
	...props
}) => {
	return (
		<select 
			name={name || "unnamed select"}
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
}

Select.defaultProps = {
	name: null,
}