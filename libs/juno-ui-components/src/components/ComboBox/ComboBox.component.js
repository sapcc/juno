import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Combobox } from "@headlessui/react"
import { Icon } from "../Icon/index.js"

const inputWrapperStyles = `
  jn-relative
  jn-inline-block
  jn-bg-theme-textinput
  jn-text-theme-textinput
  jn-border
  jn-rounded-3px
`

const inputStyles = `
  jn-text-base
  jn-leading-4
  jn-px-4
  jn-h-textinput
  focus:jn-outline-none
  focus:jn-ring-2
  focus:jn-ring-theme-focus
  disabled:jn-opacity-50
`

const buttonStyles = `
  jn-absolute
  jn-right-0
  jn-h-textinput
  jn-top-0
  jn-w-6
  jn-h-4
  jn-border
`

export const ComboBox = ({
  children,
  disabled,
  label,
  value,
  placeholder,
  width,
  ...props
}) => {
  const [searchStr, setSearchStr] = useState("")
  
  const handleInputChange = (event) => {
    setSearchStr(event.target.value)
  }
  
  const filteredChildren = 
    searchStr === ""
    ? children
    : children.filter((child) => 
        child.props.value?.toLowerCase().includes(searchStr.toLowerCase())
      )
  
  return (
    <div>
      <Combobox>
        <div className={`${inputWrapperStyles}`}>
          <Combobox.Input 
            disabled={disabled} 
            placeholder={placeholder} 
            onChange={handleInputChange}
            className={`${inputStyles}`} 
          />
          <Combobox.Button disabled={disabled} className={`${buttonStyles}`}>
            {({open}) => (
              <Icon icon={ open ? "expandLess": "expandMore"} />
            )}
          </Combobox.Button>
        </div>
        <Combobox.Options>
          { filteredChildren }
        </Combobox.Options>
      </Combobox>
    </div>
  )
}

ComboBox.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.oneOf(["full", "auto"])
}

ComboBox.defaultProps = {
  children: null,
  disabled: false,
  label: undefined,
  placeholder: "Select…",
  value: undefined,
  width: "full",
}