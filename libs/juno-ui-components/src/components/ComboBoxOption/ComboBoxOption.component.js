import React, { Fragment, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Combobox } from "@headlessui/react"
import { Icon } from "../Icon/" 
import "./ComboBoxOption.scss"

const optionStyles = `
  jn-text-theme-default
  jn-pt-[0.6875rem]
  jn-pb-[0.5rem]
  jn-px-[0.875rem]
  data-[headlessui-state=active]:jn-outline-none
  data-[headlessui-state=active]:jn-ring-2
  data-[headlessui-state=active]:jn-ring-inset
  data-[headlessui-state=active]:jn-ring-theme-focus
  data-[headlessui-state=active]:jn-bg-theme-background-lvl-3
  data-[headlessui-state=selected]:text-green
`

export const ComboBoxOption = ({
  value,
  className,
  ...props
}) => {
  return (
    <Combobox.Option
      value={value}
      as={Fragment}
    >
      <li 
        className={`
          juno-combobox-option 
          ${optionStyles}`
        }
        {...props}
      >
        {( {selected }) => (
         selected ?  <Icon icon="check" /> : ""
        )}
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