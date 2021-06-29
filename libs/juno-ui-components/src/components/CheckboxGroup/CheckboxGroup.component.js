import React from "react"
import PropTypes from "prop-types"
import { Checkbox } from "../Checkbox/index.js"
import { useFormLayoutContext, FormLayoutProvider } from "../FormLayoutProvider"

const checkboxgroup = `
	flex
`

const checkboxgroupHorizontal = `
	flex-row
`

const checkboxgroupVertical = `
	flex-col
`

const layoutClass = (layoutDirection) => {
	switch (layoutDirection) {
		case "vertical":
			return checkboxgroupVertical
		case "horizontal":
			return checkboxgroupHorizontal
		default:
			return checkboxgroupHorizontal
	}
}


/** A checkbox input group containing a checkbox, associated label, and structural markup */
export const CheckboxGroup =({
	value,
	layout,
	name,
	label,
	id,
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
			className={`${checkboxgroup} checkboxgroup-${layoutDirection} ${layoutClass(layoutDirection)}`}
			{...props}
		>
			<div>
				<Checkbox name={name} onChange={onChange} id={id} />
				{helptext ? <p>{helptext}</p> : ""}
			</div>
			<div>
				<label htmlFor={id}>{label}</label>
			</div>
		</div>
	)
}

CheckboxGroup.propTypes = {
	/** Optional initial value */
	value: PropTypes.string,
	/** Layout direction */
	layout: PropTypes.oneOf(["horizontal", "vertical"]),
	/** Name attribute of the checkbox element */
	name: PropTypes.string,
	/** Label text */
	label: PropTypes.string,
	/** Id */
	id: PropTypes.string,
	/** Help text */
	helptext: PropTypes.string,
	/** Pass a handler to the checkbox element */
	onChange: PropTypes.func,
}

CheckboxGroup.defaultProps = {
	value: null,
	layout: null,
	name: null,
	label: null,
	id: null,
	helptext: null,
	onChange: undefined,
}

