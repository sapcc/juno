import React, { useState, useEffect, useMemo, useId, useRef } from "react"
import PropTypes from "prop-types"
import { Label } from "../Label/index"
import { Icon } from "../Icon/index"
import { FormHint } from "../FormHint/"

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
  jn-pointer-events-none
  jn-top-2
  jn-left-[0.9375rem]
`

const iconcontainerstyles = `
  jn-inline-flex
  jn-absolute
  jn-top-[.4rem]
  jn-right-3
`

const disablediconstyles = `
  jn-opacity-50
`

const iconstyles = `
  jn-inline-block 
  jn-ml-1 
  jn-leading-1
  jn-mt-[-.2rem]
`

const hintStyles = `
  jn-mt-0
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
  helptext,
  successtext,
  errortext,
  autoComplete,
  width,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  
  const isNotEmptyString = (str) => {
    return !(typeof str === 'string' && str.trim().length === 0)
  }
  
  const uniqueId = () => (
    "juno-textinput-" + useId()
  )
  
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
  
  const Icons = ({ disabled }) => {
    if (isValid || isInvalid) {
      return (
        <div
          className={`juno-textinput-row-icon-container ${iconcontainerstyles} ${
            disabled ? disablediconstyles : ""
          }`}
        >
          {isInvalid ? (
            <Icon icon="dangerous" color="jn-text-theme-error" />
          ) : null}
          {isValid ? (
            <Icon icon="checkCircle" color="jn-text-theme-success" />
          ) : null}
        </div>
      )
    } else {
      return ""
    }
  }
  
  const theId = id || uniqueId()
  
  return (
    <div>
      <span 
        className={`
          juno-textinput-wrapper 
          ${wrapperStyles}
          ${ width == "auto" ? "jn-inline-block" : "jn-block" }
          ${ width == "auto" ? "jn-w-auto" : "jn-w-full" }
          `} 
        >
        { label && label.length ?
            <Label 
              text={label}
              htmlFor={theId}
              className={`${labelStyles}`}
              disabled={disabled}
              required={required}
              floating
              minimized={ placeholder || hasFocus || val && val.length ? true : false}
            />
          :
            ""
        }
        <input
          type={type}
          name={name}
          autoComplete={autoComplete}
          value={val}
          id={theId}
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
        <Icons disabled={disabled} />
      </span>
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
  /** A helptext to render to explain meaning and significance of the TextInput */
  helptext: PropTypes.node,
  /** A text to render when the TextInput was successfully validated */
  successtext: PropTypes.node,
  /** A text to render when the TextInput has an error or could not be validated */
  errortext: PropTypes.node,
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
  helptext: "",
  successtext: "",
  errortext: "",
  onChange: undefined,
  onFocus: undefined,
  onBlur: undefined,
  type: null,
  label: undefined,
  width: "full",
}
