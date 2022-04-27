import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Textarea } from "../Textarea/index.js"
import { Label } from "../Label/index.js"

/* Stacked: Label is above the text input element */
const stackedcontainerstyles = `
	flex
	flex-col
	mb-2
`

/* Floating: Label is inside the text input element. This is the overall container.  */
const floatingcontainerstyles = `
	relative
	mb-2
`

/* Styles for FLOATING label container element depending on whether it is currently minimized or not. */
/* All transforms are applied to the container element! */
const floatinglabelcontainerstyles = (minimizedLabel) => {
  return `
    absolute
    top-0
    left-0
    p-2.5
    pl-3
    pt-[0.4325rem]
    pointer-events-none
    transform 
    origin-top-left 
    transition-all 
    duration-100 
    ease-in-out

    ${
      minimizedLabel &&
      `
      scale-75
      opacity-75
      -translate-y-2
      translate-x-1
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
      px-4
      pt-[1.125]
      pb-1
      `
        : `
      p-3 
      pt-4
      `
    }
    placeholder-transparent
    w-full
  `
}

const helptextstyles = `
	text-xs
	text-theme-light
	mt-1
`

const stackedinputstyles = `
	w-full
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
      className={`juno-textarea-row ${getContainerStyles(variant)} ${className}`}
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
  /** Pass a classnName to the Textarea */
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
  helptext: null,
  className: "",
  disabled: null,
  onChange: undefined,
}
