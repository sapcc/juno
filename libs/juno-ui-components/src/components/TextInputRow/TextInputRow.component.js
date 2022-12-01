import React, { useState, useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import { TextInput } from "../TextInput/index.js"
import { Label } from "../Label/index.js"
import { Icon } from "../Icon/index"

/* Stacked: Label is above the text input element */
const stackedcontainerstyles = `
	jn-flex
	jn-flex-col
  jn-mb-2
`
/* Floating: Label is inside the text input element. This is the overall container.  */
const floatingcontainerstyles = `
	jn-relative
	jn-mb-2
`
/* Styles for FLOATING label container element depending on whether it is currently minimized or not. */
/* All transforms are applied to the container element! */
const floatinglabelcontainerstyles = (minimizedLabel) => {
  return `
    jn-absolute
    jn-top-0
    jn-left-0
    jn-p-2.5
    jn-pl-3
    jn-pt-[0.4325rem]
    jn-pointer-events-none
    jn-transform 
    jn-origin-top-left 
    jn-transition-all 
    jn-duration-100 
    jn-ease-in-out
    jn-z-10

    ${
      minimizedLabel &&
      `
      jn-scale-75
      jn-opacity-75
      -jn-translate-y-1
      jn-translate-x-2
      `
    }
  `
}

/* Styles for floating input element depending on whether the label is minimized or not: */
const floatinginputstyles = (minimizedLabel) => {
  return `
    ${
      minimizedLabel
        ? `
      jn-px-4
      jn-pt-[1.125rem]
      jn-pb-1  
      `
        : `
      jn-p-4 
      jn-pt-4
      `
    }
    jn-placeholder-transparent
    jn-w-full
  `
}

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
  jn-flex
  jn-absolute
  jn-top-1.5
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

const getContainerStyles = (variant) => {
  if (variant === "stacked") {
    return stackedcontainerstyles
  } else {
    return floatingcontainerstyles
  }
}

const getLabelContainerStyles = (variant, minimized) => {
  if (variant === "stacked") {
    return ""
  } else {
    return floatinglabelcontainerstyles(minimized)
  }
}

const getInputStyles = (variant, minimized) => {
  if (variant === "stacked") {
    return stackedinputstyles
  } else {
    return floatinginputstyles(minimized)
  }
}

/** A text input group containing an input of type text, password, email, tel, or url, an associated label, and necessary structural markup. */
export const TextInputRow = ({
  type,
  variant,
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
    if (onChange) onChange(event)
  }

  const handleFocus = (event) => {
    setFocus(true)
    if (onFocus) onFocus(event)
  }
  const handleBlur = (event) => {
    setFocus(false)
    if (onBlur) onBlur(event)
  }

  /* check whether the label is minimized (either has focus and / or has a value) */
  const minimizedLabel = (variant, value, focus) => {
    if (variant === "floating") {
      if (focus || (value && value.length > 0)) {
        return true
      }
    }
    return false
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
      className={`juno-textinput-row juno-textinput-row-${variant} ${getContainerStyles(
        variant
      )} ${className}`}
      {...props}
    >
      <div
        className={`juno-label-container ${getLabelContainerStyles(
          variant,
          minimizedLabel(variant, val, focus)
        )}`}
      >
        <Label
          text={label}
          htmlFor={id}
          required={required}
          variant={variant}
          disabled={variant === "stacked" && disabled ? disabled : false}
        />
      </div>
      <div className={`juno-input-container ${inputcontainerstyles}`}>
        <TextInput
          type={type}
          value={val}
          name={name}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          invalid={isInvalid}
          valid={isValid}
          autoFocus={autoFocus}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`${getInputStyles(
            variant,
            minimizedLabel(variant, val, focus)
          )} ${inputrightpadding()}`}
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
    </div>
  )
}

TextInputRow.propTypes = {
  /** The type of the input element to render */
  type: PropTypes.oneOf(["text", "password", "email", "tel", "url", "number"]),
  /** Floating (default) or stacked layout variant */
  variant: PropTypes.oneOf(["floating", "stacked"]),
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
  variant: "floating",
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
