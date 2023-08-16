import React, { Fragment, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Listbox } from "@headlessui/react"


export const Select = ({
  children,
  defaultValue,
  disabled,
  label,
  loading,
  name,
  onChange,
  placeholder,
  value,
  variant,
  ...props
}) => {
  
  const isNotEmptyString = (str) => {
    return !(typeof str === 'string' && str.trim().length === 0)
  }
  
  const [selectedValue, setSelectedValue] = useState("")
  
  const handleChange = (value) => {
    setSelectedValue(value)
    onChange && onChange(event)
  }
  
  return (
    <Listbox
      defaultValue={defaultValue}
      disabled={disabled}
      name={name}
      onChange={handleChange}
      value={selectedValue}
    >
      <Listbox.Button as="button">
        { selectedValue || placeholder }
      </Listbox.Button>
      <Listbox.Options>
        { children }
      </Listbox.Options>
    </Listbox>
  )
}

Select.propTypes = {
  children: PropTypes.node,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  loading: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  variant: PropTypes.oneOf(["", "primary", "primary-danger", "default", "subdued"]),
}

Select.defaultProps = {
  children: null,
  defaultValue: undefined,
  disabled: false,
  label: undefined,
  loading: false,
  name: undefined,
  onChange: undefined,
  placeholder: "Select…",
  value: undefined,
  variant: undefined,
}