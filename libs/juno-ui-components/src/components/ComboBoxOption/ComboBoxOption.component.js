import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Combobox } from "@headlessui/react"

export const ComboBoxOption = ({
  value,
  ...props
}) => {
  return (
    <Combobox.Option value={value} {...props} />
  )
}