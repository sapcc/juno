import React from "react"
import PropTypes from "prop-types"
import Flatpickr from "react-flatpickr"
import { TextInput } from "../TextInput/index"
import "flatpickr/dist/themes/material_green.css" // use inbuilt flatpickr styles for now

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
  enableTime,
  maxDate,
  minDate,
  mode,
  placeholder,
  value,
  ...props
}) => {
  return (
    <div className="juno-datepicker-wrapper">
      <Flatpickr 
        className={className}
        defaultValue={defaultValue}
        enableTime={enableTime}
        mode={mode}
        placeholder={placeholder}
        value={value}
        {...props}
        
        /* 
          // use a custom input:
          render={
            ({defaultValue, value, ...props}, ref) => {
              return <CustomInput defaultValue={defaultValue} id="my-id" inputRef={ref} />
            }
          } 
        */


      />
    </div>
  )
}

Datepicker.propTypes = {
  /** Pass custom classNames. These will be appended to the input element of the Datepicker. */
  className: PropTypes.string,
  enableTime: PropTypes.bool,
  /** The mode of the Datepicker. */
  mode: PropTypes.oneOf(["single", "multiple", "range", "time"]),
  /** The placeholder of the input element. Defaults to empty string `""`. */
  placeholder: PropTypes.string,
}

Datepicker.defaultProps = {
  className: "",
  enableTime: false,
  mode: "single", 
  placeholder: "",
}