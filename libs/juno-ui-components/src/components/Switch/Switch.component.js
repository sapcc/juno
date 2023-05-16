import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index"

const switchWrapperStyles = `
	jn-flex
	jn-flex-row
`

const switchbasestyles = `
	jn-rounded-full
	jn-relative
	jn-p-0
	jn-leading-0
	jn-border
	jn-g-theme-default
	focus:jn-outline-none
	focus:jn-ring-2
	focus:jn-ring-theme-focus
	disabled:jn-opacity-50
	disabled:jn-cursor-not-allowed
`
const switchsizestyles = (size) => {
	switch (size) {
		case "small":
		  	return 'jn-w-[1.75rem] jn-h-4'
		case "large":
			return 'jn-w-[3.125rem] jn-h-[1.6875rem]'
		default:
		  	return 'jn-w-switch-default jn-h-switch-default'
	  }
}

const handlebasestyles = `
	jn-inline-block
	jn-absolute
	jn-top-[1px]
	jn-rounded-full
	jn-bg-theme-switch-handle
	jn-border-theme-default
`
const handlesizestyles = (size) => {
	switch (size) {
		case "small":
			return 'jn-w-[0.75rem] jn-h-[0.75rem]'
		case "large":
			return 'jn-w-[1.4375rem] jn-h-[1.4375rem]'
		default: 
			return 'jn-w-switch-handle-default jn-h-switch-handle-default'
	}
	
	
}

const defaultborderstyles = `
	jn-border-theme-switch-default
`

const invalidbasestyles = `
	jn-border-theme-error
`

const validbasestyles = `
	jn-border-theme-success
`

const handleonstyles = `
	jn-right-[1px] 
	jn-bg-theme-switch-handle-checked
`
const handleoffstyles = `
	jn-left-[1px]
`

const switchLabelStyles = `
	jn-text-theme-high
	jn-ml-2
	disabled:jn-opacity-50
	disabled:jn-cursor-not-allowed
`

const requiredStyles = `
		jn-inline-block
		jn-w-1
		jn-h-1
		jn-rounded-full
		jn-align-top
		jn-ml-1
		jn-mt-1
		jn-bg-theme-required
`

const iconstyles = `
	jn-inline-block 
	jn-ml-1 
	jn-leading-1
	jn-mt-[-.2rem]
`

/** A Switch/Toggle component */
export const Switch = ({
	name,
	id,
	label,
	required,
	size,
	on,
	disabled,
	invalid,
	valid,
	className,
	onChange,
	onClick,
	...props
}) => {
	const [isOn, setIsOn] = useState(on)
	const [isInvalid, setIsInvalid] = useState(false)
	const [isValid, setIsValid] = useState(false)
	
	useEffect(() => {
		setIsOn(on)
	  }, [on])
		
	useEffect(() => {
		setIsInvalid(invalid)
	}, [invalid])
	
	useEffect(() => {
		setIsValid(valid)
	}, [valid])
	
	const handleClick = (event) => {
		setIsOn(!isOn)
		onClick && onClick(event)
		onChange && onChange(event)
	}
	
	return (
		<span className={`
			juno-switch-wrapper 
			${switchWrapperStyles}
			`}
		>
			<button 
				type="button"
				role="switch"
				name={name}
				id={id}
				aria-checked={isOn}
				disabled={disabled}
				onClick={handleClick}
				className={`
					juno-switch 
					juno-switch-${size} 
					${switchbasestyles} 
					${switchsizestyles(size)} 
					${ isInvalid ? "juno-switch-invalid " + invalidbasestyles : "" } 
					${ isValid ? "juno-switch-valid " + validbasestyles : "" } 
					${ isValid || isInvalid ? "" : defaultborderstyles } 
					${className}`}
				{...props}
			>
				<span className={`juno-switch-handle ${handlebasestyles} ${handlesizestyles(size)} ${ isOn ? handleonstyles : handleoffstyles}`} ></span>
			</button>
			<label 
				className={`juno-label ${switchLabelStyles}`}
				htmlFor={id}
				disabled={disabled}
			>
				{label}
				{ required ? <span className={`required ${requiredStyles}`} ></span> : "" }
			</label>
			{isInvalid ? (
				<Icon
					icon="dangerous"
					color="jn-text-theme-error"
					size="1.125rem"
					className={`${iconstyles} ${ disabled ? "jn-opacity-50" : "" }`}
				/>
			) : ""}
			{isValid ? (
				<Icon
					icon="checkCircle"
					color="jn-text-theme-success"
					size="1.125rem"
					className={`${iconstyles} ${ disabled ? "jn-opacity-50" : "" }`}
				/>
			) : ""}
		</span>
	)
}

Switch.propTypes = { 
	/** Name attribute */
	name: PropTypes.string,
	/** Id */
	id: PropTypes.string,
	/** Add a label to the Switch */
	label: PropTypes.string,
	/** Whether the Switch is required */
	required: PropTypes.bool,
	/** Leave empty for default size */
	size: PropTypes.oneOf(["small", "default", "large"]),
	/**  Pass checked state for initial rendering. */
	on: PropTypes.bool,
	/** Disabled switch */
	disabled: PropTypes.bool,
	/** Whether the Switch is invalid */
	invalid: PropTypes.bool,
	/** Whether the Switch is valid */
	valid: PropTypes.bool,
	/** Pass a className */
	className: PropTypes.string,
	/** Pass a change handler */
	onChange: PropTypes.func,
	/** Pass a click handler */
	onClick: PropTypes.func,
}

Switch.defaultProps = {
	name: "",
	id: null,
	label: undefined,
	required: false,
	size: "default",
	on: false,
	disabled: null,
	invalid: false,
	valid: false,
	className: "",
	onChange: undefined,
	onClick: undefined,
}