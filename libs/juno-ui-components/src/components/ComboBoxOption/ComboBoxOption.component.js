import React, { Fragment, useState, useEffect, useContext } from "react"
import PropTypes from "prop-types"
import { Combobox } from "@headlessui/react"
import { ComboBoxContext } from "../ComboBox/ComboBox.component.js"
import { Icon } from "../Icon/" 
import "./ComboBoxOption.scss"

const optionStyles = `
  jn-pt-[0.6875rem]
  jn-pb-[0.5rem]
  jn-pr-[0.875rem]
  jn-select-none
  data-[headlessui-state=active]:jn-outline-none
  data-[headlessui-state=active]:jn-ring-2
  data-[headlessui-state=active]:jn-ring-inset
  data-[headlessui-state=active]:jn-ring-theme-focus
  data-[headlessui-state=active]:jn-bg-theme-background-lvl-3
`

const unselectedOptionStyles = `
  jn-text-theme-default
  jn-pl-[2.375rem]
`

const selectedOptionStyles = `
  jn-text-theme-accent
  jn-pl-3.5
`

const selectedIconStyles = `
  jn-inline-block
  jn-mr-1.5
`

const disabledOptionLabelStyles = `
  jn-opacity-50
  jn-cursor-not-allowed
`

export const ComboBoxOption = ({
  disabled,
  value,
  className,
  ...props
}) => {
  
  const comboBoxContext = useContext(ComboBoxContext)
  const {
    selectedValue: selectedValue,
    truncateOptions: truncateOptions,
  } = comboBoxContext || {}
  
  return (
    <Combobox.Option
      value={value}
      disabled={disabled}
      as={Fragment}
    >
      <li 
        className={`
          juno-combobox-option 
          ${optionStyles}
          ${ selectedValue === value ? selectedOptionStyles : unselectedOptionStyles }
        `}
        {...props}
      >
        { selectedValue === value ? <Icon icon="check" size="18" className={`${selectedIconStyles}`} /> : "" }
        <span className={`${disabled ? disabledOptionLabelStyles : ""}`}>{value}</span>
      </li>

    </Combobox.Option>
  )
}


ComboBoxOption.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string,
  className: PropTypes.string,
}

ComboBoxOption.defaultProps = {
  disabled: false,
  value: "",
  className: "",
}