import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

// TODO: disabled styles missing

const inputstyles = `
	w-4
	h-4
	opacity-0
	cursor-pointer
`

const mockcheckboxstyles = `
	w-4
	h-4
	rounded-sm
	bg-theme-checkbox
	cursor-pointer
	relative
	focus:outline-none
	focus:ring-2
	focus:ring-focus
`

const mockfocusstyles = `
	ring-2
	ring-focus
`

const mockcheckmarkstyles = `
	absolute
	top-0
	left-0
`

const mockindeterminatestyles = `
	absolute
	w-2
	h-0.5
	top-2
	left-1
	inline-block
	bg-focus
`

const mockdisabledstyles = `
	pointer-events-none
`

export const Checkbox = ({
	name,
	id,
	value,
	checked,
	indeterminate,
	className,
	disabled,
	onChange,
	...props
}) => {
	const [isChecked, setChecked] = useState(false)
	const [isIndeterminate, setIndeterminate] = useState("")
	const [hasFocus, setFocus] = useState(false)
	
	useEffect( () => {
		setChecked(checked)
		setIndeterminate(indeterminate)
	}, [checked, indeterminate])
	
	
	const handleChange = (event) => {
		setChecked(!isChecked)
		onChange(event)
	}
	
	const handleFocus = () => {
		setFocus(true)
	}
	
	const handleBlur = () => {
		setFocus(false)
	}
		
	return (
		<div 
			className={`${mockcheckboxstyles} ${ hasFocus ? mockfocusstyles : "" } ${ disabled ? mockdisabledstyles : "" } ${className}`}
			{...props}
		>
			{ isChecked ? 	<svg 
				xmlns="http://www.w3.org/2000/svg" 
				className={`${mockcheckmarkstyles}`} 
				width="16" 
				height="16" 
				viewBox="0 0 16 16">
					<polygon fill="#2EA8C4" points="5.75 11.15 2.6 8 1.55 9.05 5.75 13.25 14.75 4.25 13.7 3.2"/>
				</svg>
			: 
				"" }
			<input
				type="checkbox"
				name={name || "unnamed checkbox"}
				value={value}
				id={id}
				checked={isChecked}
				className={`${inputstyles}`}
				disabled={disabled}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			
			{ isIndeterminate && !isChecked ? <div class={`${mockindeterminatestyles}`}></div>
											: "" }
		</div>
	)
}

Checkbox.propTypes = {
	/** Name attribute */
	name: PropTypes.string,
	/** Id of the checkbox */
	id: PropTypes.string,
	/** Pass a value the checkbox should represent.*/
	value: PropTypes.string,
	/**  Pass checked state  */
	checked: PropTypes.bool,
	/** Whether the checkbox is indeterminate ( parent of multiple checkboxes with differing checked states) */
	indeterminate: PropTypes.bool,
	/** Pass a className */
	className: PropTypes.string,
	/** Whether the checkbox is disabled */
	disabled: PropTypes.bool,
	/** Pass a handler */
	onChange: PropTypes.func,
}

Checkbox.defaultProps = {
	checked: false,
	value: "",
	id: "",
	className: "",
	disabled: null,
	onChange: undefined,
}