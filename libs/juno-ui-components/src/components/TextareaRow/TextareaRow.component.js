import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Textarea } from "../Textarea/index.js"
import { Label } from "../Label/index.js"

const stackedcontainerstyles = `
	flex
	flex-col
	mb-2
`

const floatingcontainerstyles = `
	relative
	mb-2
`

const floatinglabelcontainerstyles = (minimizedLabel) => {

  return (
    `
    absolute
    top-0
    left-0
    p-2.5
    pointer-events-none
    transform 
    origin-top-left 
    transition-all 
    duration-100 
    ease-in-out

    ${minimizedLabel &&
      `
      scale-75
      opacity-75
      pt-3
      -translate-y-2
      translate-x-1
      `
    }
  `
  )
} 

const floatinginputstyles = (minimizedLabel) => { 
  
  return (
    `
    ${minimizedLabel ? `
      px-3
      pt-5
      `
      :
      `
      p-3 
      pt-4
      `
    }
    placeholder-transparent
    w-full
  `
  )
}

const helptextstyles = `
	text-xs
	text-theme-light
	mt-1
`

const stackedinputstyles = `
	w-full
`

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
    onChange()
  }

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
      className={`juno-textarea-row ${variantStyle(
        variant,
        "container"
      )} ${className}`}
      {...props}
    >
      <div
        className={`juno-label-container ${variantStyle(
          variant,
          "labelcontainer",
          minimizedLabel(variant, val, focus))}`}
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
          className={`${variantStyle(variant, "input", minimizedLabel(variant, val, focus))}`}
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
  helptext: PropTypes.string,
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
