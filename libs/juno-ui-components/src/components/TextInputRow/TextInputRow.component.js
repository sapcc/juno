import React, { useState } from "react"
import PropTypes from "prop-types"
import { TextInput } from "../TextInput/index.js"
import { Label } from "../Label/index.js"

const stackedcontainerstyles = `
	flex
	flex-col
`

const floatingcontainerstyles = `
relative
`

const stackedlabelcontainerstyles = `
`

const floatinglabelcontainerstyles = `
absolute
top-0
left-0
px-3
py-5
pointer-events-none
transform 
origin-top-left 
transition-all 
duration-100 
ease-in-out
`

const focusedlabelcontainerstyles = `
scale-75
-translate-x-3
translate-x-1
`

const floatinginputstyles = `
p-3 
h-16
placeholder-transparent
`

const helptextstyles = `
	text-xs
	text-theme-disabled
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
	className,
	onChange,
	...props
}) => {
	
	const [focus, setFocus] = useState(0)
	
	return (
		<div 
			className={`textinput-row ${variantStyle(variant, "container")} `}
			{...props}
		>
			<div className={`label-container ${variantStyle(variant, "labelcontainer")} ${variant == "floating" && focus ? focusedlabelcontainerstyles : ""}`}>
				<Label text={label} htmlFor={id} />
			</div>
			<div>
				<TextInput 
					type={type} 
					name={name} 
					id={id} 
					placeholder={placeholder} 
					onChange={onChange} 
					onFocus={() => setFocus(1)}
					onBlur={() => setFocus(0)}
					className={`${variantStyle(variant, "input")} ${className}`} 
				/>
				{helptext ? <p className={`${helptextstyles}`}>{helptext}</p> : ""}
			</div>
		</div>	
	)
}

TextInputRow.propTypes = { 
	/** The type of the input element to render */
	type: PropTypes.oneOf(["text", "password", "email", "tel", "url"]),
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
	/** Pass a className */
	className: PropTypes.string,
	/** Pass a handler to the input element */
	onChange: PropTypes.func
}

TextInputRow.defaultProps = {
	type: null,
	variant: "floating",
	value: null,
	name: null,
	label: null,
	id: null,
	placeholder: null,
	helptext: null,
	className: "",
	onChange: undefined,
}