import React, { useState, useEffect, useMemo, useId, useContext } from "react"
import PropTypes from "prop-types"
import { RadioGroupContext } from "../RadioGroup/RadioGroup.component.js"
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
`

const mockradiostyles = `
	jn-relative
	jn-w-4
	jn-h-4
	jn-rounded-full
	jn-bg-theme-radio
`

const checkedstyles = `
	jn-absolute
	jn-block
	jn-bg-theme-radio-checked
	jn-rounded-full
	jn-w-3
	jn-h-3
	jn-top-[1px]
	jn-left-[1px]
`

const mockfocusradiostyles = `
	jn-outline-none
	jn-ring-2
	jn-ring-theme-focus
`

const mockdisabledradiostyles = `
	jn-opacity-50
	jn-cursor-not-allowed
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


/** A controlled Radio component. */
export const Radio = ({
	checked,
	className,
	disabled,
	errortext,
	helptext,
	id,
	invalid,
	label,
	name,
	onChange,
	onClick,
	required,
	successtext,
	valid,
	value,
	...props
}) => {
	
	// Utility
	const isNotEmptyString = (str) => {
		return !(typeof str === 'string' && str.trim().length === 0)
	}
	
	const uniqueId = () => (
		"juno-radio-" + useId()
	)
	
	// Consume and deconstruct the context so we won't get errors but 'undefined' when trying to access a group context in case there is none:
	const radioGroupContext = useContext(RadioGroupContext)
	const { 
		selectedValue: groupSelectedValue,
		onChange: groupOnChange,
		name: groupName,
		updateSelectedValue: updateGroupSelectedValue,
		disabled: groupDisabled,
	} = radioGroupContext || {}
	
	// Lazily init state depending on parent selected value (if parent context exists), or the Radio's own checked prop:
	const initialChecked = () => {
		if (radioGroupContext) {
			if (groupSelectedValue === value) {
				return true
			} else {
				return false
			}
		} else {
			return checked ? true : false	
		}
	}
	const [isChecked, setIsChecked] = useState( () => initialChecked() )
	
	// Initialise all other state variables:
	const [hasFocus, setHasFocus] = useState(false)
	const [isInvalid, setIsInvalid] = useState(false)
	const [isValid, setIsValid] = useState(false)
	
	// Validate / Invalidate the Radio based on the respective props: 
  const invalidated = useMemo(
    () => invalid || (errortext && isNotEmptyString(errortext) ? true : false),
    [invalid, errortext]
  )
  const validated = useMemo(
    () => valid || (successtext && isNotEmptyString(successtext) ? true : false),
    [valid, successtext]
  )
	
	useEffect(() => {
		setIsInvalid(invalidated)
	}, [invalidated])
	
	useEffect(() => {
		setIsValid(validated)
	}, [validated])
	
	// Update the parent selected state ONCE upon initialisation when 1.) we are in a group context, 2.) there is no selected value set on the parent, but 3.) we have a Radio that is set to 'selected'
	useEffect(() => {
		if ( checked && radioGroupContext && (groupSelectedValue === undefined) ) {
			updateGroupSelectedValue(value) 
		}
	}, [] )
	
	// Update the Radio's own state variable when checked prop changes:
	useEffect(() => {
		if (!groupSelectedValue) {
			setIsChecked(checked)
		}
	}, [checked])
	

	const handleChange = () => {
		// Update the Radio's state:
		setIsChecked(!isChecked)
		// Update parent state ONLY if parent context exists and ONLY if the Radio is checked but not reflected in the parent’s selectedValue:
		if ( groupOnChange && typeof groupOnChange === "function") {
			if (groupSelectedValue !== value) {
				groupOnChange(value)
			}
		}
		// Run any other user-provided change handlers:
		onChange && onChange(value)
	}
	
	const determineChecked = () => {
		// If we are in a group context, determine whether this Radio's value is identical to the selectedValue  in the context, otherwise use its internal isChecked state:
		if (groupSelectedValue) {
			return groupSelectedValue === value
		} else {
			return isChecked
		}
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
	
	const theId = id || uniqueId()
	
	return (
		<div className={`jn-radio-outer`} >
			<div className={`juno-radio-wrapper ${wrapperStyles}`} >
				<div 
					className={`
 						juno-radio 
 						${ mockradiostyles } 
 						${ hasFocus ? mockfocusradiostyles : "" } 
 						${ disabled ? mockdisabledradiostyles : "" } 
 						${ isInvalid ? errorstyles : "" } 
 						${ isValid ? successstyles : ""} 
 						${ isInvalid || isValid ? "" : noBorderStyles }
 						${ className }
 					`}
					{...props}
					>
					<input 
						checked={ determineChecked() }
						className={`
							${inputstyles} 
							${isInvalid ? "juno-radio-invalid" : ""} 
							${ isValid ? "juno-radio-valid" : ""}
						`}
						disabled={ groupDisabled || disabled }
						id={theId}
						onBlur={handleBlur}
						onChange={handleChange}
						onClick={handleClick}
						onFocus={handleFocus}
						name={ groupName || name}
						type="radio"
						value={value}
					/>
					{ determineChecked() ? 
						<span className={`${checkedstyles}`}></span>
					:
						""
					}
				</div>
				{ label && isNotEmptyString(label) ?
						<>
							<Label 
								className={`${labelStyles}`}
								disabled={ groupDisabled || disabled }
								htmlFor={theId} 
								required={required}
								text={label} 
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
						""}
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

Radio.propTypes = {
	/** Whether the Radio is checked */
	checked: PropTypes.bool,
	/** Pass a custom className */
	className: PropTypes.string,
	/** Whether the Radio is disabled */
	disabled: PropTypes.bool,
	/** A text to render when the Radio has an error or could not be validated */ 
	errortext: PropTypes.string,
	/** A helptext to render to explain meaning and significance of the Radio */
	helptext: PropTypes.node,
	/** The id of the Radio */
	id: PropTypes.string,
	/** Whether the Radio was validated unsuccessfully */
	invalid: PropTypes.bool,
	/** The label of the Radio */
	label: PropTypes.string,
	/** The name attribute of the Radio. Only Radios sharing the same name attribute will work together as expected. */
	name: PropTypes.string,
	/** Handler to execute when the Radio changes */
	onChange: PropTypes.func,
	/** Handler to execute when the Radio is clicked */
	onClick: PropTypes.func,
	/** Whether the Radio is required */
	required: PropTypes.bool,
	/** A text to render when the Radio was successfully validated */
	successtext: PropTypes.string,
	/** Whether the Radio was successfully validated */
	valid: PropTypes.bool,
	/** The value of the Radio */
	value: PropTypes.string,
}

Radio.defaultProps = {
	checked: false,
	className: "",
	disabled: false,
	errortext: "",
	helptext: "",
	id: undefined,
	invalid: false,
	label: undefined,
	name: undefined,
	onChange: undefined,
	onClick: undefined,
	required: false,
	successtext: "",
	valid: false,
	value: undefined,
}

// ---------------------------------------------------------------------------------------------------------

// const wrapperStyles = `
// 	jn-inline-flex
// 	jn-items-center
// `
// 
// const inputstyles = `
// 	jn-w-4
// 	jn-h-4
// 	jn-opacity-0
// 	jn-z-50
// `
// 
// const mockradiostyles = `
// 	jn-relative
// 	jn-w-4
// 	jn-h-4
// 	jn-rounded-full
// 	jn-bg-theme-radio
// `
// 
// const checkedstyles = `
// 	jn-absolute
// 	jn-block
// 	jn-bg-theme-radio-checked
// 	jn-rounded-full
// 	jn-w-3
// 	jn-h-3
// 	jn-top-[1px]
// 	jn-left-[1px]
// `
// 
// const mockfocusradiostyles = `
// 	jn-outline-none
// 	jn-ring-2
// 	jn-ring-theme-focus
// `
// 
// const mockdisabledradiostyles = `
// 	jn-opacity-50
// 	jn-cursor-not-allowed
// `
// 
// const noBorderStyles = `
// 	jn-border
// 	jn-border-transparent
// `
// 
// const errorstyles = `
// 	jn-border
// 	jn-border-theme-error
// `
// 
// const successstyles = `
// 	jn-border
// 	jn-border-theme-success
// `
// 
// const labelStyles = `
// 	jn-leading-0
// 	jn-ml-2
// `
// 
// const iconStyles = `
// 	jn-ml-1
// `
// 
// const hintStyles = `
// 	jn-mt-0
// 	jn-ml-6
// `
// 
// 
// /** A controlled Radio component, label not included. */
// export const Radio = ({
// 	name,
// 	id,
// 	label,
// 	value,
// 	selected,
// 	checked,
// 	className,
// 	disabled,
// 	required,
// 	invalid,
// 	valid,
// 	helptext,
// 	successtext,
// 	errortext,
// 	onChange,
// 	onClick,
// 	...props
// }) => {
// 	
// 	const isNotEmptyString = (str) => {
// 		return !(typeof str === 'string' && str.trim().length === 0)
// 	}
// 	
// 	const [isChecked, setIsChecked] = useState(false)
// 	const [hasFocus, setHasFocus] = useState(false)
// 	const [isInvalid, setIsInvalid] = useState(false)
// 	const [isValid, setIsValid] = useState(false)
// 	
// 	useEffect( () => {
// 		setIsChecked(checked)
// 	}, [checked])
// 	
//   const invalidated = useMemo(
//     () => invalid || (errortext && isNotEmptyString(errortext) ? true : false),
//     [invalid, errortext]
//   )
//   const validated = useMemo(
//     () => valid || (successtext && isNotEmptyString(successtext) ? true : false),
//     [valid, successtext]
//   )
// 	
// 	useEffect(() => {
// 		setIsInvalid(invalidated)
// 	}, [invalidated])
// 	
// 	useEffect(() => {
// 		setIsValid(validated)
// 	}, [validated])
// 	
// 	const handleChange = (event) => {
// 		setIsChecked(!isChecked)
// 		onChange && onChange(event)
// 	}
// 	
// 	const handleFocus = () => {
// 		setHasFocus(true)
// 	}
// 	
// 	const handleBlur = () => {
// 		setHasFocus(false)
// 	}
// 	
// 	const handleClick = (event) => {
// 		onClick && onClick(event)
// 	}
// 	
// 	return (
// 		<div className={`jn-radio-outer`}>
// 			<div className={`juno-radio-wrapper ${wrapperStyles}`}>
// 				<div
// 					className={`
// 						juno-radio 
// 						${ mockradiostyles } 
// 						${ hasFocus ? mockfocusradiostyles : "" } 
// 						${ disabled ? mockdisabledradiostyles : "" } 
// 						${ isInvalid ? errorstyles : "" } 
// 						${ isValid ? successstyles : ""} 
// 						${ isInvalid || isValid ? "" : noBorderStyles }
// 						${className}
// 					`}
// 					{...props}
// 				>
// 					<input 
// 						type="radio"
// 						name={name}
// 						value={value}
// 						id={id}
// 						checked={isChecked}
// 						className={`${inputstyles} ${isInvalid ? "juno-radio-invalid" : ""} ${ isValid ? "juno-radio-valid" : ""}`}
// 						disabled={disabled}
// 						onChange={handleChange}
// 						onClick={handleClick}
// 						onFocus={handleFocus}
// 						onBlur={handleBlur}
// 					/>
// 					{ isChecked ? 
// 						<span className={`${checkedstyles}`}></span>
// 					:
// 						""
// 					}
// 				</div>
// 				{ label && isNotEmptyString(label) ?
// 						<>
// 							<Label text={label} htmlFor={id} disabled={disabled} required={required} className={`${labelStyles}`} />
// 							{isInvalid ? (
// 								<Icon
// 									icon="dangerous"
// 									color="jn-text-theme-error"
// 									size="1.125rem"
// 									className={`
// 										${iconStyles}
// 										${disabled ? "jn-opacity-50" :""}
// 									`}
// 								/>
// 							) : ""}
// 							{isValid ? (
// 								<Icon
// 									icon="checkCircle"
// 									color="jn-text-theme-success"
// 									size="1.125rem"
// 									className={`
// 										${iconStyles}
// 										${disabled ? "jn-opacity-50" :""}
// 									`}
// 								/>
// 							) : ""}
// 						</>
// 					:
// 						""
// 				}
// 			</div>
// 			{ errortext && isNotEmptyString(errortext) ?
// 					<FormHint text={errortext} variant="error" className={`${hintStyles}`} />
// 				:
// 					""
// 			}
// 			{ successtext && isNotEmptyString(successtext) ?
// 					<FormHint text={successtext} variant="success" className={`${hintStyles}`} />
// 				:
// 					""
// 			}
// 			{ helptext && isNotEmptyString(helptext) ?
// 					<FormHint text={helptext} className={`${hintStyles}`} />
// 				:
// 					""
// 			 }
// 		</div>
// 	)
// }
// 
// Radio.propTypes = {
// 	/** Name attribute */
// 	name: PropTypes.string,
// 	/** The label of the radio */
// 	label: PropTypes.string,
// 	/** Id of the checkbox */
// 	id: PropTypes.string,
// 	/** Pass a value the checkbox should represent.*/
// 	value: PropTypes.string,
// 	/** Whether the Radio is selected. */
// 	selected: PropTypes.bool,
// 	/**  DEPRECATED: Whether the Radio is selected. Use 'selected' instead.  */
// 	checked: PropTypes.bool,
// 	/** Pass a className */
// 	className: PropTypes.string,
// 	/** Whether the checkbox is disabled */
// 	disabled: PropTypes.bool,
// 	/** Whether the Radio is required */
// 	required: PropTypes.bool,
// 	/** Whether the Radio is invalid */
// 	invalid: PropTypes.bool,
// 	/** Whether the Radio is valid */
// 	valid: PropTypes.bool,
// 	/** A helptext to render to explain meaning and significance of the Radio */
// 	helptext: PropTypes.node,
// 	/** A text to render when the Radio was successfully validated */
// 	successtext: PropTypes.node,
// 	/** A text to render when the Radio has an error or could not be validated */
// 	errortext: PropTypes.node,
// 	/** Pass a change handler */
// 	onChange: PropTypes.func,
// 	/** Pass a click handler */
// 	onClick: PropTypes.func,
// }
// 
// Radio.defaultProps = {
// 	name: undefined,
// 	label: undefined,
// 	selected: false,
// 	checked: false,
// 	value: "",
// 	id: "",
// 	className: "",
// 	disabled: false,
// 	required: false,
// 	invalid: false,
// 	valid: false,
// 	helptext: "",
// 	successtext: "",
// 	errortext: "",
// 	onChange: undefined,
// 	onClick: undefined,
// }
