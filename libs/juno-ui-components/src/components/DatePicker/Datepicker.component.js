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
   
  
  
`

const iconContainerStyles = `
  jn-absolute
  jn-inline-flex
  jn-top-1.5
  jn-right-5
  jn-gap-1.5
`

/** A Datepicker component. Highly configurable, based on Flatpickr. */

/* Possible additional props:
  * icon (show a calendar icon)
  * All props available for TextInput:
    * what to do with defaultValue? Was this ever intended to work uncontrolled? defaultVlaue accepts only a string, value accepts a variety of formats?
    * clarify use of value, defaultValue, defaultDate?
    * name (careful, might be used by Flatpickr internally)?
    * readOnly?
    * autoFocus (if possible, determine whether this would open the calendar, too)
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
  allowInput,
  className,
  clear,
  conjunction,
  dateFormat,
  defaultValue,
  disable,
  disabled,
  enable,
  enableSeconds,
  enableTime,
  errortext,
  helptext,
  hourIncrement,
  id,
  invalid,
  label,
  locale,
  maxDate,
  minDate,
  mode,
  monthSelectorType,
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
  shorthandCurrentMonth,
  showMonths,
  staticPosition,
  successtext,
  time_24hr,
  valid,
  value,
  weekNumbers,
  width,
  ...props
}) => {
  
  const isNotEmptyString = (str) => {
    return !(typeof str === 'string' && str.trim().length === 0)
  }
  
  const theId = id ||  "juno-datepicker-" + useId()
  
  const theOptions = { 
    allowInput,
    conjunction,
    dateFormat, 
    disable,
    enableSeconds,
    enableTime,
    hourIncrement,
    locale,
    maxDate,
    minDate,
    mode,
    monthSelectorType,
    shorthandCurrentMonth,
    showMonths,
    static: staticPosition, // rename since "static" is a reserved word in JS
    time_24hr,
    weekNumbers,
    ...( enable && enable.length ? { enable } : {}  ), // ONLY add 'enable' key if defined and has at least one value, otherwise there will be errors
    ...options,
  }
  
  const [theDate, setTheDate] = useState( { date: "" } )
  const [isOpen, setisOpen] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [isValid, setIsValid] = useState(false)
  
  
  useEffect( () => {
    setTheDate({date: value})
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
  
  const handleChange = ( date ) => {
    setTheDate( { date: date } )
    onChange && onChange(date)
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
    setTheDate( { date: ""} )
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
        onChange={handleChange}
        onClose={handleClose}
        onMonthChange={handleMonthChange}
        onOpen={handleOpen}
        onValueUpdate={handleValueUpdate}
        onYearChange={handleYearChange}
        options={theOptions}
        placeholder={placeholder}
        value={theDate.date}
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
      
      <div className={`juno-datepicker-icon-container ${iconContainerStyles}`}>
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
        {
          // TODO: calendar icon goes here
        }
        { isInvalid ? 
            <Icon icon="dangerous" color="jn-text-theme-error" />
          : 
            ""
        }
        { isValid ? 
            <Icon icon="checkCircle" color="jn-text-theme-success" />
          : 
            ""
        }
      </div>
      
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
  /** Whether the Datepicker allows direct keyboard input. Default is `false`. */
  allowInput: PropTypes.bool,
  /** Pass custom classNames. These will be appended to the input element of the Datepicker. */
  className: PropTypes.string,
  /** Whether the datepicker should render a Clear icon */
  clear: PropTypes.bool,
  /** A custom string to separate individual dates in `multiple` mode. */
  conjunction: PropTypes.string,
  /** A string of characters to define how a date will be formatted in the input field. Available options: https://flatpickr.js.org/formatting/ */
  dateFormat: PropTypes.string,
  /** TODO: defaultValue -> proptypes ? */
  defaultValue: PropTypes.string,
  /** Pass an array of dates, date strings, date ranges or functions to disable dates. More on disabling dates: https://flatpickr.js.org/examples/#disabling-specific-dates */
  disable: PropTypes.array,
  /** Whether the Datepicker is disabled */
  disabled: PropTypes.bool,  
  /** Disable all dates except specifed dates, date strings, date ranges of functions. More on enabling dates: 
  https://flatpickr.js.org/examples/#disabling-all-dates-except-select-few */
  enable: PropTypes.array,
  /** Whether to show seconds when showing a time picker. */
  enableSeconds: PropTypes.bool,
  /** Whether to show a time picker.  */
  enableTime: PropTypes.bool,
  /** A text to render when the Datepicker has an error or could not be validated */
  errortext: PropTypes.node,
  /** A helptext to render to explain meaning and significance of the Datepicker */
  helptext: PropTypes.node,
  /** The step for the hour input. Only has an effect when a time picker is enabled via `enableTime`. */
  hourIncrement: PropTypes.number,
  /** The id of the datepicker input */
  id: PropTypes.string,
  /** Whether the Datepicker has been unsuccessfully validated */
  invalid: PropTypes.bool,
  /** The label of the datepicker */
  label: PropTypes.string,
  /** Localization string or object. Can be used to set starting day of the week, e.g. Mondays instead of Sundays. More on localization: https://flatpickr.js.org/localization/ */
  locale: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** The maximum / latest date a user can select (inclusive). TODO: allow number, date object. */
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object, PropTypes.number]),
  /** The minimum / earliest date a user can select (inclusive). TODO: allow number, date object. */
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object, PropTypes.number]), 
  /** The mode of the Datepicker. */
  mode: PropTypes.oneOf(["single", "multiple", "range", "time"]),
  /** Whether to show a dropdown to select the current month. If `showMonths` is set to be greater than 1, it will always be displayed as static. Arrows to scroll through the months as well as through years will still be displayed and working. */
  monthSelectorType: PropTypes.oneOf(["dropdown", "static"]),
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
  /** Pass a Flatpickr options object. For available options, consult https://flatpickr.js.org/. 
  When an available key can also be passed explicitly as an individual prop, the latter will take precedence over the corresponding key in the `options` object. Note: The `static` key in the options object is represented by the `staticPosition` prop. */
  
  /* TODO: Suppress other keys? Use .exact instead of .shape? */
  options: PropTypes.shape({
    allowInput:             PropTypes.bool,
    conjunction:            PropTypes.string,
    dateFormat:             PropTypes.string,
    disable:                PropTypes.array,
    enable:                 PropTypes.array,
    enableSeconds:          PropTypes.bool,
    enableTime:             PropTypes.bool,
    hourIncrement:          PropTypes.number,
    locale:                 PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    maxDate:                PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object, PropTypes.number]),
    minDate:                PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object, PropTypes.number]),
    mode:                   PropTypes.oneOf(["single", "multiple", "range", "time"]),
    monthSelectorType:      PropTypes.oneOf(["dropdown", "static"]),
    shorthandCurrentMonth:  PropTypes.bool,
    showMonths:             PropTypes.number,
    static:                 PropTypes.bool,
    time_24hr:              PropTypes.bool,
    weekNumbers:            PropTypes.bool,
  }),
  /** The placeholder of the input element. Defaults to empty string `""`. TODO: default to expected date format */
  placeholder: PropTypes.string,
  /** Whether the datepicker should be marked as required. Requires a `Label` to be set. */
  required: PropTypes.bool,
  /** Whether the current month in the date picker should be displayed as shorthand, e.g. "Jan" instead of "January" */
  shorthandCurrentMonth: PropTypes.bool,
  /** The number of months to show in the date picker */
  showMonths: PropTypes.number,
  /** Render the calendar inside the wrapper of the datepicker component. */
  staticPosition: PropTypes.bool,
  /** A text to render when the Datepicker was successfully validated */
  successtext: PropTypes.node,
  /** Displays time picker in 24 hour mode without AM/PM selection when enabled. Requires `enableTime` to be set, too. Default is `false`. */
  time_24hr: PropTypes.bool,
  /** Whether the Datepicker has been successfully validated */
  valid: PropTypes.bool,
  /** The value of the datepicker. Date Objects, timestamps, ISO date strings, chronological date strings `YYYY-MM-DD HH:MM`, and the shortcut `today` are all accepted. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object, PropTypes.number]),
  /** Whether to render week numbers. Default is `false`. */
  weekNumbers: PropTypes.bool,
  /** The width of the datepicker input. Either 'full' (default) or 'auto'. */
  width: PropTypes.oneOf(["full", "auto"]),
}

Datepicker.defaultProps = {
  allowInput: false,
  className: "",
  clear: false,
  conjunction: ", ",
  dateFormat: "Y-m-d",
  defaultValue: undefined,
  disable: [],
  disabled: false,
  enable: [],
  enableSeconds: false,
  enableTime: false,
  errortext: "",
  helptext: "",
  hourIncrement: 1,
  id: "",
  invalid: false,
  label: "",
  locale: "",
  maxDate: null,
  minDate: null,
  mode: "single", 
  monthSelectorType: "dropdown",
  onChange: undefined,
  onFocus: undefined,
  onMonthChange: undefined,
  onOpen: undefined,
  onValueUpdate: undefined,
  onYearChange: undefined,
  options: {
    // WON'T DO altFormat: "F j, Y",
    // WON'T DO altInput: false,
    // WON'T DO altInputClass: "",
    // DONE: allowInput: false,
    // ??? allowInvalidPreload: false,
    // WON'T DO     appendTo: null,  --> error
    // ariaDateFormat: "F j, Y",
    // DONE conjunction: null,
    // ??? clickOpens: true,
    // DONE dateFormat: "Y-m-d",
    // ??? defaultDate: null,
    // ??? defaultHour: 12,
    // ??? defaultMinute: 0,
    // DONE disable: [],
    // ??? disableMobile: false,
    // DONE enable: undefined,
    // DONE enableTime: false,
    // DONE enableSeconds: false,
    // ??? formatDate: null,  --> error
    //  hourIncrement: 1,
    // TODO inline: false,
    // DONE locale
    // DONE maxDate: null,
    // DONE minDate: null,
    // DONE mode: "single",
    // WON'T DO nextArrow: ">", --> use ours, do not allow to customize
    // ??? noCalendar: false,
    // ??? onChange: null,  --> merge with explicit prop
    // ??? onClose: null,
    // ??? onOpen: null,
    // ??? onReady: null,
    // ??? parseDate: false,
    // // Where the calendar is rendered relative to the input vertically and horizontally. In the format of "[vertical] [horizontal]". Vertical can be auto, above or below (required). Horizontal can be left, center or right.  e.g. "above" or "auto center"
    // ??? position: "auto", --> discuss whether customizing makes any sense?
    // ??? positionElement: null,
    // WON'T DO:  prevArrow: ">", --> use ours, do not allow to customize
    // DONE shorthandCurrentMonth: false,
    // DONE static: false,
    // DONE showMonths: 1,
    // DONE time_24hr: false,
    // DONE weekNumbers: false,
    // WON't DO wrap: false, --> custom elements, do not expose?
    // DONE monthSelectorType: "dropdown", 
  },
  placeholder: "",
  required: false,
  shorthandCurrentMonth: false,
  showMonths: 1,
  staticPosition: false,
  successtext: "",
  time_24hr: false,
  valid: false,
  value: undefined,
  weekNumbers: false,
  width: "full",
}