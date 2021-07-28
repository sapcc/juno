import React from "react"
import PropTypes from "prop-types"

/*+ A basic, uncontrolled Select. Takes SelectOption and SelectOptionGroup as children. */
export const Select = ({
	name,
	children,
	className,
	onChange,
	...props
}) => {
	return (
		<select 
			name={name || "unnamed select"}
			className={className}
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
	/** Pass a classname */
	className: PropTypes.string,
	/** Pass SelectOption and SelectOptionGroup as children. */
	children: PropTypes.node,
	/** Pass a handler */
	onChange: PropTypes.func,
}

Select.defaultProps = {
	name: null,
	className: "",
	onChange: undefined,
}