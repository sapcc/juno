import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Switch } from "../Switch/index.js"
import { Label } from "../Label/index.js"

const switchrow = `
	jn-flex
	jn-flex-row
	jn-mb-1
`

const switchcontainerstyles = `
	jn-mr-2
	jn-leading-none
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

/** A checkbox input group containing a checkbox, associated label, and structural markup */
export const SwitchRow = ({
  name,
  label,
  id,
  on,
  disabled,
  helptext,
  required,
  invalid,
  errortext,
  className,
  onChange,
  ...props
}) => {
  const [isOn, setIsOn] = useState(on)
  const [isInvalid, setIsInvalid] = useState(false)

  useEffect(() => {
    setIsOn(on)
  }, [on])
  
  const invalidated = invalid || (errortext && errortext.length ? true : false)
  
  useEffect(() => {
    setIsInvalid(invalidated)
  }, [invalidated])

  const handleChange = (event) => {
    setIsOn(!isOn)
    onChange(event)
  }

  return (
    <div className={`juno-switch-row ${switchrow} ${className}`} {...props}>
      <div className={`juno-switch-container ${switchcontainerstyles}`}>
        <Switch
          name={name}
          onChange={handleChange}
          id={id}
          on={on}
          disabled={disabled}
          invalid={isInvalid}
        />
      </div>
      <div className={`jn-pt-0.5`}>
        <Label
          text={label}
          htmlFor={id}
          required={required}
          disabled={disabled}
        />
        { errortext && errortext.length ? <p className={`${errortextstyles}`}>{errortext}</p> : null }
        {helptext ? <p className={`${helptextstyles}`}>{helptext}</p> : ""}
      </div>
    </div>
  )
}

SwitchRow.propTypes = {
  /** Name attribute of the checkbox element */
  name: PropTypes.string,
  /** Label text */
  label: PropTypes.string,
  /** Id */
  id: PropTypes.string,
  /** Whether the Switch inside the row is on */
  on: PropTypes.bool,
  /** Disabled */
  disabled: PropTypes.bool,
  /** Help text */
  helptext: PropTypes.node,
  /** Specify whether the Switch is required */
  required: PropTypes.bool,
  /** Whether the Switch is invalid */
  invalid: PropTypes.bool,
  /** Pass an error text to display when the Switch is invalid. When passed, the Switch will be set to invalid automatically. */
  errortext: PropTypes.string,
  /** Pass a className */
  className: PropTypes.string,
  /** Pass a handler to the checkbox element */
  onChange: PropTypes.func,
}

SwitchRow.defaultProps = {
  name: null,
  label: null,
  id: null,
  on: false,
  disabled: null,
  helptext: null,
  required: null,
  invalid: false,
  errortext: "",
  className: "",
  onChange: undefined,
}
