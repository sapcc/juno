import React, { useEffect, useId, useMemo, useState } from "react"
import PropTypes from "prop-types"
import Flatpickr from "react-flatpickr"
import { TextInput } from "../TextInput/index"
import { Label } from "../Label/index"
import { FormHint } from "../FormHint/FormHint.component"
import { Icon } from "../Icon/index"
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

const clearStyles = `
  jn-absolute 
  jn-inline-flex 
  jn-right-5
  jn-top-1.5
`

/** A Datepicker component. Highly configurable, based on Flatpickr. */

/* Possible additional props:
  * icon (show a calendar icon)
  * All props available for TextInput:
    * what to do with defaultValue? Was this ever intended to work uncontrolled? defaultVlaue accepts only a string, value accepts a variety of formats?
    * name (careful, might be used by Flatpickr internally)
    * disabled (double-check/clarify so we can disable the input, not disable certain dates, disable ≠ disabled!)
    * readOnly
    * autoFocus (if possible, determine whether this would open the calendar, too)
    * autoComplete
    * mode
    * options
    * use onFocus? we could want to add it for consistency, although flatpickr comes with an onOpen handler which shoudl be/do the same. onFocus would need to return the event though, onOpen returns the date. Alternatively, we could expose onFocus but run it inside Faltpickr's onOpen. 
    * onBlur ( not exposed by Flatpickr )
    * autoFocus and minimizing the label when the field is focussed my be tricky? Canb we create a ref fot eh field?
    * allow passing a className to the wrapper? Precedent risk!

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
  clear,
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
  onClose,
  onFocus,
  onMonthChange,
  onOpen,
  onValueUpdate,
  onYearChange,
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
  
  const [theDate, setTheDate] = useState( new Date() )
  const [isOpen, setisOpen] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [isValid, setIsValid] = useState(false)
  
  useEffect( () => {
    setTheDate(value)
  }, [value])
  
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
  
  const handleChange = ( [date] ) => {
    setTheDate( date )
    console.log(theDate)
    onChange && onChange([date])
  }
  
  const handleClose = (date) => {
    onClose && onClose(date)
  }
  
  const handleFocus = (event) => {
    onFocus && onFocus(event)
  }
  
  const handleOpen = (date) => {
    onOpen && onOpen(date)
  }
  
  const handleMonthChange = (date) => {
    onMonthChange && onMonthChange(date)
  }
  
  const handleValueUpdate = (value) => {
    onValueUpdate && onValueUpdate(value)
  }
  
  const handleYearChange = (date) => {
    onYearChange && onYearChange(date)
  }
  
  const handleClearClick = () => {
    setTheDate( "" )
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
        disabled={disabled}
        id={theId}
        mode={mode}
        onChange={handleChange}
        onClose={handleClose}
        onMonthChange={handleMonthChange}
        onOpen={handleOpen}
        onValueUpdate={handleValueUpdate}
        onYearChange={handleYearChange}
        options={options}
        placeholder={placeholder}
        value={theDate}
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
            minimized={ placeholder || theDate ? true : false }
          />
        :
          ""
      }
      
      { clear && theDate ?
          <Icon 
            icon="close"
            title="Clear"
            size="24"
            onClick={handleClearClick}
            disabled={disabled}
            className={`${clearStyles}`}
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
  /** Whether the datepicker should render a Clear icon */
  clear: PropTypes.bool,
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
  /** Whether the Datepicker has been unsuccessfully validated */
  invalid: PropTypes.bool,
  /** The label of the datepicker */
  label: PropTypes.string,
  /** The mode of the Datepicker. */
  mode: PropTypes.oneOf(["single", "multiple", "range", "time"]),
  /** A handler to be executed when the selected date or range changes */
  onChange: PropTypes.func,
  /** A handler to be executed when the datepicker inout field is focussed */
  onFocus: PropTypes.func,
  /** A handler to be executed when the datepicker calendar closes */
  onClose: PropTypes.func,
  /** A handler to be executed when the selected month changes */
  onMonthChange: PropTypes.func,
  /** A handler to be executed when the datepicker calendar opens */
  onOpen: PropTypes.func,
  /** A handler to be executed when the value in the datepicker input element changes */
  onValueUpdate: PropTypes.func,
  /** A handler to be executed when the selected year changes */
  onYearChange: PropTypes.func,
  /** Pass a Flatpickr options object. For available options, consult https://flatpickr.js.org/ */
  options: PropTypes.object,
  /** The placeholder of the input element. Defaults to empty string `""`. TODO: default to expected date format */
  placeholder: PropTypes.string,
  /** Whether the datepicker should be marked as required. Requires a `Label` to be set. */
  required: PropTypes.bool,
  /** A text to render when the Datepicker was successfully validated */
  successtext: PropTypes.node,
  /** TODO: Whether the Datepicker has been successfully validated */
  valid: PropTypes.bool,
  /** The value of the datepicker. Date Objects, timestamps, ISO date strings, chronological date strings `YYYY-MM-DD HH:MM`, and the shortcut `today` are all accepted. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object, PropTypes.number]),
  /** The width of the datepicker input. Either 'full' (default) or 'auto'. */
  width: PropTypes.oneOf(["full", "auto"]),
}

Datepicker.defaultProps = {
  className: "",
  clear: false,
  defaultValue: undefined,
  disabled: false,
  errortext: "",
  helptext: "",
  id: "",
  invalid: false,
  label: "",
  mode: "single", 
  onChange: undefined,
  onFocus: undefined,
  onMonthChange: undefined,
  onOpen: undefined,
  onValueUpdate: undefined,
  onYearChange: undefined,
  options: {},
  placeholder: "",
  required: false,
  successtext: "",
  valid: false,
  value: undefined,
  width: "full",
}