import React from "react"
import PropTypes from "prop-types"
import { Textarea } from "../Textarea/index.js"
import { useFormLayoutContext, FormLayoutProvider } from "../FormLayoutProvider"

const textarearow = `
	flex
`

const textarearowHorizontal = `
	flex-row
`

const textarearowVertical = `
	flex-col
`

const layoutClass = (layoutDirection) => {
	switch (layoutDirection) {
		case "vertical":
			return textarearowVertical
		case "horizontal":
			return textarearowHorizontal
		default:
			return textarearowHorizontal
	}
}

/** A textarea group containing a textarea, associated label, optional helptext, and structural markup */

export const TextareaRow = ({
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
	Determine layout direction from prop or context:
	1. Use as passed if passed as a prop to the component directly
	2. if not, try to get from context and use if context exists
	3. if no context exists, default.
	*/
	
	/* Use from prop if passed: */
	let layoutDirection = layout
	/* Define default direction: */
	const defaultLayoutDirection = "horizontal"
	/* if no direction as been passed… */
	if (!layoutDirection) {
		/* … try to get direction from context */
		try {
			 layoutDirection = useFormLayoutContext()
		/* If trying to get direction from context errors out, use default: */
		} catch (e) {
			 layoutDirection = defaultLayoutDirection
			console.log(e)
		/* If there is still no layout direction set, use default: */
		} finally {
			if (!layoutDirection) {
				layoutDirection = defaultLayoutDirection
			}
		}
	}
	return (
		<div
			className={`${textarearow} textarearow-${layoutDirection} ${layoutClass(layoutDirection)}`}
			{...props}
		>
			<div>
				<label htmlFor={id}>{label}</label>
			</div>
			<div>
				<Textarea name={name} onChange={onChange} id={id} value={value} placeholder={placeholder} />
				{helptext ? <p>{helptext}</p> : ""}
			</div>
		</div>
	)
}

TextareaRow.propTypes = {
	/** Optional initial value */
	value: PropTypes.string,
	/** Layout direction */
	layout: PropTypes.oneOf(["horizontal", "vertical"]),
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
	layout: null,
	name: null,
	label: null,
	id: null,
	placeholder: null,
	helptext: null,
	onChange: undefined,
}
