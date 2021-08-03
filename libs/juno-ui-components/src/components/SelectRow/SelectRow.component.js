import React from "react"
import PropTypes from "prop-types"
import { Select } from "../Select/index.js"
import { Label } from "../Label/index.js"


const selectrow = `
	flex
	flex-col
`

const helptextstyles = `
	text-xs
	text-theme-disabled
`


/** A select group containing an input of type text, password, email, tel, or url, an associated label, and necessary structural markup. */
export const SelectRow = ({
	name,
	label,
	id,
	helptext,
	required,
	className,
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
				<Label text={label} htmlFor={id} required={required} />
			</div>
			<div>
				<Select name={name} id={id} onChange={onChange} className={className} >
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
	/** Specify whether the select is required */
	required: PropTypes.bool,
	/** Pass a classname */
	className: PropTypes.string,
	/** Children to render */
	children: PropTypes.node,
	/** Pass a handler to the Select element */
	onChange: PropTypes.func,
}

SelectRow.defaultProps = {
	name: null,
	label: null,
	id: null,
	required: null,
	className: "",
	helptext: null,
	onChange: undefined,
}