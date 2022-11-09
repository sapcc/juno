import React, { useState, useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import { Textarea } from "../Textarea/index.js"
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
      -jn-translate-y-2
      jn-translate-x-1
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
      jn-pt-[1.125]
      jn-pb-1
      `
        : `
      jn-p-3 
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

const stackedinputstyles = `
	jn-w-full
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

const variantStyle = (variant, element, isLabelMinimized) => {
  switch (variant) {
    case "floating":
      switch (element) {
        case "container":
          return floatingcontainerstyles
        case "labelcontainer":
          return floatinglabelcontainerstyles(isLabelMinimized)
        case "input":
          return floatinginputstyles(isLabelMinimized)
      }
    case "stacked":
      switch (element) {
        case "container":
          return stackedcontainerstyles
        case "input":
          return stackedinputstyles
      }
  }
}

/** A textarea group containing a textarea, associated label, optional helptext, and structural markup */

export const TextareaRow = ({
  value,
  variant,
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
  className,
  disabled,
  onChange,
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

  const handleChange = (event) => {
    setValue(event.target.value)
    onChange(event)
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
  
  const textarearightpadding = () => {
    if ( isValid || isInvalid ) {
      return iconpadding
    } else {
      return ""
    }
  }

  return (
    <div
      className={`juno-textarea-row juno-textarea-row-${variant} ${getContainerStyles(
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
        <Textarea
          value={val}
          name={name}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          invalid={isInvalid}
          valid={isValid}
          onChange={handleChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`${getInputStyles(
            variant,
            minimizedLabel(variant, val, focus)
          )} ${textarearightpadding()}`}
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

TextareaRow.propTypes = {
  /** Optional initial value */
  value: PropTypes.string,
  /** Name attribute of the textarea element */
  name: PropTypes.string,
  /** Label text */
  label: PropTypes.string,
  /** Id */
  id: PropTypes.string,
  /** Help text */
  helptext: PropTypes.node,
  /** Placeholder for the text input. Will not be visible on floating label inputs. */
  placeholder: PropTypes.string,
  /** Specify whether the input is required */
  required: PropTypes.bool,
  /** Whether the field is invalid */
  invalid: PropTypes.bool,
  /** Error text to display when validation fails. Will automatically invalidate the field if passed. */
  errortext: PropTypes.string,
  /** Whether the field is valid */
  valid: PropTypes.bool,
  /** Text to display when validation is successful. Will automatically set the field to valid if passed. */
  successtext: PropTypes.string,
  /** Pass a className to the Textarea */
  className: PropTypes.string,
  /** Floating (default) or stacked layout variant */
  variant: PropTypes.oneOf(["floating", "stacked"]),
  /** Disable the textarea */
  disabled: PropTypes.bool,
  /** Pass a handler to the checkbox element */
  onChange: PropTypes.func,
}

TextareaRow.defaultProps = {
  value: "",
  variant: "floating",
  name: null,
  label: null,
  id: null,
  placeholder: null,
  required: null,
  invalid: false,
  errortext: "",
  valid: false,
  successtext: "",
  helptext: null,
  className: "",
  disabled: null,
  onChange: undefined,
}
