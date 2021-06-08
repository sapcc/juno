import React from "react"
import PropTypes from "prop-types"

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
	name: PropTypes.string,
}

Select.defaultProps = {
	name: null,
}