import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Combobox } from "@headlessui/react"
import { Label } from "../Label/index.js"
import { Icon } from "../Icon/index.js"

const inputWrapperStyles = `
  jn-relative
  jn-bg-theme-textinput
  jn-text-theme-textinput
  jn-border
  jn-rounded-3px
`

const inputStyles = `
  jn-bg-theme-textinput
  jn-text-theme-textinput
  jn-border
  jn-border-theme-textinput-default
  jn-text-base
  jn-leading-4
  jn-w-full
  jn-px-4
  jn-h-textinput
  jn-text-left
  jn-pt-[0.4rem]
  focus:jn-outline-none
  focus:jn-ring-2
  focus:jn-ring-theme-focus
  data-[headlessui-state=disabled]:jn-opacity-50
`

const labelStyles = `
  jn-pointer-events-none
  jn-top-2
  jn-left-4
`

const buttonStyles = `
  jn-absolute
  jn-top-0
  jn-right-0
  jn-h-textinput
  jn-w-6
  jn-h-4
  jn-border-transparent
  jn-appearance-none
  jn-bg-theme-textinput
  jn-text-theme-textinput
`

const menuStyles = `
  jn-rounded
  jn-bg-theme-background-lvl-1
`

export const ComboBox = ({
  children,
  disabled,
  label,
  value,
  placeholder,
  truncateOptions,
  width,
  ...props
}) => {
  
  const isNotEmptyString = (str) => {
    return !(typeof str === 'string' && str.trim().length === 0)
  }
  
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
    <div className={`
      juno-combobox-wrapper
      jn-relative
      ${ width == "auto" ? "jn-inline-block" : "jn-block" }
      ${ width == "auto" ? "jn-w-auto" : "jn-w-full" }
    `}>
      
      
        { label && isNotEmptyString(label) ?
            <Label 
              text={label}
              className={`${labelStyles}`}
              floating
              minimized
            />
          :
            ""
        }
        
        <Combobox>
          <div className={`${inputWrapperStyles}`}>
            <Combobox.Input 
              disabled={disabled} 
              placeholder={placeholder} 
              onChange={handleInputChange}
              className={`
                juno-combobox-input 
                ${inputStyles}`
              } 
            />
            <Combobox.Button disabled={disabled} className={`juno-combobox-toggle ${buttonStyles}`}>
              {({open}) => (
                <Icon icon={ open ? "expandLess": "expandMore"} />
              )}
            </Combobox.Button>
          </div>
          <Combobox.Options className={`juno-combobox-options ${menuStyles}`} >
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