import React from "react"
import PropTypes from "prop-types"

export const Textarea = ({
	name,
	value,
	autoComplete,
	autoFocus,
	...props
}) => {
	return (
		<textarea
			name={name || "unnamed textarea"}
			defaultValue={value}
			autoComplete={autoComplete}
			autoFocus={autoFocus}
			{...props}
		>
			
		</textarea>
	)
}

Textarea.propTypes = { 
	name: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	autoComplete: PropTypes.oneOf(['on', 'off']),
	autoFocus: PropTypes.bool,
}

Textarea.defaultProps = {
	name: null,
	value: null,
	autoComplete: null,
	autoFocus: false,
}