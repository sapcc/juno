import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { TextInput } from "../TextInput/index.js"
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
  return (
    `
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

    ${minimizedLabel &&
      `
      jn-scale-75
      jn-opacity-75
      -jn-translate-y-1
      jn-translate-x-2
      `
    }
  `
  )
} 

/* Styles for floating input element depending on whether the label is minimized or not: */
const floatinginputstyles = (minimizedLabel) => { 
  return (
    `
    ${minimizedLabel ? `
      jn-px-4
      jn-pt-[1.125rem]
      jn-pb-1  
      `
      :
      `
      jn-p-4 
      jn-pt-4
      `
    }
    jn-placeholder-transparent
    jn-w-full
  `
  )
}

const helptextstyles = `
	jn-text-xs
	jn-text-theme-light
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
  className,
  disabled,
  onChange,
  ...props
}) => {
  const [val, setValue] = useState("")
  const [focus, setFocus] = useState(false)

  React.useEffect(() => {
    setValue(value)
  }, [value])

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
      className={`juno-textinput-row juno-textinput-row-${variant} ${getContainerStyles(variant)} ${className}`}
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
      <div className={`juno-input-container`}>
        <TextInput
          type={type}
          value={val}
          name={name}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`${getInputStyles(variant, minimizedLabel(variant, val, focus))}`}
        />
        {helptext ? <p className={`${helptextstyles}`}>{helptext}</p> : ""}
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
  /** Pass a className */
  className: PropTypes.string,
  /** Disable the input */
  disabled: PropTypes.bool,
  /** Pass a handler to the input element */
  onChange: PropTypes.func,
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
  className: "",
  disabled: null,
  onChange: undefined,
}
