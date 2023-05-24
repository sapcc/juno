import React, { useState, useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import { Radio } from "../Radio/index.js"
import { Label } from "../Label/index.js"
import { Icon } from "../Icon/"
import withDeprecationWarning from '../withDeprecationWarning/withDeprecationWarning.component.js'

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

/** A controlled radio row containing a radio, associated label, and structural markup */
const RadioRow = ({
  value,
  name,
  checked,
  label,
  id,
  helptext,
  className,
  disabled,
  required,
  invalid,
  errortext,
  valid,
  successtext,
  onChange,
  ...props
}) => {
  return (
    <Radio 
      value={value}
      checked={checked}
      name={name}
      label={label}
      id={id}
      helptext={helptext}
      disabled={disabled}
      required={required}
      invalid={invalid}
      valid={valid}
      errortext={errortext}
      successtext={successtext}
      className={className}
      onChange={onChange}
      {...props}
    />
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
  /** Whether the Radio is required */
  required: PropTypes.bool,
  /** Whether the Radio is invalid */
  invalid: PropTypes.bool,
  /** Error text to be displayed. When passed, the Radio will automatically be invalidated. */
  errortext: PropTypes.node,
  /** Whether the Radio is valid */
  valid: PropTypes.bool,
  /** Success text to be displayed when the Radio is valid. When passed, will set the radio to valid automatically. */
  successtext: PropTypes.node,
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
  helptext: "",
  className: "",
  disabled: false,
  required: false,
  errortext: "",
  valid: false,
  successtext: "",
  onChange: undefined,
}

export default withDeprecationWarning(RadioRow, "RadioRow is deprecated and will be removed in future versions. To be future-proof, use Radio instead.")