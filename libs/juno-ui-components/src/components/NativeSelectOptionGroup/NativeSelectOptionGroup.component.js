import React from "react"
import PropTypes from "prop-types"

/** A SelectOptionGroup (<optgroup>). Can only be used inside a Select. */
export const NativeSelectOptionGroup = ({
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

NativeSelectOptionGroup.propTypes = {
	/** The visible label of the group of options */
	label: PropTypes.string,
	/** Disable the option group */
	disabled: PropTypes.bool,
	/** Add a className */
	className: PropTypes.string,
	/** Pass SelectOption child nodes */
	children: PropTypes.node,
}

NativeSelectOptionGroup.defaultProps = {
	label: null,
	disabled: false,
	className: "",
}
