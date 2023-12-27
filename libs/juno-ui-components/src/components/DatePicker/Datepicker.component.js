import React, { useEffect, useId, useMemo, useState } from "react"
import PropTypes from "prop-types"
import Flatpickr from "react-flatpickr"
import { TextInput } from "../TextInput/index"
import { Label } from "../Label/index"
import { FormHint } from "../FormHint/FormHint.component"
import "flatpickr/dist/themes/dark.css" // use inbuilt flatpickr styles for now

const wrapperStyles = `
  jn-relative
`

const inputStyles = `
  jn-bg-theme-textinput
  jn-text-theme-textinput
  jn-border
  jn-text-base
  jn-leading-4
  jn-px-4
  jn-h-textinput
  jn-rounded-3px
  focus:jn-outline-none
  focus:jn-ring-2
  focus:jn-ring-theme-focus
  disabled:jn-opacity-50
  disabled:jn-cursor-not-allowed
  autofill:jn-bg-theme-textinput-autofill
  autofill:jn-text-theme-textinput-autofill
`

const withLabelStyles = `
  jn-pt-[1.125rem] 
  jn-pb-1
`

const noLabelStyles = `
  jn-py-4
`

const labelStyles = `
  peer-autofill:jn-text-theme-textinput-autofill-label
  jn-pointer-events-none
  jn-top-2
  jn-left-[0.9375rem]
`

const defaultBorderStyles = `
  jn-border-theme-textinput-default
`

const invalidStyles = `
  jn-border-theme-error
`

const validStyles = `
  jn-border-theme-success
`

/** A Datepicker component. Highly configurable, based on Flatpickr. */

/* Possible additional props:
  * icon (show a calendar icon)
  * clear (show clear X), double-check w/ inbuilt functionality
  * All props available for TextInput:
    * name (careful, might be used by Flatpickr internally)
    * id (same)
    * disabled (double-check/clarify so we can disable the input, not disable certain dates, disable ≠ disabled!)
    * readOnly
    * autoFocus (if possible, determine whether this would open the calendar, too)
    * autoComplete
    * mode
    * options
    * onFocus ( not exposed by Flatpickr )
    * onBlur ( not exposed by Flatpickr )

 */
 
  // use a custom input:
  // const CustomInput = ({ value, defaultValue, inputRef, ...props }) => {
  //   return <input {...props} defaultValue={defaultValue} ref={inputRef} />
  // }
  /* 
    // in <Flatpickr />:
    render={
      ({defaultValue, value, ...props}, ref) => {
        return <CustomInput defaultValue={defaultValue} id="my-id" inputRef={ref} />
      }
    } 
  */
  

export const Datepicker = ({
  className,
  defaultValue,
  disabled,
  enableTime,
  errortext,
  helptext,
  id,
  invalid,
  label,
  maxDate,
  minDate,
  mode,
  onChange,
  options,
  placeholder,
  required,
  successtext,
  valid,
  value,
  width,
  ...props
}) => {
  
  const isNotEmptyString = (str) => {
    return !(typeof str === 'string' && str.trim().length === 0)
  }
  
  const theId = id ||  "juno-datepicker-" + useId()
  
  const [isInvalid, setIsInvalid] = useState(false)
  const [isValid, setIsValid] = useState(false)
  
  const invalidated = useMemo(
    () => invalid || (errortext && isNotEmptyString(errortext) ? true : false),
    [invalid, errortext]
  )
  const validated = useMemo(
    () => valid || (successtext && isNotEmptyString(successtext) ? true : false),
    [valid, successtext]
  )
  
  useEffect(() => {
    setIsInvalid(invalidated)
  }, [invalidated])
  
  useEffect(() => {
    setIsValid(validated)
  }, [validated])
  
  const handleChange = ( date ) => {
    onChange && onChange(date)
  }
  
  return (
    <div className={`
      juno-datepicker-wrapper 
      ${wrapperStyles}
      ${ width == "auto" ? "jn-inline-block" : "jn-block" }
      ${ width == "auto" ? "jn-w-auto" : "jn-w-full" }
    `}>
      <Flatpickr 
        className={`
          juno-datepicker-input
          ${ inputStyles }
          ${ label ? withLabelStyles : noLabelStyles }
          ${ isInvalid ? "juno-datepicker-input-invalid " + invalidStyles : "" } 
          ${ isValid ? "juno-datepicker-input-valid" + validStyles : "" }  
          ${ isValid || isInvalid ? "" : defaultBorderStyles } 
          ${ width == "auto" ? "jn-w-auto" : "jn-w-full" }
          ${ className }
        `}
        defaultValue={defaultValue}
        disabled={disabled}
        id={theId}
        mode={mode}
        onChange={handleChange}
        options={options}
        value={value}
        {...props}
      />
      { label && label.length ?
          <Label 
            text={label}
            htmlFor={theId}
            className={`${labelStyles}`}
            disabled={disabled}
            required={required}
            floating
            minimized={true}
          />
        :
          ""
      }
      { errortext && isNotEmptyString(errortext) ?
          <FormHint text={errortext} variant="error" className="jn-mt-0" />
        :
          ""
      }
      { successtext && isNotEmptyString(successtext) ?
          <FormHint text={successtext} variant="success" className="jn-mt-0"/>
        :
          ""
      }
      { helptext && isNotEmptyString(helptext) ?
          <FormHint text={helptext} className="jn-mt-0" />
        :
          ""
       }
    </div>
  )
}

Datepicker.propTypes = {
  /** Pass custom classNames. These will be appended to the input element of the Datepicker. */
  className: PropTypes.string,
  /** TODO: defaultValue -> proptypes ? */
  defaultValue: PropTypes.string,
  /** Whether the Datepicker is disabled */
  disabled: PropTypes.bool,  
  /** A text to render when the Datepicker has an error or could not be validated */
  errortext: PropTypes.node,
  /** A helptext to render to explain meaning and significance of the Datepicker */
  helptext: PropTypes.node,
  /** The id of the datepicker input */
  id: PropTypes.string,
  /** TODO: Whether the Datepicker has been unsuccessfully validated */
  invalid: PropTypes.bool,
  /** The label of the datepicker */
  label: PropTypes.string,
  /** The mode of the Datepicker. */
  mode: PropTypes.oneOf(["single", "multiple", "range", "time"]),
  /** A handler to be executed when the selected date or range changes */
  onChange: PropTypes.func,
  /** Pass any Flatpickr options */
  options: PropTypes.object,
  /** The placeholder of the input element. Defaults to empty string `""`. TODO: default to expected date format */
  placeholder: PropTypes.string,
  /** Whether the datepicker should be marked as required. Requires a `Label` to be set. */
  required: PropTypes.bool,
  /** A text to render when the Datepicker was successfully validated */
  successtext: PropTypes.node,
  /** TODO: Whether the Datepicker has been successfully validated */
  valid: PropTypes.bool,
  /** TODO: value -> proptypes? */
  value: PropTypes.oneOf([PropTypes.string, PropTypes.array, PropTypes.object, PropTypes.number]),
  /** The width of the datepicker input. Either 'full' (default) or 'auto'. */
  width: PropTypes.oneOf(["full", "auto"]),
}

Datepicker.defaultProps = {
  className: "",
  defaultValue: undefined,
  disabled: false,
  errortext: "",
  helptext: "",
  id: "",
  invalid: false,
  label: "",
  mode: "single", 
  onChange: undefined,
  options: {},
  placeholder: "",
  required: false,
  successtext: "",
  valid: false,
  value: undefined,
  width: "full",
}