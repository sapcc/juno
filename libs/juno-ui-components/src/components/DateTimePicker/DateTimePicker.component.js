import React, { useEffect, useRef, useId, useMemo, useState } from "react"
import PropTypes from "prop-types"
import flatpickr from "flatpickr"
import { Icon } from "../Icon/"

/* 
TODO:
* add styles (comment out in other components, wrap in our own selector to safeguard for calendar, use tw-stuff for our stuff)
* add enable prop (or leave out if no success)
* add position prop (if possible, otherwise leave out)
*/

/** A all-purpose date and time picker component. Highly configurable, based on Flatpickr. */

export const DateTimePicker = ({
  allowInput,
  allowInvalidPreload,
  ariaDateFormat,
  className,
  conjunction,
  dateFormat,
  defaultHour,
  defaultMinute,
  defaultDate,
  defaultValue,
  disable,
  disabled,
  enable, // TODO
  enableSeconds,
  enableTime,
  hourIncrement,
  id,
  maxDate,
  minDate,
  minuteIncrement,
  mode,
  monthSelectorType,
  name,
  noCalendar,
  onBlur,
  onChange,
  onClose,
  onFocus,
  onMonthChange,
  onOpen,
  onReady,
  onYearChange,
  placeholder,
  position, // TODO -> CSS?
  shorthandCurrentMonth,
  showMonths,
  time_24hr,
  value,
  weekNumbers,
  ...props
}) => {
  // always generate auto-id string using the useId hook to avoid "more hooks than in previous render" error when removing custom id:
  const autoId = "juno-datepicker-" + useId()
  const theId = id && id.length ? id : autoId

  const fpRef = useRef(null) // the dom node flatpickr instance will be bound to
  let flatpickrInstanceRef = useRef({}) // The actual flatpickr instance
  const calendarTargetRef = useRef(null) // The DOM node the flatpickr calendar should be rendered to

  const [theDate, setTheDate] = useState({})

  const updateFlatpickrInstance = (newKeys) =>
    (flatpickrInstanceRef.current = {
      ...flatpickrInstanceRef.current,
      ...Object.keys(newKeys).reduce((a, key) => {
        a[key] = newKeys[key]
        return a
      }, {}),
    })

  const handleBlur = (event) => {
    onBlur && onBlur(event)
  }

  const handleChange = (selectedDate, dateStr, instance) => {
    setTheDate({ selectedDate: selectedDate, selectedDateStr: dateStr })
    onChange && onChange(selectedDate, dateStr)
  }

  const handleClose = (selectedDate, dateStr, instance) => {
    onClose && onClose(selectedDate, dateStr)
  }

  const handleMonthChange = (selectedDate, dateStr, instance) => {
    setTheDate({ selectedDate: selectedDate, selectedDateStr: dateStr })
    onMonthChange && onMonthChange(selectedDate, dateStr)
  }

  const handleOpen = (selectedDate, dateStr, instance) => {
    onOpen && onOpen(selectedDate, dateStr)
  }

  const handleReady = (selectedDate, dateStr, instance) => {
    onReady && onReady(selectedDate, dateStr)
  }

  const handleYearChange = (selectedDate, dateStr, instance) => {
    setTheDate({ selectedDate: selectedDate, selectedDateStr: dateStr })
    onYearChange && onYearChange(selectedDate, dateStr)
  }

  const handleInputFocus = (event) => {
    onFocus && onFocus(event)
  }

  const handleCalendarIconClick = () => {
    flatpickrInstanceRef.current?.open()
  }

  const handleClearIconClick = () => {
    setTheDate({})
    flatpickrInstanceRef.current?.clear()
  }

  const createFlatpickrInstance = () => {
    const options = {
      allowInput: allowInput,
      allowInvalidPreload: allowInvalidPreload,
      appendTo: calendarTargetRef.current,
      conjunction: conjunction,
      dateFormat: dateFormat,
      defaultDate: defaultDate || defaultValue,
      defaultHour: defaultHour,
      defaultMinute: defaultMinute,
      disable: disable,
      enableSeconds: enableSeconds,
      enableTime: enableTime,
      hourIncrement: hourIncrement,
      noCalendar: noCalendar,
      maxDate: maxDate,
      minDate: minDate,
      minuteIncrement: minuteIncrement,
      mode: mode,
      monthSelectorType,
      onChange: handleChange,
      onClose: handleClose,
      onMonthChange: handleMonthChange,
      onOpen: handleOpen,
      onReady: handleReady,
      // onValueUpdate: handleValueUpdate,
      onYearChange: handleYearChange,
      positionElement: calendarTargetRef.current,
      shorthandCurrentMonth: shorthandCurrentMonth,
      showMonths: showMonths,
      time_24hr: time_24hr,
      weekNumbers: weekNumbers,
    }
    const FP =
      calendarTargetRef && fpRef.current && flatpickr(fpRef.current, options)
    updateFlatpickrInstance(FP)
  }

  const destroyFlatpickrInstance = () => {
    flatpickrInstanceRef.current.destroy()
    setTheDate({})
    flatpickrInstanceRef = null // Not sure if this is actually necessary?
  }

  useEffect(() => {
    createFlatpickrInstance()
    console.log(
      "newly created flatpickr instance: ",
      flatpickrInstanceRef.current
    )

    return () => {
      destroyFlatpickrInstance()
    }
  }, [])

  /* 
  Some config options on the flatpickr instance can not be set with immediate effect, a new instance needs to be created.
  For the corresponding props we have some logic that makes sure we destroy the current instance and create a new one only when absolutely necessary. Also, we need to reduce doing that to only once, even if multiple of the props were updated at the same time for the sake of efficiency, and to make sure we do not call event handlers more often than needed and expected by the user.
  */

  // Store current props that will require creating a new instance when their value changes:
  const prevRerenderingProps = useRef({
    allowInput: allowInput,
    defaultHour: defaultHour,
    defaultMinute: defaultMinute,
    enableTime: enableTime,
    enableSeconds: enableSeconds,
    hourIncrement: hourIncrement,
    minuteIncrement: minuteIncrement,
    mode: mode,
    noCalendar: noCalendar,
    weekNumbers: weekNumbers,
  })

  // Apply a use effect to handle the logic bound to the props that require creating a new faltpickr instance:
  useEffect(() => {
    // set a variable to be set to true once we know we need to destroy the current instance and create  a new one:
    let hasChanged = false

    // For each of the props…
    Object.keys(prevRerenderingProps.current).forEach((propKey) => {
      const prevValue = prevRerenderingProps.current[propKey]
      const currentValue = {
        allowInput,
        defaultHour,
        defaultMinute,
        enableTime,
        enableSeconds,
        hourIncrement,
        minuteIncrement,
        mode,
        monthSelectorType,
        noCalendar,
        weekNumbers,
      }[propKey]

      // … we need to check whether their value has actually changed
      if (prevValue !== currentValue) {
        hasChanged = true
      }
    })

    // After we have checked if any one or multiple of the relevant props have changed, we actually destroy the curent instance and create a new one:
    if (hasChanged) {
      flatpickrInstanceRef?.current?.destroy()
      createFlatpickrInstance()
      console.log("flatpickr instance was destroyed and recreated")
    }

    // Also make sure we update our stored props in order to be ready for the next update:
    prevRerenderingProps.current = {
      allowInput: allowInput,
      defaultHour: defaultHour,
      defaultMinute: defaultMinute,
      enableTime: enableTime,
      enableSeconds: enableSeconds,
      hourIncrement: hourIncrement,
      minuteIncrement: minuteIncrement,
      mode: mode,
      monthSelectorType: monthSelectorType,
      noCalendar: noCalendar,
      weekNumbers: weekNumbers,
    }
  }, [
    allowInput,
    defaultHour,
    defaultMinute,
    enableTime,
    enableSeconds,
    hourIncrement,
    minuteIncrement,
    mode,
    monthSelectorType,
    noCalendar,
    weekNumbers,
  ])

  // TODO: check whether the update is actually in effect in the component:
  useEffect(() => {
    flatpickrInstanceRef.current?.set(
      "allowInvalidPreload",
      allowInvalidPreload
    )
  }, [allowInvalidPreload])

  useEffect(() => {
    flatpickrInstanceRef.current?.set("conjunction", conjunction)
  }, [conjunction])

  useEffect(() => {
    flatpickrInstanceRef.current?.set("dateFormat", dateFormat)
  }, [dateFormat])

  // TODO: disable

  useEffect(() => {
    flatpickrInstanceRef.current?.set("hourIncrement", hourIncrement)
  }, [hourIncrement])

  useEffect(() => {
    flatpickrInstanceRef.current?.set("maxDate", maxDate)
  }, [maxDate])

  useEffect(() => {
    flatpickrInstanceRef.current?.set("minDate", minDate)
  }, [minDate])

  useEffect(() => {
    flatpickrInstanceRef.current?.set(
      "shorthandCurrentMonth",
      shorthandCurrentMonth
    )
  }, [shorthandCurrentMonth])

  // TODO: Will update properly but only apply at next change/user click; not worth destroying and creating a new instance IMO?:
  useEffect(() => {
    flatpickrInstanceRef.current?.set("time_24hr", time_24hr)
  }, [time_24hr])

  useEffect(() => {
    flatpickrInstanceRef.current?.setDate(
      value || defaultDate || defaultValue,
      true
    )
  }, [value, defaultDate, defaultValue])

  useEffect(() => {
    flatpickrInstanceRef.current?.set("weekNumbers", weekNumbers)
  }, [weekNumbers])

  return (
    <div>
      <div className={`juno-datetimepicker-wrapper`}>
        <input
          className={`juno-datetimepicker-input ${className}`}
          disabled={disabled}
          id={theId}
          name={name && name.length ? name : null}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          ref={fpRef}
          type="text"
        />
      </div>
      <div>
        {theDate.selectedDate?.length || theDate.selectedDateStr?.length ? (
          <Icon
            icon="close"
            onClick={handleClearIconClick}
            disabled={disabled}
          />
        ) : (
          ""
        )}
        <Icon
          icon={enableTime && noCalendar ? "accessTime" : "calendarToday"}
          onClick={handleCalendarIconClick}
          disabled={disabled}
        />
      </div>
      <div ref={calendarTargetRef}></div>
    </div>
  )
}

const datePropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.array,
  PropTypes.object,
  PropTypes.number,
])

DateTimePicker.propTypes = {
  allowInput: PropTypes.bool,
  allowInvalidPreload: PropTypes.bool,
  className: PropTypes.string,
  conjunction: PropTypes.string,
  dateFormat: PropTypes.string,
  defaultDate: datePropType,
  defaultHour: PropTypes.number,
  defaultMinute: PropTypes.number,
  defaultValue: datePropType,
  disable: PropTypes.array,
  disabled: PropTypes.bool,
  enableSeconds: PropTypes.bool,
  enableTime: PropTypes.bool,
  hourIncrement: PropTypes.number,
  id: PropTypes.string,
  maxDate: datePropType,
  minDate: datePropType,
  minuteIncrement: PropTypes.number,
  mode: PropTypes.oneOf(["single", "multiple", "range"]),
  monthSelectorType: PropTypes.oneOf(["static", "dropdown"]),
  name: PropTypes.string,
  noCalendar: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onFocus: PropTypes.func,
  onMonthChange: PropTypes.func,
  onOpen: PropTypes.func,
  onReady: PropTypes.func,
  onYearChange: PropTypes.func,
  placeholder: PropTypes.string,
  shorthandCurrentMonth: PropTypes.bool,
  showMonths: PropTypes.number,
  time_24hr: PropTypes.bool,
  value: datePropType,
  weekNumbers: PropTypes.bool,
}

DateTimePicker.defaultProps = {
  allowInput: false,
  allowInvalidPreload: false,
  className: "",
  conjunction: ", ",
  dateFormat: "Y-m-d",
  defaultHour: 12,
  defaultMinute: 0,
  defaultDate: null,
  defaultValue: "",
  disable: [],
  disabled: false,
  enableSeconds: false,
  enableTime: false,
  hourIncrement: 1,
  id: "",
  maxDate: null,
  minDate: null,
  minuteIncrement: 5,
  mode: "single",
  monthSelectorType: "static",
  name: "",
  noCalendar: false,
  onBlur: undefined,
  onChange: undefined,
  onClose: undefined,
  onFocus: undefined,
  onMonthChange: undefined,
  onOpen: undefined,
  onReady: undefined,
  onYearChange: undefined,
  placeholder: "",
  shorthandCurrentMonth: false,
  showMonths: 1,
  time_24hr: false,
  value: "",
  weekNumbers: false,
}
