import React, { useEffect, useRef, useId, useMemo, useState } from "react"
import PropTypes from "prop-types"
import flatpickr from "flatpickr"
import { Icon } from "../Icon/"

export const DateTimePicker = ({
  allowInput,
  className,
  defaultDate,
  defaultValue,
  disabled,
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
  ...props
}) => {
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
      appendTo: calendarTargetRef.current,
      defaultDate: defaultDate || defaultValue,
      onChange: handleChange,
      onClose: handleClose,
      onMonthChange: handleMonthChange,
      onOpen: handleOpen,
      onReady: handleReady,
      onValueUpdate: handleValueUpdate,
      onYearChange: handleYearChange,
      positionElement: calendarTargetRef.current,
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

  // Updating allowInput in config options on the instance via 'set()' seems to work, however flatpickr doesn't appear to properly update the rendered input? -> This may require destroying the current instance and creating a new one?
  useEffect(() => {
    // console.log(flatpickrInstanceRef.current?.config.allowInput)
    // console.log(flatpickrInstanceRef.current?.config.allowInput)
    flatpickrInstanceRef.current.destroy()
    createFlatpickrInstance()
  }, [allowInput])

  return (
    <div>
      <div className={`juno-datetimepicker-wrapper`}>
        <input
          className={`juno-datetimepicker-input ${className}`}
          disabled={disabled}
          type="text"
          onChange={onChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          ref={fpRef}
        />
      </div>
      <div>
        <Icon icon="close" onClick={handleClearIconClick} disabled={disabled} />
        <Icon
          icon="calendarToday"
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
  className: PropTypes.string,
  defaultDate: datePropType,
  defaultValue: datePropType,
  disabled: PropTypes.bool,
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
  value: datePropType,
}

DateTimePicker.defaultProps = {
  allowInput: false,
  className: "",
  defaultDate: null,
  defaultValue: "",
  disabled: false,
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
  value: "",
}
