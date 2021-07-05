import React from "react"
import PropTypes from "prop-types"
import { Select } from "../Select/index.js"
import { useFormLayoutContext, FormLayoutProvider } from "../FormLayoutProvider"


const selectrow = `
	flex
`

const selectrowHorizontal = `
	flex-row
`

const selectrowVertical = `
	flex-col
`

const layoutClass = (layoutDirection) => {
	switch (layoutDirection) {
		case "vertical":
			return selectrowVertical
		case "horizontal":
			return selectrowHorizontal
		default:
			return selectrowHorizontal
	}
}

/** A select group containing an input of type text, password, email, tel, or url, an associated label, and necessary structural markup. */
export const SelectRow = ({
	layout,
	name,
	label,
	id,
	helptext,
	children,
	onChange,
	...props
}) => {
	/* 
	Determine layout direction from prop or context:
	1. Use as passed if passed as a prop to the component directly
	2. if not, try to get from context and use if context exists
	3. if no context exists, default.
	*/
	let layoutDirection = layout
	const defaultLayoutDirection = "horizontal"
	if (layoutDirection) {
		console.log("layout prop passed directly: ", layoutDirection)
	}
	if (!layoutDirection) {
		console.log("no layout prop passed directly")
		try {
			 layoutDirection = useFormLayoutContext()
			console.log("getting layout from context, received: ", layoutDirection)
		} catch (e) {
			 layoutDirection = defaultLayoutDirection
			console.log(e)
			console.log("there was an error calling the context, defaulting to: ", layoutDirection)
		} finally {
			if (!layoutDirection) {
				layoutDirection = defaultLayoutDirection
				console.log("no context found, defaulting to: ", layoutDirection)
			}
		}
	}
	console.log(layoutDirection)
	
	return (
		<div 
			className={`${selectrow} selectrow-${layoutDirection} ${layoutClass(layoutDirection)}`}
			{...props}
		>
			<div>
				<label htmlFor={id}>{label}</label>
			</div>
			<div>
				<Select name={name} id={id} onChange={onChange}>
					{children}
				</Select>
				{helptext ? <p>{helptext}</p> : ""}
			</div>
		</div>	
	)
}

SelectRow.propTypes = { 
	/** Layout direction */
	layout: PropTypes.oneOf(["horizontal", "vertical"]),
	/** Name attribute of the input */
	name: PropTypes.string,
	/** Label text */
	label: PropTypes.string,
	/** Id */
	id: PropTypes.string,
	/** Help text */
	helptext: PropTypes.string,
	/** Children to render */
	children: PropTypes.node,
	/** Pass a handler to the Select element */
	onChange: PropTypes.func,
}

SelectRow.defaultProps = {
	layout: null,
	name: null,
	label: null,
	id: null,
	helptext: null,
	onChange: undefined,
}