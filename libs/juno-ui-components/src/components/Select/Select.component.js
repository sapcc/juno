import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"
import { Spinner } from "../Spinner/Spinner.component"

const selectstyles = `
	jn-w-full
	jn-bg-theme-select
	jn-text-theme-high
	jn-appearance-none
	jn-text-base
	jn-pl-4
	jn-pr-9
	jn-h-[2.375rem]
	jn-rounded-3px
	jn-bg-icon-arrow-down
	jn-bg-right
	jn-bg-no-repeat
	focus:jn-outline-none
	focus:jn-ring-2
	focus:jn-ring-theme-focus
	disabled:jn-opacity-50
`

const wrapperstyles = `
	jn-relative
`

const iconstyles = `
	jn-absolute
	jn-flex
	jn-right-2
	jn-top-1.5
	jn-pointer-events-none
`

const disablediconstyles = `
	jn-opacity-50
`

const errorstyles = `
	jn-border
	jn-border-theme-error
`

const successstyles = `
	jn-border
	jn-border-theme-success
`

const loadingStyles = `
	jn-absolute
	jn-top-0
	jn-right-0
	jn-bottom-0
	jn-left-0
	jn-text-center
	jn-bg-theme-select
	jn-text-theme-high
	jn-text-base
	jn-rounded-3px
	jn-flex
	jn-flex-col
	jn-justify-center
	jn-select-none
	jn-cursor-not-allowed
`

const loadingSpinnerStyles = `
	jn-ml-auto
	jn-mr-auto
`

/*+ A basic, uncontrolled Select. Takes SelectOption and SelectOptionGroup as children. */
export const Select = ({
	name,
	id,
	children,
	className,
	disabled,
	invalid,
	valid,
	onChange,
	loading,
	...props
}) => {
	const [isLoading, setIsLoading] = useState(false)
	const [isInvalid, setIsInvalid] = useState(false)
	const [isValid, setIsValid] = useState(false)
	
	useEffect(() => {
		setIsLoading(loading)
	}, [loading])
	
	useEffect(() => {
		setIsInvalid(invalid)
	}, [invalid])
	
	useEffect(() => {
		setIsValid(valid)
	}, [valid])
	
	const SelectIcons = ({
		disabled
	}) => {
		if (isLoading) {
			return (
				<div className={`juno-select-loading ${loadingStyles}`} >
					<Spinner className={`${loadingSpinnerStyles}`} />
				</div>
			)
		} else {
			return (
				<div className={`${iconstyles} ${ disabled ? disablediconstyles : "" } `}>
					{ isInvalid ? <Icon icon="dangerous" color="jn-text-theme-error" /> : null }
					{ isValid ? <Icon icon="checkCircle" color="jn-text-theme-success" /> : null }
					<Icon icon={"expandMore"} />
				</div>
			)
		}
	}
	
	return (
		<div className={`juno-select-wrapper ${wrapperstyles}`}>
			<select 
				name={name || "Unnamed Select"}
				id={id}
				className={`juno-select ${selectstyles} ${ isInvalid ? "juno-select-invalid " + errorstyles : "" } ${ isValid ? "juno-select-valid " + successstyles : "" } ${className}`}
				onChange={onChange}
				disabled={disabled || isLoading}
				{...props}
			>
				{children}
			</select>
			<SelectIcons disabled={disabled} />
		</div>
	)
}

Select.propTypes = {
	/** Pass a name. */
	name: PropTypes.string,
	/** The id of the select */
	id: PropTypes.string,
	/** Pass a classname */
	className: PropTypes.string,
	/** Pass SelectOption and SelectOptionGroup as children. */
	children: PropTypes.node,
	/** Disable the select */
	disabled: PropTypes.bool,
	/** Whether the Select is invalid */
	invalid: PropTypes.bool,
	/** Whether the Select is valid */
	valid: PropTypes.bool,
	/** Pass a handler */
	onChange: PropTypes.func,
	/** Whether the select is currently loading */
	loading: PropTypes.bool,
}

Select.defaultProps = {
	name: null,
	id: "",
	className: "",
	disabled: null,
	invalid: false,
	valid: false,
	onChange: undefined,
	loading: false,
}