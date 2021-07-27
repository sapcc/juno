import React from "react"
import PropTypes from "prop-types"
import { Textarea } from "../Textarea/index.js"
import { Label } from "../Label/index.js"


const textarearow = `
	flex
	flex-col
`

const helptextstyles = `
	text-xs
	text-theme-disabled
`

/** A textarea group containing a textarea, associated label, optional helptext, and structural markup */

export const TextareaRow = ({
	value,
	name,
	label,
	id,
	placeholder,
	helptext,
	className,
	onChange,
	...props
}) => {
	return (
		<div
			className={`textarea-row ${textarearow}`}
			{...props}
		>
			<div>
				<Label text={label} htmlFor={id} />
			</div>
			<div>
				<Textarea name={name} onChange={onChange} id={id} value={value} placeholder={placeholder} className={className} />
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
	/** Pass a classnName to the Textarea */
	className: PropTypes.string,
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
	className: "",
	onChange: undefined,
}
