import React from "react"
import PropTypes from "prop-types"

/** A SelectOptionGroup (<optgroup>). Can only be used inside a Select. */
export const SelectOptionGroup = ({
	label,
	disabled,
	className,
	children,
	...props
}) => {
	return (
		<optgroup 
			label={label}
			disabled={disabled}
			className={`juno-select-option-group ${className}`}
			{...props}
		>
			{children}
		</optgroup>
	)
}

SelectOptionGroup.propTypes = {
	/** The visible label of the group of options */
	label: PropTypes.string,
	/** Disable the option group */
	disabled: PropTypes.bool,
	/** Add a className */
	className: PropTypes.string,
	/** Pass SelectOption child nodes */
	children: PropTypes.node,
}

SelectOptionGroup.defaultProps = {
	label: null,
	disabled: false,
	className: "",
}
