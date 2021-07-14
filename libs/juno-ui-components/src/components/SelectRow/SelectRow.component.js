import React from "react"
import PropTypes from "prop-types"
import { Select } from "../Select/index.js"

const selectrow = `
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

/** A select group containing an input of type text, password, email, tel, or url, an associated label, and necessary structural markup. */
export const SelectRow = ({
	name,
	label,
	id,
	helptext,
	children,
	onChange,
	...props
}) => {
	return (
		<div 
			className={`select-row ${selectrow}`}
			{...props}
		>
			<div>
				<label  className={`${labelstyles}`} htmlFor={id}>{label}</label>
			</div>
			<div>
				<Select name={name} id={id} onChange={onChange}>
					{children}
				</Select>
				{helptext ? <p className={`${helptextstyles}`}>{helptext}</p> : ""}
			</div>
		</div>	
	)
}

SelectRow.propTypes = { 
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
	name: null,
	label: null,
	id: null,
	helptext: null,
	onChange: undefined,
}