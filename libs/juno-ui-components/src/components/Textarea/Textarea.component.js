import React from "react"
import PropTypes from "prop-types"

export const Textarea = ({
	name,
	value,
	rows,
	cols,
	placeholder,
	autocomplete,
	autofocus,
	readonly,
	minlength,
	maxlength,
	...props
}) => {
	return (
		<textarea
			name={name || "unnamed textarea"}
			defaultValue={value}
			rows={rows}
			cols={cols}
			placeholder={placeholder}
			autoFocus={autofocus}
			readOnly={readonly}
			minLength={minlength}
			maxLength={maxlength}
			{...props}
		>
			
		</textarea>
	)
}

Textarea.propTypes = { 
	name: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	placeholder: PropTypes.string,
	cols: PropTypes.number,
	rows: PropTypes.number,
	autocomplete: PropTypes.oneOf(['on', 'off']),
	autofocus: PropTypes.bool,
	readonly: PropTypes.bool,
	minlength: PropTypes.number,
	maxlength: PropTypes.number,
}

Textarea.defaultProps = {
	value: null,
	placeholder: null,
	cols: null,
	rows: null,
	autocomplete: null,
	autofocus: null,
	readonly: null,
	minlength: null,
	maxlength: null,
}