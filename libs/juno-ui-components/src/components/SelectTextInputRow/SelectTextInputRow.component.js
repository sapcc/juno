import React from "react"
import PropTypes from "prop-types"
import { Select } from "../Select/index.js"
import { SelectOption } from "../SelectOption/index.js"
import { TextInput } from "../TextInput/index.js"
import { Label } from "../Label/index.js"

const selectTextInputRowStyles = `
	w-full
`

const inputWrapperStyles = `
	flex 
	w-full 
	relative
`

const selectWrapperStyles = `
	grow-1
`

const labelWrapperStyles = `
	absolute
    top-0.5
    left-4
    transform 
    origin-top-left 
    scale-75
    opacity-75
`

const helptextstyles = `
	text-xs
	text-theme-light
	mt-1
`

const selectStyles = `
	rounded-r-none
	w-full
`

const textinputStyles = `
	rounded-l-none
	grow-1
`

export const SelectTextInputRow = ({
	label,
	options,
	helptext,
	className,
	...props
}) => {
	// PREFIX
	return (
		<div className={`juno-select-textinput-row ${selectTextInputRowStyles} ${className}`} {...props} >
			<div className={`juno-select-textinput-row-input-wrapper ${inputWrapperStyles}`}>
				<div className={`juno-select-textinput-row-select-wrapper ${selectWrapperStyles}`}>
					<Select className={`${selectStyles}`}>
						{options.map((option, i) => (<SelectOption label={option.label} value={option.value}/>))}
					</Select>
					<div className={`juno-label-container ${labelWrapperStyles}`}>
						<Label text={label}/>
					</div>
				</div>
				<TextInput className={`${textinputStyles}`} />
			</div>
			{helptext ? <p className={`${helptextstyles}`} >{helptext}</p> : ""}
		</div>
	)
}

SelectTextInputRow.propTypes = {
	/** The Label of the Select */
	label: PropTypes.string,
	/** Pass an arrays of objects as options for the Select: `[{label: "Value 1", value: "val-1}, {…}] */
	options: PropTypes.arrayOf(PropTypes.object),
	/** Pass an helptext to display */
	helptext: PropTypes.string,
	/** Add custom classNames */
	className: PropTypes.string,
}

SelectTextInputRow.defaultProps = {
	label: "",
	options: [],
	helptext: "",
	className: "",
}