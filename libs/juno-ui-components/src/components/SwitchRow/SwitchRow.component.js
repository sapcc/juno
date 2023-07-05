import React, { useState, useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import { Switch } from "../Switch/index.js"
import { Label } from "../Label/index.js"
import { Icon } from "../Icon/index"
import { withDeprecationWarning } from '../withDeprecationWarning/index.js'

const switchrow = `
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

const successtextstyles = `
  jn-text-xs
  jn-text-theme-success
  jn-mt-1
`

/** A checkbox input group containing a checkbox, associated label, and structural markup */
const SwitchRow = ({
  name,
  label,
  id,
  on,
  disabled,
  helptext,
  required,
  invalid,
  errortext,
  valid,
  successtext,
  className,
  onChange,
  onClick,
  ...props
}) => {
  const [isOn, setIsOn] = useState(on)
  const [isInvalid, setIsInvalid] = useState(false)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    setIsOn(on)
  }, [on])

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

  const handleChange = (event) => {
    setIsOn(!isOn)
    onChange && onChange(event)
  }

  return (
    <div className={`juno-switch-row ${switchrow} ${className}`} {...props}>
      <div className={`juno-switch-container ${switchcontainerstyles}`}>
        <Switch
          name={name}
          label={label}
          onChange={handleChange}
          onClick={onClick}
          id={id}
          on={on}
          disabled={disabled}
          invalid={isInvalid}
          valid={isValid}
        />
      </div>
      <div className={`jn-pt-0.5`}>
        {errortext && errortext.length ? (
          <p className={`${errortextstyles}`}>{errortext}</p>
        ) : null}
        {successtext && successtext.length ? (
          <p className={`${successtextstyles}`}>{successtext}</p>
        ) : null}
        {helptext ? <p className={`${helptextstyles}`}>{helptext}</p> : null}
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
  /** Whether the Switch is valid */
  valid: PropTypes.bool,
  /** Pass a text to display upon successful validation. Will set the Switch to valid automatically. */
  successtext: PropTypes.string,
  /** Pass a className */
  className: PropTypes.string,
  /** Pass a change handler to the Switch */
  onChange: PropTypes.func,
  /** Pass a click handler to the Switch */
  onClick: PropTypes.func,
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
  valid: false,
  successtext: "",
  className: "",
  onChange: undefined,
  onClick: undefined,
}

export default withDeprecationWarning(SwitchRow, "SwitchRow is deprecated and will be removed in future versions. To be future-proof, use Switch instead.")