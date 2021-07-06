import React from "react"
import PropTypes from "prop-types"
import { TextInput } from "../TextInput/index.js"
import uselayoutDirection from "../../lib/hooks/useLayoutDirection"


const textinputrow = `
	flex
`

const textinputrowHorizontal = `
	flex-row
`

const textinputrowVertical = `
	flex-col
`

const layoutClass = (layoutDirection) => {
	switch (layoutDirection) {
		case "vertical":
			return textinputrowVertical
		case "horizontal":
			return textinputrowHorizontal
		default:
			return textinputrowHorizontal
	}
}

/** A text input group containing an input of type text, password, email, tel, or url, an associated label, and necessary structural markup. */
export const TextInputRow = ({
	type,
	value,
	layout,
	name,
	label,
	id,
	placeholder,
	helptext,
	onChange,
	...props
}) => {
	/* 
	Determine layout direction using custom hook:
	*/	
	const layoutDirection = uselayoutDirection(layout)	
	return (
		<div 
			className={`${textinputrow} textinputrow-${layoutDirection} ${layoutClass(layoutDirection)}`}
			{...props}
		>
			<div>
				<label htmlFor={id}>{label}</label>
			</div>
			<div>
				<TextInput type={type} name={name} id={id} placeholder={placeholder} onChange={onChange} />
				{helptext ? <p>{helptext}</p> : ""}
			</div>
		</div>	
	)
}

TextInputRow.propTypes = { 
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
	/** Pass a handler to the input element */
	onChange: PropTypes.func
}

TextInputRow.defaultProps = {
	type: null,
	layout: null,
	value: null,
	name: null,
	label: null,
	id: null,
	placeholder: null,
	helptext: null,
	onChange: undefined,
}