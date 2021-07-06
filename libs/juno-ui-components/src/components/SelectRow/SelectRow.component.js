import React from "react"
import PropTypes from "prop-types"
import { Select } from "../Select/index.js"
import uselayoutDirection from "../../lib/hooks/useLayoutDirection"


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
	Determine layout direction using custom hook:
	*/	
	const layoutDirection = uselayoutDirection(layout)
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