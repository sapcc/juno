import React from "react"
import PropTypes from "prop-types"
import { TextInput } from "../TextInput/index.js"

const textinputgroup = `
	flex
`

const textinputgroupHorizontal = `
	flex-row
`

const textinputgroupVertical = `
	flex-col
`

const layoutClass = (layout) => {
	switch (layout) {
		case "vertical":
			return textinputgroupVertical
		case "horizontal":
			return textinputgroupHorizontal
		default:
			return textinputgroupHorizontal
	}
}

/** A text input group containing an input of type text, password, email, tel, or url, an associated label, and necessary structural markup. */
/* TODO: Get layout prop from parent context */
export const TextInputGroup = ({
	type,
	value,
	layout,
	name,
	label,
	id,
	placeholder,
	helptext,
	...props
}) => {
	return (
		<div 
			className={`${textinputgroup} textinputgroup-${layout} ${layoutClass(layout)}`}
			{...props}
		>
			<div>
				<label htmlFor={id}>{label}</label>
			</div>
			<div>
				<TextInput type={type} name={name} id={id} placeholder={placeholder} />
				{helptext ? <p>{helptext}</p> : ""}
			</div>
		</div>	
	)
}

TextInputGroup.propTypes = { 
	/** The type of the input element to render */
	type: PropTypes.oneOf(["text", "password", "email", "tel", "url"]),
	/** Layout direction */
	layout: PropTypes.oneOf(["horizontal", "vertical"]),
	/** Optional initial value */
	value: PropTypes.string,
	/** Name attribute of the input */
	name: PropTypes.string,
	/** Label text */
	label: PropTypes.string,
	/** Id */
	id: PropTypes.string,
	/** Placeholder for input */
	placeholder: PropTypes.string,
	/** Help text */
	helptext: PropTypes.string,
}

TextInputGroup.defaultProps = {
	type: null,
	layout: null,
	value: null,
	name: null,
	label: null,
	id: null,
	placeholder: null,
	helptext: null,
}