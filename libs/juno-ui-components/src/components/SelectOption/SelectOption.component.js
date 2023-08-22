import React, { Fragment, useContext } from "react"
import PropTypes from "prop-types"
import { Listbox } from "@headlessui/react"
import { SelectContext } from "../Select/Select.component.js"
import { Icon } from "../Icon/"

const optionStyles = `
  jn-flex
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

const truncateOptionStyles = `
  jn-block
  jn-h-6
  jn-overflow-hidden
  jn-text-ellipsis
  jn-whitespace-nowrap
`

export const SelectOption = ({
  children,
  className,
  disabled,
  label,
  value,
  ...props
}) => {
  
  const selectContext = useContext(SelectContext)
  const {
    truncateOptions: truncateOptions,
  } = selectContext || {}
  
  return (
    <Listbox.Option 
      as={Fragment}
      disabled={disabled} 
      value={value}  
    >
    { ({ active, selected } ) => (
      <li
        className={`
          juno-select-option 
          ${ optionStyles }
          ${ selected ? "juno-select-option-selected " + selectedOptionStyles : unselectedOptionStyles }
          ${ disabled ? "juno-select-option-disabled jn-opacity-50 jn-cursor-not-allowed" : "" }
          ${ className }
        `}
        {...props}
      >
        { selected ? 
            <Icon icon="check" size="18" className={`${selectedIconStyles}`} /> 
          : 
            "" 
        }
        <span
          className={`
            ${ disabled ? disabledOptionLabelStyles : "" }
            ${ truncateOptions ? truncateOptionStyles : "" }
          `}
        >
          { value }
        </span>
      </li>
    )}
    </Listbox.Option>
  )
}

SelectOption.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
}

SelectOption.defaultProps = {
  className: "",
  disabled: false,
  value: "",
}