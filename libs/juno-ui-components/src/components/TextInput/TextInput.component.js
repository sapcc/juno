import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index"

const textinputstyles = `
	jn-bg-theme-textinput
	jn-text-theme-textinput
  jn-border
	jn-text-base
	jn-leading-4
	jn-px-4
	jn-h-textinput
	jn-rounded-3px
	focus:jn-outline-none
	focus:jn-ring-2
	focus:jn-ring-theme-focus
	disabled:jn-opacity-50
`

const defaultborderstyles = `
	jn-border-theme-textinput-default
`

const invalidstyles = `
	jn-border-theme-error
`

const validstyles = `
	jn-border-theme-success
`

const withLabelStyles = `
  jn-pt-[1.125rem] 
  jn-pb-1
`

const noLabelStyles = `
  jn-py-4
`

const wrapperStyles = `
  jn-inline-block
  jn-relative
`

const labelStyles = `
  jn-absolute
  jn-pointer-events-none
  jn-top-2
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
  -jn-translate-y-[0.4375rem]
`

const requiredLabelStyles = `
    jn-inline-block
    jn-w-1
    jn-h-1
    jn-rounded-full
    jn-align-top
    jn-ml-1
    jn-mt-2
    jn-bg-theme-required
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
  required,
  invalid,
  valid,
  autoFocus,
  className,
  label,
  autoComplete,
  width,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  const ref = useRef()
  const [val, setValue] = useState("")
  const [hasFocus, setFocus] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [isValid, setIsValid] = useState(false)
  
  /* Set the focus state variable in case the input was focussed by passing autoFocus, or when the input was rendered and focussed by the user before React started listening to client side events, e.g. when rendering server-side: */
  useEffect(() => {
    if (document.hasFocus() && ref.current.contains(document.activeElement)) {
      setFocus(true);
    }
  }, [])
  
  useEffect(() => {
    setValue(value)
  }, [value])

  useEffect(() => {
    setIsInvalid(invalid)
  }, [invalid])

  useEffect(() => {
    setIsValid(valid)
  }, [valid])

  const handleValueChange = (event) => {
    setValue(event.target.value)
    onChange && onChange(event)
  }
  
  const handleFocus = (event) => {
    setFocus(true)
    onFocus && onFocus(event)
  }
  
  const handleBlur = (event) => {
    setFocus(false)
    onBlur && onBlur(event)
  }
  
  return (
    <span 
      className={`
        juno-textinput-wrapper 
        ${wrapperStyles}
        ${ width == "auto" ? "jn-inline-block" : "jn-block" }
        ${ width == "auto" ? "jn-w-auto" : "jn-w-full" }
        `} 
      >
      { label && label.length ?
          <label 
            htmlFor={id || null} 
            className={`juno-label ${labelStyles} ${ placeholder || hasFocus || val && val.length ? minLabelStyles : "" }`} 
          >
            {label}
            { required ? <span className={`required ${requiredLabelStyles}`} ></span> : "" }
          </label>  
        :
          ""
      }
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        value={val}
        id={id}
        ref={ref}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        autoFocus={autoFocus}
        onChange={handleValueChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={
          `juno-textinput 
          ${ textinputstyles }
          ${ label ? withLabelStyles : noLabelStyles }
          ${ isInvalid ? "juno-textinput-invalid " + invalidstyles : "" } 
          ${ isValid ? "juno-textinput-valid " + validstyles : "" }  
          ${ isValid || isInvalid ? "" : defaultborderstyles } 
          ${ width == "auto" ? "jn-w-auto" : "jn-w-full" }
          ${ className }
        `}
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
  /** Whether the field is required */
  required: PropTypes.bool,
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
  /** Pass a change handler */
  onChange: PropTypes.func,
  /** Pass a focus handler */
  onFocus: PropTypes.func,
  /** Pass a blur handler */
  onBlur: PropTypes.func,
  /** Specify the type attribute. Defaults to an input with no type attribute, which in turn will be treateas as type="text" by browsers. */
  type: PropTypes.oneOf(["text", "email", "password", "tel", "url", "number"]),
  /** The label of the input */
  label: PropTypes.string,
  /** The width of the text input. Either 'full' (default) or 'auto'. */
  width: PropTypes.oneOf(["full", "auto"]),
}

TextInput.defaultProps = {
  value: "",
  id: "",
  placeholder: "",
  disabled: false,
  readOnly: false,
  required: false,
  invalid: false,
  valid: false,
  autoFocus: false,
  className: "",
  autoComplete: "off",
  onChange: undefined,
  onFocus: undefined,
  onBlur: undefined,
  type: null,
  label: undefined,
  width: "full",
}
