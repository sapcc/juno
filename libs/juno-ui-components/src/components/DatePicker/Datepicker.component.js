import React, { useEffect, useId, useState } from "react"
import PropTypes from "prop-types"
import Flatpickr from "react-flatpickr"
import { TextInput } from "../TextInput/index"
import { Label } from "../Label/index"
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
  autofill:jn-bg-theme-textinput-autofill
  autofill:jn-text-theme-textinput-autofill
`

const defaultborderstyles = `
  jn-border-theme-textinput-default
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

/** A Datepicker component. Highly configurable, based on Flatpickr. */

/* Possible additional props:
  * icon (show a calendar icon)
  * clear (show clear X), double-check w/ inbuilt functionality
  * All props available for TextInput:
    * name (careful, might be used by Flatpickr internally)
    * id (same)
    * disabled (double-check/clarify so we can disable the input, not disable certain dates, disable ≠ disabled!)
    * readOnly
    * label (try whether we can add a floating label using the existing wrapper, or need to add another one)
    * valid
    * invalid
    * error (handle identically -> passing error message sets field to error)
    * errortext
    * success (see above)
    * successtext
    * required
    * autoFocus (if possible, determine whether this would open the calendar, too)
    * helptext
    * width
    * autoComplete
    * onChange (used by Flatpickr?)
    * onFocus (used by Flatpickr?)
    * onBlur (used by Flatpickr?)

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
  id,
  label,
  maxDate,
  minDate,
  mode,
  placeholder,
  required,
  value,
  width,
  ...props
}) => {
  
  const theId = id ||  "juno-textinput-" + useId()
  
  return (
    <div className={`
      juno-datepicker-wrapper 
      ${wrapperStyles}
      ${ width == "auto" ? "jn-inline-block" : "jn-block" }
      ${ width == "auto" ? "jn-w-auto" : "jn-w-full" }
    `}>
      <Flatpickr 
        className={`
          juno-dateppicker-input
          ${inputStyles}
          ${ label ? withLabelStyles : noLabelStyles }
          ${ width == "auto" ? "jn-w-auto" : "jn-w-full" }
          ${className}
        `}
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
    </div>
  )
}

Datepicker.propTypes = {
  /** Pass custom classNames. These will be appended to the input element of the Datepicker. */
  className: PropTypes.string,
  disabled: PropTypes.bool,
  /** The id of the datepicker input */
  id: PropTypes.string,
  /** The label of the datepicker */
  label: PropTypes.string,
  /** The mode of the Datepicker. */
  mode: PropTypes.oneOf(["single", "multiple", "range", "time"]),
  /** The placeholder of the input element. Defaults to empty string `""`. TODO: default to expected date format */
  placeholder: PropTypes.string,
  /** The width of the datepicker input. Either 'full' (default) or 'auto'. */
  width: PropTypes.oneOf(["full", "auto"]),
}

Datepicker.defaultProps = {
  className: "",
  disabled: false,
  id: "",
  label: "",
  mode: "single", 
  placeholder: "",
  width: "full",
}