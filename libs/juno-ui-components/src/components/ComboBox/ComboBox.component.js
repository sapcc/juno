import React, { useState, useEffect, useId, useMemo, createContext } from "react"
import PropTypes from "prop-types"
import { Combobox } from "@headlessui/react"
import { Label } from "../Label/index.js"
import { Icon } from "../Icon/index.js"
import { FormHint } from "../FormHint/index.js"
import { Spinner } from "../Spinner/index.js"

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
  focus:jn-outline-none
  focus:jn-ring-2
  focus:jn-ring-theme-focus
`

const withLabelInputStyles = `
  jn-pt-[1.125rem] 
  jn-pb-1
`

const noLabelInputStyles = `
  jn-py-4
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
  jn-left-[0.9375rem]
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

const disabledButtonStyles = `
  jn-cursor-not-allowed
  jn-pointer-events-none
  jn-bg-transparent
  jn-opacity-50
`

const menuStyles = `
  jn-mt-1
  jn-rounded
  jn-bg-theme-background-lvl-1
`

const iconContainerStyles = `
  jn-absolute
  jn-top-[.4rem]
  jn-right-6
`

const centeredIconStyles = `
  jn-absolute
  jn-top-1/2
  jn-left-1/2
  jn-translate-y-[-50%]
  jn-translate-x-[-0.75rem]
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
  id,
  invalid,
  label,
  loading,
  nullable,
  placeholder,
  required,
  onBlur,
  onChange,
  onFocus,
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
  
  const theId = id || uniqueId()
  const helptextId = "juno-combobox-helptext-" + useId()
  
  const [selectedValue, setSelectedValue] = useState(false)
  const [searchStr, setSearchStr] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [hasFocus, setFocus] = useState(false)
  
  useEffect(() => {
    setSelectedValue(value)
  }, [value] )
  
  useEffect(() => {
    setIsInvalid(invalidated)
  }, [invalidated])
  
  useEffect(() => {
    setIsValid(validated)
  }, [validated])
  
  useEffect(() => {
    setHasError(error)
  }, [error])
  
  useEffect(() => {
    setIsLoading(loading)
  }, [loading])
  
  const invalidated = useMemo(
    () => invalid || (errortext && isNotEmptyString(errortext) ? true : false),
    [invalid, errortext]
  )
  const validated = useMemo(
    () => valid || (successtext && isNotEmptyString(successtext) ? true : false),
    [valid, successtext]
  )
  
  const handleInputChange = (event) => {
    setSearchStr(event.target.value)
    onInputChange && onInputChange(event)
  }
  
  const handleChange = (value) => {
    setSelectedValue(value)
    onChange && onChange(value)
  }
  
  const handleFocus = (event) => {
    setFocus(true)
    onFocus && onFocus(event)
  }
  
  const handleBlur = (event) => {
    setFocus(false)
    onBlur && onBlur(event)
  }
  
  
  
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
            disabled={ disabled || isLoading || hasError }
          >
            <div className={`${inputWrapperStyles}`}>
              
              { label && isNotEmptyString(label) && !isLoading && !hasError ?
                  <Label 
                    text={label}
                    disabled={disabled}
                    required={required}
                    htmlFor={theId}
                    className={`${labelStyles}`}
                    floating
                    minimized={ placeholder || hasFocus || (searchStr && isNotEmptyString(searchStr) || (selectedValue && isNotEmptyString(selectedValue)) ) ? true : false}
                  />
                :
                  ""
              }
              
              <Combobox.Input 
                autoComplete="off"
                aria-label={ ariaLabel || label }
                aria-describedby={ helptext ? helptextId : "" }
                disabled={ disabled || isLoading || hasError } 
                displayValue={selectedValue}
                id={theId}
                onBlur={handleBlur}
                onChange={handleInputChange}
                onFocus={handleFocus}
                placeholder={ !isLoading && !hasError ? placeholder : ""} 
                className={`
                  juno-combobox-input 
                  ${inputStyles} 
                  ${ label && isNotEmptyString(label) ? withLabelInputStyles : noLabelInputStyles }
                  ${ disabled ? disabledInputStyles : "" }
                  ${ isInvalid ? "juno-combobox-invalid " + invalidStyles : "" } 
                  ${ isValid ? "juno-combobox-valid " + validStyles : "" }  
                  ${ isValid || isInvalid ? "" : defaultBorderStyles } 
                  ${ isLoading || hasError ? "jn-cursor-not-allowed" : "" }
                  ${className}
                `} 
                {...props}
              />
              { 
                isLoading || hasError ? 
                  <span className={`${centeredIconStyles}`}>
                    { isLoading ? 
                        <Spinner className={"jn-cursor-not-allowed"} />
                      :
                        <Icon icon="errorOutline" color="jn-text-theme-error" className={"jn-cursor-not-allowed"} />
                    }
                  </span>
                :
                    isValid || isInvalid  ?
                      <span className={`
                        juno-combobox-icon-container 
                        ${iconContainerStyles} 
                        ${ disabled ? "jn-opacity-50" : "" }
                      `}>
                        <Icon 
                          icon={ isValid ? "checkCircle" : "dangerous" }
                          color={ isValid ? "jn-text-theme-success" : "jn-text-theme-error"  }
                        />
                      </span>
                    :
                      ""
              }
              {
                !hasError && !isLoading ?
                  <Combobox.Button 
                    disabled={disabled} 
                    className={`
                      juno-combobox-toggle 
                      ${buttonStyles}
                      ${ disabled ? disabledButtonStyles : "" }
                      ${ isInvalid ? "juno-combobox-toggle-invalid " + invalidButtonStyles : "" } 
                      ${ isValid ? "juno-combobox-toggle-valid " + validButtonStyles : "" }  
                      ${ isValid || isInvalid ? "" : defaultButtonStyles } 
                    `}>
                    {({open}) => (
                      <Icon icon={ open ? "expandLess": "expandMore"} />
                    )}
                  </Combobox.Button>
                :
                  ""
              }

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
              <FormHint text={helptext} id={helptextId} />
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
  /** A custom className. Will be passed to the text input element of the ComboBox */
  className: PropTypes.string,
  /** Whether the ComboBox is disabled */
  disabled: PropTypes.bool,
  /** Whether the ComboBox has an error. Note this refers to an internal error like failing to load options etc., to indicate failed validation use `invalid` instead. */
  error: PropTypes.bool,
  /** An errortext to display when the ComboBox failed validation or an internal error occurred. */
  errortext: PropTypes.string,
  /** A helptext to render to explain meaning and significance of the ComboBox */
  helptext: PropTypes.string,
  /** The Id of the ComboBox. Will be assigned to the text input part of the ComboBox. If not passed, an id will be auto-generated. */
  id: PropTypes.string,
  /** Whether the ComboBox failed validation */
  invalid: PropTypes.bool,
  /** The label of the ComboBox */
  label: PropTypes.string,
  /** Whether the ComboBox is busy loading options */ 
  loading: PropTypes.bool,
  /** Whether the ComboBox can be reset to having no value selected by manually clearing the text and clicking outside of the ComboBox. Default is TRUE. When set to FALSE, the selected value can only be changed by selecting another value after the initial selection, but never back to no selected value at all. */
  nullable: PropTypes.bool,
  /** A handler to execute when the ComboBox looses focus */
  onBlur: PropTypes.func,
  /** A handler to execute when the ComboBox' selected value changes */
  onChange: PropTypes.func,
  /** A handler to execute when the ComboBox input receives focus */
  onFocus: PropTypes.func,
  /** Handler to execute when the ComboBox text input value changes */
  onInputChange: PropTypes.func,
  /** A placeholder to render in the text input */
  placeholder: PropTypes.string,
  /** Whether the ComboBox is required */
  required: PropTypes.bool,
  /** A text to display in case the ComboBox was successfully validated. Will set the ComboBox to `valid` when passed. */
  successtext: PropTypes.string,
  /** Whether the option labels should be truncated in case they are longer/wider than the available space in an option or not. Default is FALSE. */
  truncateOptions: PropTypes.bool,
  /** Whether the ComboBox was successfully validated */
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
  id: "",
  invalid: false,
  label: undefined,
  loading: false,
  nullable: true,
  onBlur: undefined,
  onChange: undefined,
  onFocus: undefined,
  onInputChange: undefined,
  placeholder: "Select…",
  required: false,
  successtext: "",
  truncateOptions: false,
  valid: false,
  value: "",
  width: "full",
}