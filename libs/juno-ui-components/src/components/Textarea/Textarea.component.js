import React from "react"
import PropTypes from "prop-types"

/** A basic, uncontrolled  Textarea */
export const Textarea = ({
	name,
	value,
	autoComplete,
	autoFocus,
	onChange,
	...props
}) => {
	return (
		<textarea
			name={name || "unnamed textarea"}
			defaultValue={value}
			autoComplete={autoComplete}
			autoFocus={autoFocus}
			onChange={onChange}
			{...props}
		>
			
		</textarea>
	)
}

Textarea.propTypes = { 
	/** Pass a name attribute */
	name: PropTypes.string,
	/** Pass a value for initial rendering. Will NOT be updated once user changes! */
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/** Specify whether textarea shoudl autocomplete or not */
	autoComplete: PropTypes.oneOf(['on', 'off']),
	/** Specify whether textarea should autofocus on page load */
	autoFocus: PropTypes.bool,
	/** Pass a handler */
	onChange: PropTypes.func,
}

Textarea.defaultProps = {
	name: null,
	value: null,
	autoComplete: null,
	autoFocus: false,
	onChange: undefined,
}