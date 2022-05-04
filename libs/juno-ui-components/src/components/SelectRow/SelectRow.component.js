import React from "react"
import PropTypes from "prop-types"
import { Select } from "../Select/index.js"
import { Label } from "../Label/index.js"

const selectrow = `
	flex
	flex-col
	mb-2
`

const helptextstyles = `
	text-xs
	text-theme-light
	mt-1
`

const selectstyles = `
	w-full
`

const floatingcontainerstyles = `
  relative
`

const floatinglabelcontainerstyles = `
  absolute
  top-0.5
  left-4
  transform 
  origin-top-left 
  scale-75
  opacity-75
`

const floatingselectstyles = `
  pt-[0.8125rem]
`

/** A select group containing an input of type text, password, email, tel, or url, an associated label, and necessary structural markup. */
export const SelectRow = ({
  name,
  variant,
  label,
  id,
  helptext,
  required,
  className,
  disabled,
  children,
  onChange,
  ...props
}) => {
  // labelContainer needs to be rendered in different markup order /positions depending on variant in order to avoid z-index hassle:
  const labelContainer = 
    <div className={`juno-label-container ${ variant === 'floating' ? floatinglabelcontainerstyles : ''}`}>
      <Label
        text={label}
        htmlFor={id}
        required={required}
        disabled={disabled}
      />
    </div>
  
  return (
    <div className={`juno-select-row juno-select-row-${variant} ${selectrow} ${ variant === 'floating' ? floatingcontainerstyles : ''} ${className}`} {...props}>
      { variant !== 'floating' ? labelContainer : null }
      <div>
        <Select
          className={`${selectstyles} ${ variant === 'floating' ? floatingselectstyles : ''}`}
          name={name}
          id={id}
          onChange={onChange}
          disabled={disabled}
        >
          {children}
        </Select>
        { variant === 'floating' ? labelContainer : null }
        {helptext ? <p className={`${helptextstyles}`}>{helptext}</p> : ""}
      </div>
    </div>
  )
}

SelectRow.propTypes = {
  /** Name attribute of the input */
  name: PropTypes.string,
  /** Floating (default) or stacked layout variant */
  variant: PropTypes.oneOf(["floating", "stacked"]),
  /** Label text */
  label: PropTypes.string,
  /** Id */
  id: PropTypes.string,
  /** Help text */
  helptext: PropTypes.node,
  /** Specify whether the select is required */
  required: PropTypes.bool,
  /** Pass a classname */
  className: PropTypes.string,
  /** Disable the select */
  disabled: PropTypes.bool,
  /** Children to render */
  children: PropTypes.node,
  /** Pass a handler to the Select element */
  onChange: PropTypes.func,
}

SelectRow.defaultProps = {
  name: null,
  variant: "floating",
  label: null,
  id: null,
  required: null,
  className: "",
  helptext: null,
  disabled: null,
  onChange: undefined,
}
