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


/** A controlled Radio component, label not included. */
export const Radio = ({
	name,
	id,
	label,
	value,
	checked,
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
	
	useEffect(() => {
		setIsInvalid(invalidated)
	}, [invalidated])
	
	useEffect(() => {
		setIsValid(validated)
	}, [validated])
	
	const handleChange = (event) => {
		setIsChecked(!isChecked)
		onChange && onChange(event)
	}
	
	const handleFocus = () => {
		setHasFocus(true)
	}
	
	const handleBlur = () => {
		setHasFocus(false)
	}
	
	const handleClick = (event) => {
		onClick && onClick(event)
	}
	
	return (
		<div className={`jn-radio-outer`}>
			<div className={`juno-radio-wrapper ${wrapperStyles}`}>
				<div
					className={`
						juno-radio 
						${ mockradiostyles } 
						${ hasFocus ? mockfocusradiostyles : "" } 
						${ disabled ? mockdisabledradiostyles : "" } 
						${ isInvalid ? errorstyles : "" } 
						${ isInvalid ? "juno-radio-invalid" : "" }
						${ isValid ? successstyles : ""} 
						${ isValid ? "juno-radio-valid" : "" }
						${ isInvalid || isValid ? "" : noBorderStyles }
						${className}
					`}
					{...props}
				>
					<input 
						type="radio"
						name={name || "unnamed radio"}
						value={value}
						id={id}
						checked={isChecked}
						className={`${inputstyles} ${isInvalid ? "juno-radio-invalid" : ""} ${ isValid ? "juno-radio-valid" : ""}`}
						disabled={disabled}
						onChange={handleChange}
						onClick={handleClick}
						onFocus={handleFocus}
						onBlur={handleBlur}
					/>
					{ isChecked ? 
						<span className={`${checkedstyles}`}></span>
					:
						""
					}
				</div>
				{ label && isNotEmptyString(label) ?
						<>
							<Label text={label} htmlFor={id} disabled={disabled} required={required} className={`${labelStyles}`} />
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

Radio.propTypes = {
	/** Name attribute */
	name: PropTypes.string,
	/** The label of the radio */
	label: PropTypes.string,
	/** Id of the checkbox */
	id: PropTypes.string,
	/** Pass a value the checkbox should represent.*/
	value: PropTypes.string,
	/**  Pass checked state  */
	checked: PropTypes.bool,
	/** Pass a className */
	className: PropTypes.string,
	/** Whether the checkbox is disabled */
	disabled: PropTypes.bool,
	/** Whether the Radio is required */
	required: PropTypes.bool,
	/** Whether the Radio is invalid */
	invalid: PropTypes.bool,
	/** Whether the Radio is valid */
	valid: PropTypes.bool,
	/** A helptext to render to explain meaning and significance of the Radio */
	helptext: PropTypes.node,
	/** A text to render when the Radio was successfully validated */
	successtext: PropTypes.node,
	/** A text to render when the Radio has an error or could not be validated */
	errortext: PropTypes.node,
	/** Pass a change handler */
	onChange: PropTypes.func,
	/** Pass a click handler */
	onClick: PropTypes.func,
}

Radio.defaultProps = {
	name: undefined,
	label: undefined,
	checked: false,
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
