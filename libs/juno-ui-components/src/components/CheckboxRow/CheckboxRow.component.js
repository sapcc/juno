import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Checkbox } from "../Checkbox/index.js"
import { Label } from "../Label/index.js"
import { Icon } from "../Icon/"

const checkboxrow = `
	jn-flex
	jn-flex-row
  jn-mb-1
`

const checkboxcontainerstyles = `
	jn-mt-1
	jn-mr-2
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

const iconstyles = `
  jn-inline-block 
  jn-ml-1 
  jn-leading-1
  jn-mt-[-.2rem]
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
  disabled,
  invalid,
  errortext,
  valid,
  successtext,
  className,
  onChange,
  ...props
}) => {
  const [isChecked, setChecked] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [isValid, setIsValid] = useState(false)
  
  const invalidated = invalid || (errortext && errortext.length ? true : false)
  const validated = valid || (successtext && successtext.length ? true : false)

  useEffect(() => {
    setChecked(checked)
  }, [checked])
  
  useEffect(() => {
    setIsInvalid(invalidated)
  }, [invalidated])
  
  useEffect(() => {
    setIsValid(validated)
  }, [validated])

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
          invalid={isInvalid}
          valid={isValid}
        />
      </div>
      <div>
        <Label
          text={label}
          htmlFor={id}
          required={required}
          disabled={disabled}
        />
        { isInvalid ? <Icon icon="dangerous" color="jn-text-theme-error" size="1.125rem" className={`${iconstyles}`}/> : null }
        { isValid ? <Icon icon="checkCircle" color="jn-text-theme-success" size="1.125rem" className={`${iconstyles}`}/> : null }
        { errortext && errortext.length ? <p className={`${errortextstyles}`}>{errortext}</p> : null }
        { successtext && successtext.length ? <p className={`${successtextstyles}`}>{successtext}</p> : null }
        { helptext ? <p className={`${helptextstyles}`}>{helptext}</p> : null }
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
  /** Disable the Checkbox */
  disabled: PropTypes.bool,
  /** Whether the CheckboxRow is invalid */
  invalid: PropTypes.bool,
  /** The error text to render with the CheckboxRow. If passed, the Checkbox row will be set to invalid automatically. */
  errortext: PropTypes.string,
  /** Whether the CheckboxRow is valid */
  valid: PropTypes.bool,
  /** The text to render when the field is validated. If passed, the Checkbox will be set to valid automatically. */
  successtext: PropTypes.string,
  /** Pass a custom className */
  className: PropTypes.string,
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
  disabled: false,
  invalid: false,
  errortext: "",
  valid: false,
  successtext: "",
  className: "",
  onChange: undefined,
}
