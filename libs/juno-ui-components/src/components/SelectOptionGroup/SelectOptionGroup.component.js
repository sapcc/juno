import React from "react"
import PropTypes from "prop-types"

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
	label: PropTypes.string,
}

SelectOptionGroup.defaultProps = {
	label: null,
}
