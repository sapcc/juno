import React, { useState, useEffect, useId, useMemo, createContext } from "react"
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
`

const disabledInputStyles = `
  jn-cursor-not-allowed
  jn-pointer-events-none
  jn-opacity-50
`

const defaultBorderStyles = `
  jn-border-theme-textinput-default
`

const validStyles = `
  jn-border-theme-success
`

const invalidStyles = `
  jn-border-theme-error
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
  jn-border-l-0
  jn-border-y-[1px]
  jn-border-r-[1px]
  jn-rounded-tr
  jn-rounded-br
  jn-appearance-none
  jn-bg-theme-textinput
  jn-text-theme-textinput
`

const defaultButtonStyles = `
  jn-border-theme-textinput-default
`

const invalidButtonStyles = `
  jn-border-theme-error
`

const validButtonStyles = `
  jn-border-theme-success
`

const menuStyles = `
  jn-mt-1
  jn-rounded
  jn-bg-theme-background-lvl-1
`

export const ComboBoxContext = createContext()

export const ComboBox = ({
  ariaLabel,
  children,
  className,
  disabled,
  error,
  errortext,
  helptext,
  invalid,
  label,
  nullable,
  placeholder,
  required,
  onChange,
  onInputChange,
  successtext,
  truncateOptions,
  valid,
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
  const [isInvalid, setIsInvalid] = useState(false)
  const [isValid, setIsValid] = useState(false)
  
  useEffect(() => {
    setSelectedValue(value)
  }, [value] )
  
  const handleInputChange = (event) => {
    setSearchStr(event.target.value)
    onInputChange && onInputChange(event)
  }
  
  const handleChange = (value) => {
    setSelectedValue(value)
    onChange && onChange(value)
  }
  
  const invalidated = useMemo(
    () => invalid || (errortext && isNotEmptyString(errortext) ? true : false),
    [invalid, errortext]
  )
  const validated = useMemo(
    () => valid || (successtext && isNotEmptyString(successtext) ? true : false),
    [valid, successtext]
  )
  
  useEffect(() => {
    setIsInvalid(invalidated)
  }, [invalidated])
  
  useEffect(() => {
    setIsValid(validated)
  }, [validated])
  
  const filteredChildren = 
    searchStr === ""
    ? children
    : children.filter((child) => 
        child.props.value?.toLowerCase().includes(searchStr.toLowerCase())
      )
      
  
  return (
    
    <ComboBoxContext.Provider value={
        {
          selectedValue: selectedValue,
          truncateOptions: truncateOptions
        }
      }
    >
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
            disabled={disabled}
          >
            <div className={`${inputWrapperStyles}`}>
              
              { label && isNotEmptyString(label) ?
                  <Label 
                    text={label}
                    disabled={disabled}
                    required={required}
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
                autoComplete="off"
                className={`
                  juno-combobox-input 
                  ${inputStyles} 
                  ${ disabled ? disabledInputStyles : "" }
                  ${ isInvalid ? "juno-textinput-invalid " + invalidStyles : "" } 
                  ${ isValid ? "juno-textinput-valid " + validStyles : "" }  
                  ${ isValid || isInvalid ? "" : defaultBorderStyles } 
                  ${className}
                `} 
              />
              <Combobox.Button 
                disabled={disabled} 
                className={`
                  juno-combobox-toggle 
                  ${buttonStyles}
                  ${ isInvalid ? "juno-combobox-toggle-invalid " + invalidButtonStyles : "" } 
                  ${ isValid ? "juno-combobox-toggle-valid " + validButtonStyles : "" }  
                  ${ isValid || isInvalid ? "" : defaultButtonStyles } 
                `}>
                {({open}) => (
                  <Icon icon={ open ? "expandLess": "expandMore"} />
                )}
              </Combobox.Button>
            </div>
            <Combobox.Options className={`juno-combobox-options ${menuStyles}`} >
              { filteredChildren }
            </Combobox.Options>
          </Combobox>
          { errortext && isNotEmptyString(errortext) ?
              <FormHint text={errortext} variant="error"/>
            :
              ""
          }
          { successtext && isNotEmptyString(successtext) ?
              <FormHint text={successtext} variant="success"/>
            :
              ""
          }
          { helptext && isNotEmptyString(helptext) ?
              <FormHint text={helptext} />
            :
              ""
           }
          
      </div>
    
    </ComboBoxContext.Provider>
    
  )
}

ComboBox.propTypes = {
  /** The aria-label of the ComboBox. Defaults to the label if label was passed. */
  ariaLabel: PropTypes.string,
  /** The children to Render. Use `ComboBox.Option` elements. */
  children: PropTypes.node,
  /*+ A custom className. Will be passed to the text input element of the ComboBox */
  className: PropTypes.string,
  /*+ Whether the ComboBox is disabled */
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errortext: PropTypes.string,
  /** A helptext to render to explain meaning and significance of the ComboBox */
  helptext: PropTypes.string,
  invalid: PropTypes.bool,
  /** The label of the ComboBox */
  label: PropTypes.string,
  /** Whether the ComboBox can be reset to having no value selected by manually clearing the text and clicking outside of the ComboBox. Default is TRUE. When set to FALSE, the selected value can only be changed by selecting another value after the initial selection, but never back to no selected value at all. */
  nullable: PropTypes.bool,
  /** A handler to execute when the ComboBox' selected value changes */
  onChange: PropTypes.func,
  /** Handler to execute when the ComboBox text input value changes */
  onInputChange: PropTypes.func,
  /** A placeholder to render in the text input */
  placeholder: PropTypes.string,
  /** Whether the ComboBox is required */
  required: PropTypes.bool,
  successtext: PropTypes.string,
  /** NOT IMPLEMENTED YET: Whether the option labels should be truncated in case they are longer/wider than the available space in an option or not. Default is FALSE. */
  truncateOptions: PropTypes.bool,
  valid: PropTypes.bool,
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
  error: false,
  errortext: "",
  helptext: "",
  invalid: false,
  label: undefined,
  nullable: true,
  onChange: undefined,
  onInputChange: undefined,
  placeholder: "Select…",
  required: false,
  successtext: "",
  truncateOptions: false,
  valid: false,
  value: "",
  width: "full",
}