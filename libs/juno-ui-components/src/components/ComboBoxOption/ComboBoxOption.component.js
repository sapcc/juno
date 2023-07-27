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
  data-[headlessui-state=active]:jn-outline-none
  data-[headlessui-state=active]:jn-ring-2
  data-[headlessui-state=active]:jn-ring-inset
  data-[headlessui-state=active]:jn-ring-theme-focus
  data-[headlessui-state=active]:jn-bg-theme-background-lvl-3
`

const unselectedOptionStyles = `
  jn-text-theme-default
  jn-pl-[2.875rem]
`

const selectedOptionStyles = `
  jn-text-theme-accent
  jn-pl-[0.875rem]
`

const selectedIconStyles = `
  jn-inline-block
`

export const ComboBoxOption = ({
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
        { selectedValue === value ? <Icon icon="check" className={`${selectedIconStyles}`} /> : "" }
        <span>{value}</span>
      </li>

    </Combobox.Option>
  )
}


ComboBoxOption.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
}

ComboBoxOption.defaultProps = {
  value: "",
  className: "",
}