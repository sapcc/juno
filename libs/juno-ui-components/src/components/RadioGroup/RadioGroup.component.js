import React, { useState, useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import { Label } from "../Label/index.js"
import { Icon } from "../Icon/index"

const radiogroupstyles = `
	jn-mb-4
	last:jn-mb-0
`

const radiogrouplabelstyles = `
	jn-inline-block
	jn-mb-1
`

const groupstyles = `
	jn-relative
	jn-rounded
	jn-border
	jn-py-1
`

const defaultgroupstyles = `
	jn-border-transparent
`

const validgroupstyles = `
	jn-border-theme-success
	jn-px-2
`

const invalidgroupstyles = `
	jn-border-theme-error
	jn-px-2
`

const errortextstyles = `
	jn-text-xs
	jn-text-theme-error
	jn-mb-2
`

const successtextstyles = `
	jn-text-xs
	jn-text-theme-success
	jn-mb-2
`

const iconstyles = `
	jn-absolute
	jn-right-2
	jn-top-1.5
`

/**
A component to semantically and functionally group individual RadioRows: All contained child RadioRows will share the same `name`-attribute passed as a prop to the group, and thus make the Radios work with each other as expected.
*/

export const RadioGroup = ({
  name,
  label,
  selected,
  required,
  disabled,
  valid,
  successtext,
  invalid,
  errortext,
  children,
  className,
  ...props
}) => {
  const [selectedOption, setSelectedOption] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)

  const validated = useMemo(
    () => valid || (successtext && successtext.length ? true : false),
    [valid, successtext]
  )
  const invalidated = useMemo(
    () => invalid || (errortext && errortext.length ? true : false),
    [invalid, errortext]
  )

  useEffect(() => {
    setSelectedOption(selected)
  }, [selected])

  useEffect(() => {
    setIsValid(validated)
  }, [validated])

  useEffect(() => {
    setIsInvalid(invalidated)
  }, [invalidated])

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value)
  }

  const namedChildren = () => {
    return React.Children.map(children, (child) => {
      let checkedOption = false
      if (selectedOption) {
        // if parent has selectedOption, oarent wins.
        checkedOption = selectedOption === child.props.value
      } else if (child.props.checked) {
        //otherwise last checked option wins
        checkedOption = true
        // update state accordingly
        setSelectedOption(child.props.value)
      }
      // clone element, set name and checked acc. to above logic:
      return React.cloneElement(child, {
        name: name,
        className: className,
        onChange: handleRadioChange,
        checked: checkedOption,
        disabled: disabled,
      })
    })
  }

  return (
    <div
      role="radiogroup"
      className={`juno-radiogroup ${radiogroupstyles} ${
        isValid ? "juno-radiogroup-valid" : ""
      } ${isInvalid ? "juno-radiogroup-invalid" : ""}${className}`}
      onChange={namedChildren}
      {...props}
    >
      {label ? (
        <Label
          text={label}
          htmlFor={name}
          className={`${radiogrouplabelstyles}`}
          required={required}
        />
      ) : (
        ""
      )}
      {errortext && errortext.length ? (
        <p className={`${errortextstyles}`}>{errortext}</p>
      ) : null}
      {successtext && successtext.length ? (
        <p className={`${successtextstyles}`}>{successtext}</p>
      ) : null}
      <div
        className={`juno-checkbox-group-options ${groupstyles} ${
          isValid ? validgroupstyles : ""
        } ${isInvalid ? invalidgroupstyles : ""} ${
          isValid || isInvalid ? "" : defaultgroupstyles
        }`}
      >
        {isInvalid ? (
          <Icon
            icon="dangerous"
            color="jn-text-theme-error"
            className={`${iconstyles}`}
          />
        ) : null}
        {isValid ? (
          <Icon
            icon="checkCircle"
            color="jn-text-theme-success"
            className={`${iconstyles}`}
          />
        ) : null}
        {namedChildren()}
      </div>
    </div>
  )
}

RadioGroup.propTypes = {
  /** Name attribute. Radios within the group using the same name will work together as mutually exclusive options. */
  name: PropTypes.string.isRequired,
  /** Label for the group of radios as a whole. Mandatory if you want to denote a selection in the set is required. */
  label: PropTypes.string,
  /** The value of the selected option */
  selected: PropTypes.string,
  /** Specify whether a selection of one of the options is required */
  required: PropTypes.bool,
  /** Disable a RadioGroup */
  disabled: PropTypes.bool,
  /** Whether the RadioGroup is invalid */
  invalid: PropTypes.bool,
  /** Text to display in case validation failed. Will set the whole group to invalid when passed. */
  errortext: PropTypes.string,
  /** Whether the RadioGroup is valid */
  valid: PropTypes.bool,
  /** Text to display in case validation is successful. When passed, will set the whole group to valid. */
  successtext: PropTypes.string,
  /** Pass a custom class to apply to the individual Radios of the group */
  className: PropTypes.string,
  /** Child Radio components. These will receive the name attribute passed to RadioGroup. */
  children: PropTypes.node,
}

RadioGroup.defaultProps = {
  name: null,
  className: "",
  required: null,
  label: null,
  selected: "",
  disabled: false,
  valid: false,
  successtext: "",
  invalid: false,
  errortext: "",
  className: "",
}
