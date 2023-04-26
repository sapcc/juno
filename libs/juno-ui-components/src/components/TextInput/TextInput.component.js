import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index"

const textinputstyles = `
	jn-bg-theme-textinput
	jn-text-theme-textinput
	jn-text-base
	jn-leading-4
	jn-p-4
	jn-h-textinput
	jn-border
	jn-rounded-3px
	focus:jn-outline-none
	focus:jn-ring-2
	focus:jn-ring-theme-focus
	disabled:jn-opacity-50
`

const defaultborderstyles = `
	jn-border-transparent
`

const invalidstyles = `
	jn-border-theme-error
`

const validstyles = `
	jn-border-theme-success
`

const wrapperStyles = `
  jn-relative
`

const labelStyles = `
  jn-absolute
  jn-pointer-events-none
  jn-top-0
  jn-left-0
  jn-top-[-0.125rem]
  jn-left-[0.9375rem]
  jn-transform 
  jn-origin-top-left 
  jn-transition-all 
  jn-duration-100 
  jn-ease-in-out
  jn-z-10
`

const minLabelStyles = `
  jn-scale-75
  -jn-translate-y-1
`

/** 
A controlled Text Input.
Also covers email, telephone, password, url derivates. 
*/
export const TextInput = ({
  name,
  value,
  id,
  type,
  placeholder,
  disabled,
  readOnly,
  invalid,
  valid,
  autoFocus,
  className,
  label,
  autoComplete,
  onChange,
  ...props
}) => {
  const [val, setValue] = useState("")
  const [isInvalid, setIsInvalid] = useState(false)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    setValue(value)
  }, [value])

  useEffect(() => {
    setIsInvalid(invalid)
  }, [invalid])

  useEffect(() => {
    setIsValid(valid)
  }, [valid])

  const handleInputChange = (event) => {
    setValue(event.target.value)
    onChange && onChange(event)
  }

  return (
    <span 
      className={`juno-form-input-wrapper ${wrapperStyles}`} 
      >
      { label && label.length ? 
          <label 
            htmlFor={id || null} 
            className={`juno-label ${labelStyles} ${ val && val.length ? minLabelStyles : "" }`} 
          >
            {label}
          </label>
        :
          ""
      }
      <input
        type={type}
        name={name || "unnamed input"}
        autoComplete={autoComplete}
        value={val}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        autoFocus={autoFocus}
        onChange={handleInputChange}
        className={`juno-textinput ${textinputstyles} ${
          isInvalid ? "juno-textinput-invalid " + invalidstyles : ""
        } ${isValid ? "juno-textinput-valid " + validstyles : ""}  ${
          isValid || isInvalid ? "" : defaultborderstyles
        } ${className}`}
        {...props}
      />
    </span>
  )
}

TextInput.propTypes = {
  /** Pass a name attribute */
  name: PropTypes.string,
  /** Pass a value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Pass an id */
  id: PropTypes.string,
  /** Pass a placeholder */
  placeholder: PropTypes.string,
  /** Render a disabled input */
  disabled: PropTypes.bool,
  /** Render a readonly input */
  readOnly: PropTypes.bool,
  /** Whether the field is invalid */
  invalid: PropTypes.bool,
  /** Whether the field is valid */
  valid: PropTypes.bool,
  /** Whether the field receives autofocus */
  autoFocus: PropTypes.bool,
  /** Pass a classname */
  className: PropTypes.string,
  /** Pass a valid autocomplete value. We do not police validity. */
  autoComplete: PropTypes.string,
  /** Pass a handler */
  onChange: PropTypes.func,
  /** Specify the type attribute. Defaults to an input with no type attribute, which in turn will be treateas as type="text" by browsers. */
  type: PropTypes.oneOf(["text", "email", "password", "tel", "url", "number"]),
  /** The label of the input */
  label: PropTypes.string,
}

TextInput.defaultProps = {
  value: "",
  id: "",
  placeholder: "",
  disabled: false,
  readOnly: false,
  invalid: false,
  valid: false,
  autoFocus: false,
  className: "",
  autoComplete: "off",
  onChange: undefined,
  type: null,
  label: undefined,
}
