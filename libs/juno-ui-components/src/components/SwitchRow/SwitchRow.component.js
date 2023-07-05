import React, { useState, useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import { Switch } from "../Switch/index.js"
import { FormRow } from "../FormRow/index.js"
import { withDeprecationWarning } from '../withDeprecationWarning/index.js'



/** DEPRECATED: A Switch input row containing a switch, associated label, and structural markup. This component is DEPRECATED, use Switch instead. */
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
  return (
    <FormRow>
      <Switch
        name={name}
        label={label}
        onChange={onChange}
        onClick={onClick}
        id={id}
        on={on}
        disabled={disabled}
        invalid={invalid}
        required={required}
        valid={valid}
        errortext={errortext}
        helptext={helptext}
        successtext={successtext}
        className={className}
        {...props}
      />
    </FormRow>
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