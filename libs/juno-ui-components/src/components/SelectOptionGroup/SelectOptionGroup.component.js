import React from "react"
import PropTypes from "prop-types"

/** A SelectOptionGroup (<optgroup>). Can only be used inside a Select. */
export const SelectOptionGroup = ({
	label,
	children,
	...props
}) => {
	return (
		<optgroup 
			label={label}
			{...props}
		>
			{children}
		</optgroup>
	)
}

SelectOptionGroup.propTypes = {
	/** The visible label of the group of options */
	label: PropTypes.string,
	/** Pass SelectOption child nodes */
	children: PropTypes.node,
}

SelectOptionGroup.defaultProps = {
	label: null,
}
