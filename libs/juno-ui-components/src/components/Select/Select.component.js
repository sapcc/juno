import React from "react"
import PropTypes from "prop-types"

const selectstyles = `
	bg-theme-select
	text-theme-high
	appearance-none
	text-base
	px-3
	h-11
	border
	border-transparent
	rounded-3px
	bg-icon-arrow-down
	bg-right
	bg-no-repeat
	focus:outline-none
	focus:ring-2
	focus:ring-focus
	disabled:opacity-50
`

/*+ A basic, uncontrolled Select. Takes SelectOption and SelectOptionGroup as children. */
export const Select = ({
	name,
	children,
	className,
	disabled,
	onChange,
	...props
}) => {
	return (
		<select 
			name={name || "unnamed select"}
			className={`select ${selectstyles} ${className}`}
			onChange={onChange}
			disabled={disabled}
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
	/** Disabled the select */
	disabled: PropTypes.bool,
	/** Pass a handler */
	onChange: PropTypes.func,
}

Select.defaultProps = {
	name: null,
	className: "",
	disabled: null,
	onChange: undefined,
}