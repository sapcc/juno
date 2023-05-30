import React, { useState, useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import { Label } from "../Label/index.js"
import { Icon } from "../Icon/"
import { FormHint } from "../FormHint/"

const wrapperStyles = `
	jn-inline-flex
	jn-items-center
`

const inputstyles = `
	jn-w-4
	jn-h-4
	jn-opacity-0
	jn-z-50
	jn-cursor-pointer
`

const mockcheckboxstyles = `
	jn-relative
	jn-w-4
	jn-h-4
	jn-rounded-sm
	jn-bg-theme-checkbox
	jn-cursor-pointer
	focus:jn-outline-none
	focus:jn-ring-2
	focus:jn-ring-theme-focus
`

const mockfocusstyles = `
	jn-ring-2
	jn-ring-theme-focus
`

const mockcheckmarkstyles = `
	jn-absolute
	jn-top-0
	jn-left-0
	jn-text-theme-checkbox-checked
	jn-fill-current
`


const mockindeterminatestyles = `
	jn-absolute
	jn-w-2
	jn-h-0.5
	jn-top-2
	jn-left-1
	jn-inline-block
	jn-bg-theme-focus
`

const mockdisabledstyles = `
	jn-pointer-events-none
	jn-opacity-50
`

const noBorderStyles = `
	jn-border
	jn-border-transparent
`

const errorstyles = `
	jn-border
	jn-border-theme-error
`

const successstyles = `
	jn-border
	jn-border-theme-success
`

const labelStyles = `
	jn-leading-0
	jn-ml-2
`

const iconStyles = `
	jn-ml-1
`

const hintStyles = `
	jn-mt-0
	jn-ml-6
`


/** 
A controlled Checkbox component.
*/
export const Checkbox = ({
	name,
	id,
	label,
	value,
	checked,
	indeterminate,
	className,
	disabled,
	required,
	invalid,
	valid,
	helptext,
	successtext,
	errortext,
	onChange,
	onClick,
	...props
}) => {
	
	const isNotEmptyString = (str) => {
		return !(typeof str === 'string' && str.trim().length === 0)
	}
	
	const [isChecked, setIsChecked] = useState(false)
	const [isIndeterminate, setIsIndeterminate] = useState("")
	const [hasFocus, setHasFocus] = useState(false)
	const [isInvalid, setIsInvalid] = useState(false)
	const [isValid, setIsValid] = useState(false)
	
	useEffect( () => {
		setIsChecked(checked)
	}, [checked])
	
	const invalidated = useMemo(
		() => invalid || (errortext && isNotEmptyString(errortext) ? true : false),
		[invalid, errortext]
	)
	const validated = useMemo(
		() => valid || (successtext && isNotEmptyString(successtext) ? true : false),
		[valid, successtext]
	)
	
	useEffect( () => {
		setIsIndeterminate(indeterminate)
	}, [indeterminate])
	
	useEffect( () => {
		setIsInvalid(invalidated)
	}, [invalidated])
	
	useEffect( () => {
		setIsValid(validated)
	}, [validated])
	
	const handleChange = (event) => {
		setIsChecked(!isChecked)
		onChange && onChange(event)
	}
	
	const handleClick = (event) => {
		onClick && onClick(event)
	}
	
	const handleFocus = () => {
		setHasFocus(true)
	}
	
	const handleBlur = () => {
		setHasFocus(false)
	}
		
	return (
		<div className="jn-checkbox-outer">
			<div className={`jn-checkbox-wrapper ${wrapperStyles}`}>
				<div 
					className={`
						juno-checkbox 
						${mockcheckboxstyles} 
						${ hasFocus ? mockfocusstyles : "" } 
						${ disabled ? mockdisabledstyles : "" } 
						${ isInvalid ? errorstyles : "" } 
						${ isValid ? successstyles : "" } 
						${ isInvalid || isValid ? "" : noBorderStyles }
						${className}`}
					{...props}
				>
					{ isChecked ? 	<svg 
						xmlns="http://www.w3.org/2000/svg" 
						className={`${mockcheckmarkstyles}`} 
						width="16" 
						height="16" 
						viewBox="0 0 16 16">
							<polygon points="5.75 11.15 2.6 8 1.55 9.05 5.75 13.25 14.75 4.25 13.7 3.2"/>
						</svg>
					: 
						"" }
					<input
						type="checkbox"
						name={name}
						value={value}
						id={id}
						checked={isChecked}
						className={`
							${inputstyles} 
							${ isInvalid ? "juno-checkbox-invalid" : ""} 
							${ isValid ? "juno-checkbox-valid" : ""} 
						`}
						disabled={disabled}
						onChange={handleChange}
						onClick={handleClick}
						onFocus={handleFocus}
						onBlur={handleBlur}
					/>
					
					{ isIndeterminate && !isChecked ? <div className={`${mockindeterminatestyles}`}></div>
													: "" }
				</div>
				{ label && isNotEmptyString(label) ? 
						<>
							<Label 
								text={label}
								htmlFor={id}
								disabled={disabled}
								required={required}
								className={`${labelStyles}`}
							/>
							{isInvalid ? (
								<Icon
									icon="dangerous"
									color="jn-text-theme-error"
									size="1.125rem"
									className={`
										${iconStyles}
										${disabled ? "jn-opacity-50" :""}
									`}
								/>
							) : ""}
							{isValid ? (
								<Icon
									icon="checkCircle"
									color="jn-text-theme-success"
									size="1.125rem"
									className={`
										${iconStyles}
										${disabled ? "jn-opacity-50" :""}
									`}
								/>
							) : ""}
						</>
					:
						""
				}
			</div>
			{ errortext && isNotEmptyString(errortext) ?
					<FormHint text={errortext} variant="error" className={`${hintStyles}`} />
				:
					""
			}
			{ successtext && isNotEmptyString(successtext) ?
					<FormHint text={successtext} variant="success" className={`${hintStyles}`} />
				:
					""
			}
			{ helptext && isNotEmptyString(helptext) ?
					<FormHint text={helptext} className={`${hintStyles}`} />
				:
					""
			 }
		</div>
	)
}

Checkbox.propTypes = {
	/** Name attribute */
	name: PropTypes.string,
	/** The label of the checkbox */
	label: PropTypes.string,
	/** Id of the checkbox */
	id: PropTypes.string,
	/** Pass a value the checkbox should represent.*/
	value: PropTypes.string,
	/**  Pass checked state  */
	checked: PropTypes.bool,
	/** Whether the checkbox is indeterminate ( parent of multiple checkboxes with differing checked states) */
	indeterminate: PropTypes.bool,
	/** Whether the checkbox is disabled */
	disabled: PropTypes.bool,
	/** Whether the checkbox is required */
	required: PropTypes.bool,
	/** Whether the checkbox is invalid */
	invalid: PropTypes.bool,
	/** Whether the Checkbox is valid */
	valid: PropTypes.bool,
	/** A helptext to render to explain meaning and significance of the Checkbox */
	helptext: PropTypes.node,
	/** A text to render when the Checkbox was successfully validated */
	successtext: PropTypes.node,
	/** A text to render when the Checkbox has an error or could not be validated */
	errortext: PropTypes.node,
	/** Pass a className */
	className: PropTypes.string,
	/** Pass a change handler */
	onChange: PropTypes.func,
	/** Pass a click handler */
	onClick: PropTypes.func,
}

Checkbox.defaultProps = {
	name: undefined,
	label: undefined,
	checked: false,
	indeterminate: false,
	value: "",
	id: "",
	className: "",
	disabled: false,
	required: false,
	invalid: false,
	valid: false,
	helptext: "",
	successtext: "",
	errortext: "",
	onChange: undefined,
	onClick: undefined,
}
