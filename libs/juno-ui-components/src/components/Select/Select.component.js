import React, { Fragment, createContext, useEffect, useId, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Listbox } from "@headlessui/react"
import { SelectOption } from "../SelectOption/"
import { Label } from "../Label/"
import { Icon } from "../Icon/"
import { Spinner } from "../Spinner/"
import { FormHint } from "../FormHint/"

const labelStyles = `
  jn-no-wrap
  jn-pointer-events-none
  jn-top-2
  jn-left-4
`

const toggleStyles = `
  jn-appearance-none
  jn-bg-theme-select
  jn-h-[2.375rem]
  jn-inline-flex
  jn-items-center
  jn-px-4
  jn-rounded-3px
  jn-select-none
  jn-text-theme-high
  jn-text-base
  focus:jn-outline-none
  focus:jn-ring-2
  focus:jn-ring-theme-focus
`

const defaultToggleBorderStyles = `

`

const validToggleStyles = `
  jn-border
  jn-border-theme-success
`

const invalidToggleStyles = `
  jn-border
  jn-border-theme-error
`

const centeredIconStyles = `
  jn-absolute
  jn-top-1/2
  jn-left-1/2
  jn-translate-y-[-50%]
  jn-translate-x-[-0.75rem]
`

const menuStyles = `
  jn-rounded
  jn-bg-theme-background-lvl-1
`

const truncateStyles = `
  jn-block
  jn-h-6
  jn-overflow-hidden
  jn-text-ellipsis
  jn-whitespace-nowrap
`

export const SelectContext = createContext()

export const Select = ({
  ariaLabel,
  children,
  className,
  defaultValue,
  disabled,
  error,
  errortext,
  helptext,
  id,
  invalid,
  label,
  loading,
  name,
  onChange,
  placeholder,
  required,
  successtext,
  truncateOptions,
  valid,
  value,
  variant,
  width,
  ...props
}) => {
  
  const isNotEmptyString = (str) => {
    return !(typeof str === 'string' && str.trim().length === 0)
  }
  
  const uniqueId = () => (
    "juno-select-" + useId()
  )
  
  const theId = id || uniqueId()
  const helptextId = "juno-select-helptext-" + useId()
  
  const [selectedValue, setSelectedValue] = useState("")
  const [hasError, setHasError] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const invalidated = useMemo(
    () => invalid || (errortext && isNotEmptyString(errortext) ? true : false),
    [invalid, errortext]
  )
  const validated = useMemo(
    () => valid || (successtext && isNotEmptyString(successtext) ? true : false),
    [valid, successtext]
  )
  
  useEffect(() => {
    setSelectedValue(value)
  }, [value])
  
  useEffect(() => {
    setHasError(error)
  }, [error])
  
  useEffect(() => {
    setIsInvalid(invalidated)
  }, [invalidated])
  
  useEffect(() => {
    setIsValid(validated)
  }, [validated])
  
  useEffect(() => {
    setIsLoading(loading)
  }, [loading])
  
  const handleChange = (value) => {
    setSelectedValue(value)
    onChange && onChange(value, event)
  }
  
  return (
    <SelectContext.Provider value={
      {
        truncateOptions: truncateOptions
      }
    }>
      <div
        className={`
          juno-select-wrapper 
          jn-relative
          ${ width == "auto" ? "jn-inline-block" : "jn-block" }
          ${ width == "auto" ? "jn-w-auto" : "jn-w-full" }
        `}
      >
        <Listbox
          disabled={ disabled || isLoading || hasError } 
          name={name}
          onChange={handleChange}
          value={value}
          defaultValue={defaultValue}
          
        >
          { label && isNotEmptyString(label) ?
              <Listbox.Label 
                as={Label}
                htmlFor={theId}
                text={label}
                className={`${labelStyles}`}
                disabled={ disabled || isLoading || hasError } 
                required={required}
                floating
                minimized
              />
            :
              ""
          }
          <Listbox.Button 
            aria-describedby={ helptext ? helptextId : "" }
            aria-label={ ariaLabel || label }
            as="button" 
            id={theId}
            className={`
              juno-select-toggle
              ${ width == "auto" ? "jn-w-auto" : "jn-w-full" }
              ${ toggleStyles }
              ${ label && isNotEmptyString(label) ? "jn-pt-[0.4rem]" : "" }
              ${ disabled ? "juno-select-disabled jn-opacity-50 jn-cursor-not-allowed" : "" }
              ${ isLoading || hasError ? "jn-justify-center" : "jn-justify-between" }
              ${ isInvalid ? "juno-select-invalid " + invalidToggleStyles : "" } 
              ${ isValid ? "juno-select-valid " + validToggleStyles : "" }  
              ${ isValid || isInvalid ? "" : defaultToggleBorderStyles } 
              ${ isLoading ? "juno-select-loading jn-cursor-not-allowed" : "" }
              ${ hasError ? "juno-select-error jn-cursor-not-allowed" : "" }
              ${ className }
            `}
            {...props}
          >
            {({ open }) => (
              
              (!hasError && !isLoading) ?
                <>
                  <span className={`${truncateStyles}`}>
                    { selectedValue || placeholder }
                  </span>
                  <span className="jn-flex">
                    { isValid ? 
                        <Icon icon="checkCircle" color="jn-text-theme-success" />
                      : ""
                    }
                    { isInvalid ? 
                        <Icon icon="dangerous" color="jn-text-theme-error" />
                      : ""
                    }
                    <span><Icon icon={ open ? "expandLess" : "expandMore" } /></span>
                  </span>
                </>
              :
                <span className={`${centeredIconStyles}`} >
                  { hasError ?
                     <Icon icon="errorOutline" color="jn-text-theme-error" className={"jn-cursor-not-allowed"} />
                    :
                      isLoading ?
                        <Spinner className={"jn-cursor-not-allowed"} />
                      :
                        ""
                  }
                </span>
              
            )}

          </Listbox.Button>
          <Listbox.Options 
            className={`
              juno-select-menu
              ${menuStyles}
            `}
          >
            { children }
          </Listbox.Options>
        </Listbox>
        
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
    </SelectContext.Provider>
  )
}

Select.propTypes = {
  ariaLabel: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  errortext: PropTypes.node,
  helptext: PropTypes.node,
  id: PropTypes.node,
  invalid: PropTypes.bool,
  label: PropTypes.string,
  loading: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  successtext: PropTypes.node,
  truncateOptions: PropTypes.bool,
  valid: PropTypes.bool,
  value: PropTypes.string,
  variant: PropTypes.oneOf(["", "primary", "primary-danger", "default", "subdued"]),
  width: PropTypes.oneOf(["full", "auto"])
}

Select.defaultProps = {
  ariaLabel: "",
  children: null,
  className: "",
  defaultValue: undefined,
  disabled: false,
  errortext: "",
  helptext: "",
  id: "",
  invalid: false,
  label: undefined,
  loading: false,
  name: undefined,
  onChange: undefined,
  placeholder: "Select…",
  required: false,
  successtext: "",
  truncateOptions: false,
  valid: false,
  value: undefined,
  variant: undefined,
  width: "full"
}