import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Radio } from "../Radio/index.js"
import { Label } from "../Label/index.js"
import { Icon } from "../Icon/"

const radiorow = `
	jn-flex
	jn-flex-row
  jn-mb-1
`

const radiocontainerstyles = `
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

const iconstyles = `
  jn-inline-block 
  jn-ml-1 
  jn-leading-1
  jn-mt-[-.2rem]
`

/** A controlled radio row containing a radio, associated label, and structural markup */
export const RadioRow = ({
  value,
  name,
  checked,
  label,
  id,
  helptext,
  className,
  disabled,
  invalid,
  errortext,
  onChange,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  
  useEffect(() => {
    setIsChecked(checked)
  }, [checked])
  
  const invalidated = invalid || (errortext && errortext.length ? true : false)
  
  useEffect(() => {
    setIsInvalid(invalidated)
  }, [invalidated])

  const handleChange = (event) => {
    setIsChecked(!isChecked)
    onChange()
  }

  return (
    <div className={`juno-radio-row ${radiorow} ${className}`} {...props}>
      <div className={`juno-radio-container ${radiocontainerstyles}`}>
        <Radio
          name={name}
          checked={isChecked}
          onChange={onChange}
          id={id}
          value={value}
          disabled={disabled}
          invalid={isInvalid}
        />
      </div>
      <div>
        <Label text={label} htmlFor={id} disabled={disabled} />
        { isInvalid ? <Icon icon="dangerous" color="jn-text-theme-error" size="1.125rem" className={`${iconstyles}`}/> : null }
        { errortext && errortext.length ? <p className={`${errortextstyles}`}>{errortext}</p> : null }
        {helptext ? <p className={`${helptextstyles}`}>{helptext}</p> : ""}
      </div>
    </div>
  )
}

RadioRow.propTypes = {
  /** Optional initial value */
  value: PropTypes.string,
  /**  Pass checked state  */
  checked: PropTypes.bool,
  /** Name attribute of the Radio element */
  name: PropTypes.string,
  /** Label text */
  label: PropTypes.string,
  /** Id */
  id: PropTypes.string,
  /** Help text */
  helptext: PropTypes.node,
  /** Pass to disable the Radio */
  disabled: PropTypes.bool,
  /** Whether the Radio is invalid */
  invalid: PropTypes.bool,
  /** Error text to be displayed. When passed, the Radio will automatically be invalidated. */
  errortext: PropTypes.string,
  /** Pass a className */
  className: PropTypes.string,
  /** Pass a handler to the checkbox element */
  onChange: PropTypes.func,
}

RadioRow.defaultProps = {
  value: "",
  checked: false,
  name: null,
  label: null,
  id: null,
  helptext: null,
  className: "",
  disabled: false,
  errortext: "",
  onChange: undefined,
}
