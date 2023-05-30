import React, { useState, useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import { Radio } from "../Radio/index.js"
import withDeprecationWarning from '../withDeprecationWarning/withDeprecationWarning.component.js'

/** A radio row containing a radio, associated label, and structural markup */
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