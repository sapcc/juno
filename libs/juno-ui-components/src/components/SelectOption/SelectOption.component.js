import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { Listbox } from "@headlessui/react"

export const SelectOption = ({
  children,
  className,
  disabled,
  label,
  value,
  ...props
}) => {
  return (
    <Listbox.Option disabled={disabled} value={value} {...props} >
      { label || value }
    </Listbox.Option>
  )
}