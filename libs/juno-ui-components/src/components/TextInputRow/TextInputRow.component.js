import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { TextInput } from "../TextInput/index.js"
import { Label } from "../Label/index.js"

const stackedcontainerstyles = `
	flex
	flex-col
`

const floatingcontainerstyles = `
	relative
	mb-5
`

const stackedlabelcontainerstyles = `
`

const floatinglabelcontainerstyles = `
	absolute
	top-0
	left-0
	p-2.5
	pointer-events-none
	transform 
	origin-top-left 
	transition-all 
	duration-100 
	ease-in-out
`

const minimizedlabelcontainerstyles = `
	scale-75
	opacity-75
	pt-3
	-translate-y-2.5
	translate-x-1
`

const floatinginputstyles = `
	p-3 
	pt-4
	h-16
	placeholder-transparent
	w-full
`

const helptextstyles = `
	text-xs
	text-theme-disabled
	mt-1
`

const stackedinputstyles = `
	w-full
`

const variantStyle = (variant, element) => {
	switch (variant) {
		case "floating":
			switch (element) {
				case "container":
					return floatingcontainerstyles
				case "labelcontainer":
					return floatinglabelcontainerstyles
				case "input":
					return floatinginputstyles
			}
		case "stacked":
			switch (element) {
				case "container":
					return stackedcontainerstyles
				case "labelcontainer":
					return stackedlabelcontainerstyles
				case "input":
					return stackedinputstyles
			}
	}
	
}



/** A text input group containing an input of type text, password, email, tel, or url, an associated label, and necessary structural markup. */
export const TextInputRow = ({
	type,
	variant,
	value,
	name,
	label,
	id,
	placeholder,
	helptext,
	required,
	className,
	disabled,
	onChange,
	...props
}) => {	
	const [val, setValue] = useState("")
	const [focus, setFocus] = useState(false)
	
	React.useEffect(() => {
		setValue(value)
	}, [value])
	
	const handleChange = (event) => {
		setValue(event.target.value)
		onChange()
	}
	
	const minimizedLabel = (variant, value, focus) => {
		if (variant === "floating") { 
			if (focus) {
				return minimizedlabelcontainerstyles
			} else if (value && value.length > 0) {
				return minimizedlabelcontainerstyles
			} else {
				return ""
			}
		} else {
			return ""
		}
	}
	
	return (
		<div 
			className={`juno-textinput-row ${variantStyle(variant, "container")} ${className}`}
			{...props}
		>
			<div className={`juno-label-container ${variantStyle(variant, "labelcontainer")} ${minimizedLabel(variant, val, focus)}`}>
				<Label 
					text={label} 
					htmlFor={id} 
					required={required} 
					variant={variant}
					disabled={ variant === 'stacked' && disabled ? disabled : false }
				/>
			</div>
			<div className={`juno-input-container`} >
				<TextInput 
					type={type} 
					value={val}
					name={name} 
					id={id} 
					placeholder={placeholder} 
					disabled={disabled}
					onChange={handleChange} 
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					className={`${variantStyle(variant, "input")}`} 
				/>
				{helptext ? <p className={`${helptextstyles}`}>{helptext}</p> : ""}
			</div>
		</div>	
	)
}

TextInputRow.propTypes = { 
	/** The type of the input element to render */
	type: PropTypes.oneOf(["text", "password", "email", "tel", "url", "number"]),
	/** Floating (default) or stacked layout variant */
	variant: PropTypes.oneOf(["floating", "stacked"]),
	/** Optional initial value */
	value: PropTypes.string,
	/** Name attribute of the input */
	name: PropTypes.string,
	/** Label text */
	label: PropTypes.string,
	/** Id */
	id: PropTypes.string,
	/** Placeholder for the text input. Will not be visible on floating label inputs. */
	placeholder: PropTypes.string,
	/** Help text */
	helptext: PropTypes.string,
	/** Specify whether the input is required */
	required: PropTypes.bool,
	/** Pass a className */
	className: PropTypes.string,
	/** Disable the input */
	disabled: PropTypes.bool,
	/** Pass a handler to the input element */
	onChange: PropTypes.func
}

TextInputRow.defaultProps = {
	type: null,
	variant: "floating",
	value: "",
	name: null,
	label: null,
	id: null,
	placeholder: null,
	helptext: null,
	required: null,
	className: "",
	disabled: null,
	onChange: undefined,
}