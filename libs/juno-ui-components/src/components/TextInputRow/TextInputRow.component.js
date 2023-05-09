import React, { useState, useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import { TextInput } from "../TextInput/index.js"
import { Label } from "../Label/index.js"
import { Icon } from "../Icon/index"


const inputcontainerstyles = `
  jn-relative
`

const helptextstyles = `
	jn-text-xs
	jn-text-theme-light
	jn-mt-1
`

const errortextstyles = `
  jn-text-xs
  jn-text-theme-error
  jn-mt-1
`

const successtextstyles = `
  jn-text-xs
  jn-text-theme-success
  jn-mt-1
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

const stackedinputstyles = `
	jn-w-full
`

const iconpadding = `
  jn-pr-10
`


/** A text input group containing an input of type text, password, email, tel, or url, an associated label, and necessary structural markup. */
export const TextInputRow = ({
  type,
  value,
  name,
  label,
  id,
  placeholder,
  helptext,
  required,
  invalid,
  errortext,
  valid,
  successtext,
  autoFocus,
  className,
  disabled,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  const [val, setValue] = useState("")
  const [focus, setFocus] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [isValid, setIsValid] = useState(false)

  React.useEffect(() => {
    setValue(value)
  }, [value])

  const invalidated = useMemo(
    () => invalid || (errortext && errortext.length ? true : false),
    [invalid, errortext]
  )
  const validated = useMemo(
    () => valid || (successtext && successtext.length ? true : false),
    [valid, successtext]
  )

  useEffect(() => {
    setIsInvalid(invalidated)
  }, [invalidated])

  useEffect(() => {
    setIsValid(validated)
  }, [validated])

  useEffect(() => {
    setFocus(autoFocus)
  }, [autoFocus])

  const handleChange = (event) => {
    setValue(event.target.value)
    onChange && onChange(event)
  }

  const handleFocus = (event) => {
    setFocus(true)
    if (onFocus) onFocus(event)
  }
  const handleBlur = (event) => {
    setFocus(false)
    if (onBlur) onBlur(event)
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

  const inputrightpadding = () => {
    if (isValid || isInvalid) {
      return iconpadding
    } else {
      return ""
    }
  }

  return (
    <div
      className={`juno-textinput-row ${className}`}
      {...props}
    >
      <TextInput
        type={type}
        value={val}
        name={name}
        id={id}
        label={label}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        invalid={isInvalid}
        valid={isValid}
        autoFocus={autoFocus}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Icons disabled={disabled} />
      {errortext && errortext.length ? (
        <p className={`${errortextstyles}`}>{errortext}</p>
      ) : null}
      {successtext && successtext.length ? (
        <p className={`${successtextstyles}`}>{successtext}</p>
      ) : null}
      {helptext ? <p className={`${helptextstyles}`}>{helptext}</p> : null}
    </div>
  )
}

TextInputRow.propTypes = {
  /** The type of the input element to render */
  type: PropTypes.oneOf(["text", "password", "email", "tel", "url", "number"]),
  /** Optional initial value */
  value: PropTypes.string,
  /** Name attribute of the input */
  name: PropTypes.string,
  /** Label text */
  label: PropTypes.string,
  /** Id */
  id: PropTypes.string,
  /** Placeholder for the text input. Will not be visible on floating label inputs. */
  placeholder: PropTypes.string,
  /** Help text */
  helptext: PropTypes.node,
  /** Specify whether the input is required */
  required: PropTypes.bool,
  /** Whether the input is invalid */
  invalid: PropTypes.bool,
  /** Error text to display below the input element. When passed, the component will be set to invalid automatically. */
  errortext: PropTypes.string,
  /** Whether the input is valid */
  valid: PropTypes.bool,
  /** Text to display when validation is successful. Will automatically set the field to valid if passed. */
  successtext: PropTypes.string,
  /** Whether the input element should automatically receive focus */
  autoFocus: PropTypes.bool,
  /** Pass a className */
  className: PropTypes.string,
  /** Disable the input */
  disabled: PropTypes.bool,
  /** Pass a handler to the input element */
  onChange: PropTypes.func,
  /** Pass a handler to the input element */
  onFocus: PropTypes.func,
  /** Pass a handler to the input element */
  onBlur: PropTypes.func,
}

TextInputRow.defaultProps = {
  type: null,
  value: "",
  name: null,
  label: null,
  id: null,
  placeholder: null,
  helptext: null,
  required: null,
  invalid: false,
  errortext: "",
  valid: false,
  successtext: "",
  autoFocus: false,
  className: "",
  disabled: null,
  onChange: undefined,
  onFocus: undefined,
  onBlur: undefined,
}
