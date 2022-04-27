import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

const switchbasestyles = `
	rounded-full
	relative
	p-0
	leading-0
	border
	g-theme-default
	border-theme-switch-default
	focus:outline-none
	focus:ring-2
	focus:ring-theme-focus
	disabled:opacity-50
	disabled:cursor-not-allowed
`
const switchsizestyles = (size) => {
	switch (size) {
		case "small":
		  	return 'w-[1.75rem] h-4'
		case "large":
			return 'w-[3.125rem] h-[1.6875rem]'
		default:
		  	return 'w-switch-default h-switch-default'
	  }
}

const handlebasestyles = `
	inline-block
	absolute
	top-[1px]
	rounded-full
	bg-theme-switch-handle
	border-theme-default
`
const handlesizestyles = (size) => {
	switch (size) {
		case "small":
			return 'w-[0.75rem] h-[0.75rem]'
		case "large":
			return 'w-[1.4375rem] h-[1.4375rem]'
		default: 
			return 'w-switch-handle-default h-switch-handle-default'
	}
	
	
}

const handleonstyles = `
	right-[1px] bg-theme-switch-handle-checked
`
const handleoffstyles = `
	left-[1px]
`

/** A Switch/Toggle component */
export const Switch = ({
	name,
	id,
	onChange,
	size,
	on,
	disabled,
	className,
	...props
}) => {
	const [isOn, setIsOn] = useState(on)
	
	useEffect(() => {
		setIsOn(on)
	  }, [on])
	
	const handleChange = (event) => {
		setIsOn(!isOn)
		onChange(event)
	}
	
	return (
		<button 
			type="button"
			role="switch"
			name={name}
			id={id}
			aria-checked={isOn}
			disabled={disabled}
			onClick={handleChange}
			className={`juno-switch juno-switch-${size} ${switchbasestyles} ${switchsizestyles(size)} ${className}`}
			{...props}
		>
			<span className={`juno-switch-handle ${handlebasestyles} ${handlesizestyles(size)} ${ isOn ? handleonstyles : handleoffstyles}`} ></span>
		</button>
	)
}

Switch.propTypes = { 
	/** Name attribute */
	name: PropTypes.string,
	/** Id */
	id: PropTypes.string,
	/** Leave empty for default size */
	size: PropTypes.oneOf(["small", "default", "large"]),
	/**  Pass checked state for initial rendering. */
	on: PropTypes.bool,
	/** Disabled switch */
	disabled: PropTypes.bool,
	/** Pass a className */
	className: PropTypes.string,
	/** Pass a handler */
	onChange: PropTypes.func,
}

Switch.defaultProps = {
	name: "unnamed switch",
	id: null,
	on: false,
	disabled: null,
	size: "default",
	className: "",
	onChange: undefined,
}