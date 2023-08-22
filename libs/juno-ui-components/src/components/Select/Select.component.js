import React, { Fragment, createContext, useEffect, useId, useState } from "react"
import PropTypes from "prop-types"
import { Listbox } from "@headlessui/react"
import { SelectOption } from "../SelectOption/"
import { Label } from "../Label/"
import { Icon } from "../Icon/"
import { Spinner } from "../Spinner/"

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
  children,
  defaultValue,
  disabled,
  error,
  errortext,
  helptext,
  label,
  loading,
  name,
  onChange,
  placeholder,
  required,
  successtext,
  truncateOptions,
  value,
  variant,
  width,
  ...props
}) => {
  
  const isNotEmptyString = (str) => {
    return !(typeof str === 'string' && str.trim().length === 0)
  }

  
  const [selectedValue, setSelectedValue] = useState("")
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    setSelectedValue(value)
  }, [value])
  
  useEffect(() => {
    setHasError(error)
  }, [error])
  
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
            as="button" 
            className={`
              juno-select-toggle
              ${ width == "auto" ? "jn-w-auto" : "jn-w-full" }
              ${ toggleStyles }
              ${ label && isNotEmptyString(label) ? "jn-pt-[0.4rem]" : "" }
              ${ disabled ? "juno-select-disabled jn-opacity-50 jn-cursor-not-allowed" : "" }
              ${ isLoading ? "juno-combobox-loading jn-cursor-not-allowed" : "" }
              ${ hasError ? "juno-combobox-error jn-cursor-not-allowed" : "" }
            `}
          >
            
            { !hasError && !isLoading ?
                <>
                  <span className={`${ truncateOptions ? truncateStyles : ""}`}>{ selectedValue || placeholder }</span>
                  <span>
                    <Icon icon={ open ? "expandLess" : "expandMore" } />
                  </span>
                </>
              :
                <span className={`${centeredIconStyles}`} >
                  {
                    hasError ?
                     <Icon icon="errorOutline" color="jn-text-theme-error" className={"jn-cursor-not-allowed"} />
                    :
                      isLoading ?
                        <Spinner className={"jn-cursor-not-allowed"} />
                      :
                        ""
                  }
                </span>
            }
            
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
  
      </div>
    </SelectContext.Provider>
  )
}

Select.propTypes = {
  children: PropTypes.node,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  loading: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  truncateOptions: PropTypes.bool,
  value: PropTypes.string,
  variant: PropTypes.oneOf(["", "primary", "primary-danger", "default", "subdued"]),
  width: PropTypes.oneOf(["full", "auto"])
}

Select.defaultProps = {
  children: null,
  defaultValue: undefined,
  disabled: false,
  label: undefined,
  loading: false,
  name: undefined,
  onChange: undefined,
  placeholder: "Select…",
  truncateOptions: false,
  required: false,
  value: undefined,
  variant: undefined,
  width: "full"
}