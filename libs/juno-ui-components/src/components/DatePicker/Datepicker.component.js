import React from "react"
import PropTypes from "prop-types"
import Flatpickr from "react-flatpickr"


export const Datepicker = ({
  ...props
}) => {
  return (
    <div className="juno-datepicker-wrapper">
      <Flatpickr />
    </div>
  )
}