import React, { useState, useEffect, useId } from "react"
import PropTypes from "prop-types"
import { Combobox } from "@headlessui/react"
import { Label } from "../Label/index.js"
import { Icon } from "../Icon/index.js"
import { FormHint } from "../FormHint/index.js"

const inputWrapperStyles = `
  jn-relative
`

const inputStyles = `
  jn-rounded-3px
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
  jn-border-theme-textinput-default
  jn-border-l-0
  jn-border-y-[1px]
  jn-border-r-[1px]
  jn-rounded-tr
  jn-rounded-br
  jn-appearance-none
  jn-bg-theme-textinput
  jn-text-theme-textinput
`

const menuStyles = `
  jn-rounded
  jn-bg-theme-background-lvl-1
`

export const ComboBox = ({
  ariaLabel,
  children,
  className,
  disabled,
  helptext,
  label,
  nullable,
  placeholder,
  onChange,
  onInputChange,
  truncateOptions,
  value,
  width,
  ...props
}) => {
  
  const isNotEmptyString = (str) => {
    return !(typeof str === 'string' && str.trim().length === 0)
  }
  
  const uniqueId = () => (
    "juno-combobox-" + useId()
  )
  
  const [selectedValue, setSelectedValue] = useState(false)
  const [searchStr, setSearchStr] = useState("")
  
  useEffect(() => {
    setSelectedValue(value)
  }, [value] )
  
  const handleInputChange = (event) => {
    setSearchStr(event.target.value)
  }
  
  const handleChange = (value) => {
    setSelectedValue(value)
    onChange && onChange(value)
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
      
        <Combobox 
          nullable={nullable}
          onChange={handleChange}
          value={selectedValue}
        >
          <div className={`${inputWrapperStyles}`}>
            
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
            
            <Combobox.Input 
              aria-label={ariaLabel || label}
              disabled={disabled} 
              onChange={handleInputChange}
              placeholder={placeholder} 
              displayValue={selectedValue}
              className={`juno-combobox-input ${inputStyles} ${className}`} 
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
        
        { helptext && isNotEmptyString(helptext) ?
            <FormHint text={helptext} />
          :
            ""
         }
        
    </div>
  )
}

ComboBox.propTypes = {
  ariaLabel: PropTypes.string,
  /** The children to Render. Use `ComboBox.Option` elements. */
  children: PropTypes.node,
  /*+ A custom className. Will be passed to the text input element of the ComboBox */
  className: PropTypes.string,
  /*+ Whether the ComboBox is disabled */
  disabled: PropTypes.bool,
  helptext: PropTypes.string,
  /** The label of the ComboBox */
  label: PropTypes.string,
  /** Whether the ComboBox can be reset to having no value selected by manually clearing the text and clicking outside of the ComboBox. Default is TRUE. When set to FALSE, the selected value can only be changed by selecting another value after the initial selection, but never back to no selected value at all. */
  nullable: PropTypes.bool,
  /** A placeholder to render in the text input */
  placeholder: PropTypes.string,
  /** The selected value of the ComboBox in Controlled Mode. */
  value: PropTypes.string,
  /** The width of the text input. Either 'full' (default) or 'auto'. */
  width: PropTypes.oneOf(["full", "auto"])
}

ComboBox.defaultProps = {
  ariaLabel: undefined,
  children: null,
  className: "",
  disabled: false,
  helptext: "",
  label: undefined,
  nullable: true,
  placeholder: "Select…",
  value: "",
  width: "full",
}