import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Checkbox } from "../Checkbox/index.js"
import { Label } from "../Label/index.js"

const checkboxrow = `
	flex
	flex-row
  mb-1
`

const checkboxcontainerstyles = `
	mt-1
	mr-2
`

const helptextstyles = `
	text-xs
	text-theme-light
	mt-1
`

/** A checkbox input group containing a checkbox, associated label, and structural markup */
export const CheckboxRow = ({
  value,
  checked,
  name,
  label,
  id,
  helptext,
  required,
  className,
  disabled,
  onChange,
  ...props
}) => {
  const [isChecked, setChecked] = useState(false)

  useEffect(() => {
    setChecked(checked)
  }, [checked])

  const handleChange = (event) => {
    setChecked(!isChecked)
    onChange(event)
  }

  return (
    <div
      className={`juno-checkbox-row ${checkboxrow}  ${className}`}
      {...props}
    >
      <div className={`juno-checkbox-container ${checkboxcontainerstyles}`}>
        <Checkbox
          name={name}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          id={id}
          value={value || ""}
        />
      </div>
      <div>
        <Label
          text={label}
          htmlFor={id}
          required={required}
          disabled={disabled}
        />
        {helptext ? <p className={`${helptextstyles}`}>{helptext}</p> : ""}
      </div>
    </div>
  )
}

CheckboxRow.propTypes = {
  /** Optional initial value */
  value: PropTypes.string,
  /**  Pass checked state  */
  checked: PropTypes.bool,
  /** Name attribute of the checkbox element */
  name: PropTypes.string,
  /** Label text */
  label: PropTypes.string,
  /** Id */
  id: PropTypes.string,
  /** Help text */
  helptext: PropTypes.node,
  /** Specify whether the checkbox is required */
  required: PropTypes.bool,
  /** Pass a custom className */
  className: PropTypes.string,
  /** Disable the Checkbox */
  disabled: PropTypes.bool,
  /** Pass a handler to the checkbox element */
  onChange: PropTypes.func,
}

CheckboxRow.defaultProps = {
  value: null,
  checked: false,
  name: null,
  label: null,
  id: null,
  helptext: null,
  required: null,
  disabled: null,
  onChange: undefined,
  className: "",
}
