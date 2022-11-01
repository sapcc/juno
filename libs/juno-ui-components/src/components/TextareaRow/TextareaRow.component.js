import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Textarea } from "../Textarea/index.js"
import { Label } from "../Label/index.js"

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

const stackedinputstyles = `
	jn-w-full
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
  className,
  disabled,
  onChange,
  ...props
}) => {
  const [val, setValue] = useState("")
  const [focus, setFocus] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)

  React.useEffect(() => {
    setValue(value)
  }, [value])
  
  const invalidated = invalid || (errortext && errortext.length ? true : false)
  
  React.useEffect(() => {
    setIsInvalid(invalidated)
  }, [invalidated])

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

  return (
    <div
      className={`juno-textarea-row juno-textarea-row-${variant} ${getContainerStyles(variant)} ${className}`}
      {...props}
    >
      <div
        className={`juno-label-container ${getLabelContainerStyles(variant, minimizedLabel(variant, val, focus))}`}
      >
        <Label
          text={label}
          htmlFor={id}
          required={required}
          variant={variant}
          disabled={variant === "stacked" && disabled ? disabled : false}
        />
      </div>
      <div>
        <Textarea
          value={val}
          name={name}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          invalid={isInvalid}
          onChange={handleChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`${getInputStyles(variant, minimizedLabel(variant, val, focus))}`}
        />
        { errortext && errortext.length ? <p className={`${errortextstyles}`}>{errortext}</p> : null }
        { helptext ? <p className={`${helptextstyles}`}>{helptext}</p> : "" }
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
  helptext: null,
  className: "",
  disabled: null,
  onChange: undefined,
}
