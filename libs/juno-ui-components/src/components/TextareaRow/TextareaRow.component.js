import React from "react"
import PropTypes from "prop-types"
import { Textarea } from "../Textarea/index.js"


const textarearow = `
	flex
	flex-col
`

const helptextstyles = `
	text-xs
	text-theme-disabled
`

const labelstyles = `
	text-sm
	text-theme-high
`

/** A textarea group containing a textarea, associated label, optional helptext, and structural markup */

export const TextareaRow = ({
	value,
	name,
	label,
	id,
	placeholder,
	helptext,
	onChange,
	...props
}) => {
	return (
		<div
			className={`textarea-row ${textarearow}`}
			{...props}
		>
			<div>
				<label  className={`${labelstyles}`} htmlFor={id}>{label}</label>
			</div>
			<div>
				<Textarea name={name} onChange={onChange} id={id} value={value} placeholder={placeholder} />
				{helptext ? <p className={`${helptextstyles}`}>{helptext}</p> : ""}
			</div>
		</div>
	)
}

TextareaRow.propTypes = {
	/** Optional initial value */
	value: PropTypes.string,
	/** Name attribute of the textarea element */
	name: PropTypes.string,
	/** Label text */
	label: PropTypes.string,
	/** Id */
	id: PropTypes.string,
	/** Help text */
	helptext: PropTypes.string,
	/** Placeholder */
	placeholder: PropTypes.string,
	/** Pass a handler to the checkbox element */
	onChange: PropTypes.func,
}

TextareaRow.defaultProps = {
	value: null,
	name: null,
	label: null,
	id: null,
	placeholder: null,
	helptext: null,
	onChange: undefined,
}
