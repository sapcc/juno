import React, { useEffect, useRef, useId, useMemo, useState } from "react"
import PropTypes from "prop-types"
import flatpickr from "flatpickr"
import { Icon } from "../Icon/"

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
  enable,
  enableSeconds,
  enableTime,
  hourIncrement,
  id,
  maxDate,
  minDate,
  minuteIncrement,
  mode,
  name,
  noCalendar,
  onBlur,
  onChange,
  onClose,
  onFocus,
  onMonthChange,
  onOpen,
  onReady,
  onValueUpdate,
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

  const updateFlatpickrInstance = (newKeys) =>
    (flatpickrInstanceRef.current = {
      ...flatpickrInstanceRef.current,
      ...Object.keys(newKeys).reduce((a, key) => {
        a[key] = newKeys[key]
        return a
      }, {}),
    })

  const handleChange = (selectedDate, dateStr, instance) => {
    console.log(selectedDate)
    console.log(dateStr)
    onChange && onChange(selectedDate, dateStr)
  }

  const handleClose = (selectedDate, dateStr, instance) => {
    onClose && onClose(selectedDate, dateStr)
  }

  const handleMonthChange = (selectedDate, dateStr, instance) => {
    onMonthChange && onMonthChange(selectedDate, dateStr)
  }

  const handleOpen = (selectedDate, dateStr, instance) => {
    onOpen && onOpen(selectedDate, dateStr)
  }

  const handleReady = (selectedDate, dateStr, instance) => {
    onReady && onReady(selectedDate, dateStr)
  }

  const handleValueUpdate = (selectedDate, dateStr, instance) => {
    onValueUpdate && onValueUpdate(selectedDate, dateStr)
  }

  const handleYearChange = (selectedDate, dateStr, instance) => {
    onYearChange && onYearChange(selectedDate, dateStr)
  }

  const handleInputFocus = (event) => {
    onFocus && onFocus(event)
  }

  const handleCalendarIconClick = () => {
    flatpickrInstanceRef.current?.open()
  }

  const handleClearIconClick = () => {
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
      onChange: handleChange,
      onClose: handleClose,
      onMonthChange: handleMonthChange,
      onOpen: handleOpen,
      onReady: handleReady,
      onValueUpdate: handleValueUpdate,
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

  // All props that refer to config options that require a rerender of the flatpickr are here:
  useEffect(() => {
    flatpickrInstanceRef?.current?.destroy()
    createFlatpickrInstance()
  }, [
    allowInput,
    mode,
    defaultHour,
    defaultMinute,
    enableTime,
    enableSeconds,
    hourIncrement,
    minuteIncrement,
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

  // Will update properly but only apply at next change/user click; not worth destroying and creating a new instance IMO?:
  useEffect(() => {
    flatpickrInstanceRef.current?.set("time_24hr", time_24hr)
  }, [time_24hr])

  useEffect(() => {
    flatpickrInstanceRef.current?.setDate(value, true)
  }, [value])

  useEffect(() => {
    flatpickrInstanceRef.current?.set("weekNumbers", true)
  }, [weekNumbers])

  return (
    <div>
      <div className={`juno-datetimepicker-wrapper`}>
        <input
          className={`juno-datetimepicker-input ${className}`}
          disabled={disabled}
          id={theId}
          name={name && name.length ? name : null}
          onChange={onChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          ref={fpRef}
          type="text"
        />
      </div>
      <div>
        <Icon icon="close" onClick={handleClearIconClick} disabled={disabled} />
        <Icon
          icon="calendarToday" // TODO: show clock icon if mode="time"
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
  name: PropTypes.string,
  noCalendar: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onFocus: PropTypes.func,
  onMonthChange: PropTypes.func,
  onOpen: PropTypes.func,
  onReady: PropTypes.func,
  onValueUpdate: PropTypes.func,
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
  name: "",
  noCalendar: false,
  onBlur: undefined,
  onChange: undefined,
  onClose: undefined,
  onFocus: undefined,
  onMonthChange: undefined,
  onOpen: undefined,
  onReady: undefined,
  onValueUpdate: undefined,
  onYearChange: undefined,
  placeholder: "",
  shorthandCurrentMonth: false,
  showMonths: 1,
  time_24hr: false,
  value: "",
  weekNumbers: false,
}
