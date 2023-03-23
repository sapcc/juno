import React, { useState, useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import { Select } from "../Select/index.js"
import { Label } from "../Label/index.js"

const selectrow = `
	jn-flex
	jn-flex-col
	jn-mb-2
`

const helptextstyles = `
	jn-text-xs
	jn-text-theme-light
	jn-mt-1
`

const selectstyles = `
	jn-w-full
`

const floatingcontainerstyles = `
  jn-relative
`

const floatinglabelcontainerstyles = `
  jn-absolute
  jn-top-0.5
  jn-left-4
  jn-transform 
  jn-origin-top-left 
  jn-scale-75
  jn-opacity-75
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
  invalid,
  errortext,
  valid,
  successtext,
  children,
  value,
  onChange,
  defaultValue,
  ...props
}) => {
  const [isInvalid, setIsInvalid] = useState(false)
  const [isValid, setIsValid] = useState(false)

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

  // labelContainer needs to be rendered in different markup order /positions depending on variant in order to avoid z-index hassle:
  const labelContainer = (
    <div
      className={`juno-label-container ${
        variant === "floating" ? floatinglabelcontainerstyles : ""
      }`}
    >
      <Label
        text={label}
        htmlFor={id}
        required={required}
        disabled={disabled}
      />
    </div>
  )

  return (
    <div
      className={`juno-select-row juno-select-row-${variant} ${selectrow} ${
        variant === "floating" ? floatingcontainerstyles : ""
      } ${className}`}
      {...props}
    >
      {variant !== "floating" ? labelContainer : null}
      <div>
        <Select
          className={`${selectstyles}`}
          labelClassName={ variant === "floating" ? "jn-pt-[0.8125rem]" : "" }
          name={name}
          id={id}
          onChange={onChange}
          disabled={disabled}
          invalid={isInvalid}
          valid={isValid}
          value={value}
          defaultValue={defaultValue}
        >
          {children}
        </Select>
        {variant === "floating" ? labelContainer : null}
        {errortext && errortext.length ? (
          <p className={`${errortextstyles}`}>{errortext}</p>
        ) : null}
        {successtext && successtext.length ? (
          <p className={`${successtextstyles}`}>{successtext}</p>
        ) : null}
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
  /** Whether the SelectRow is invalid */
  invalid: PropTypes.bool,
  /** The error text to display in the SelectGroup. WHen passed, the SelectGroup will be invalidated automatically.*/
  errortext: PropTypes.string,
  /** Children to render */
  children: PropTypes.node,
  /** Passing a value turns the select into a controlled component. If you pass a value you must also specify an onChange handler to deal with value changes */
  value: PropTypes.string,
  /** Pass a handler to the Select element */
  onChange: PropTypes.func,
  /** Pass a default Value that should be selected initially. Use this if you want to use the select as an uncontrolled component. */
  defaultValue: PropTypes.string
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
  invalid: false,
  errortext: "",
  value: undefined,
  onChange: undefined,
  defaultValue: undefined
}
