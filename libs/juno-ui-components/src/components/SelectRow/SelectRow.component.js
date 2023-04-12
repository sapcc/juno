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
  placeholder,
  successtext,
  children,
  value,
  onValueChange,
  onChange,
  onOpenChange,
  defaultValue,
  open,
  error,
  loading,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    setIsOpen(open)
  }, [open])
  
  useEffect(() => {
    setHasError(error)
  }, [error])
  
  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

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
          placeholder={placeholder}
          onValueChange={onValueChange || onChange}
          onOpenChange={onOpenChange}
          disabled={disabled}
          invalid={isInvalid}
          valid={isValid}
          value={value}
          defaultValue={defaultValue}
          open={isOpen}
          error={hasError}
          loading={isLoading}
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
  /** The placeholder to show in the Select if no value is selected. defaults to "Select…". */
  placeholder: PropTypes.string,
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
  /** Pass a handler to the Select element to execute once the value changes */
  onValueChange: PropTypes.func,
  /** Deprecated: Use `onValueChange` instead. */
  onChange: PropTypes.func,
  /** Pass handler to execute once the Selects open state changes */
  onOpenChange: PropTypes.func,
  /** Pass a default Value that should be selected initially. Use this if you want to use the select as an uncontrolled component. */
  defaultValue: PropTypes.string,
  /** Whether the Select is open */
  open: PropTypes.bool,
  /** Whether the Select has an error, e.g. when loading necessary option data failed. When the Select has been negatively validated, use `invalid` instead. */
  error: PropTypes.bool,
  /** Whether the Select is currently busy loading options. Will display a Spinner Icon. */
  loading: PropTypes.bool,
}

SelectRow.defaultProps = {
  name: null,
  variant: "floating",
  label: null,
  placeholder: "Select…",
  id: null,
  required: null,
  className: "",
  helptext: null,
  disabled: null,
  invalid: false,
  errortext: "",
  value: undefined,
  onValueChange: undefined,
  onChange: undefined,
  onOpenChange: undefined,
  defaultValue: undefined,
  open: undefined,
  error: undefined,
  loading: undefined,
}
