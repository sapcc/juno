import React, { useState, useEffect } from "react"
import * as RadixSelect from "@radix-ui/react-select"
import { Icon } from "../Icon/index.js"
import { Spinner } from "../Spinner/index.js"
import PropTypes from "prop-types"

const triggerStyles = `
  jn-w-full
  jn-bg-theme-select
  jn-text-theme-high
  jn-appearance-none
  jn-text-base
  jn-inline-flex
  jn-items-center
  jn-px-4
  jn-h-[2.375rem]
  jn-rounded-3px
  jn-select-none
  focus:jn-outline-none
  focus:jn-ring-2
  focus:jn-ring-theme-focus
  disabled:jn-cursor-not-allowed
`

const justifyCenter = `
  jn-justify-center
`

const justifyBetween = `
  jn-justify-between
`

const triggerErrorStyles = `
  jn-border
  jn-border-theme-error
`

const triggerValidStyles = `
  jn-border
  jn-border-theme-success
`

const noPointerEvents = `
  jn-pointer-events-none
`

const reduceOpacity = `
  jn-opacity-50
`

const displayNone = `
  jn-display-none
`

export const Select = ({
  value,
  defaultValue,
  className,
  children,
  disabled,
  placeholder,
  ariaLabel,
  valid,
  invalid,
  loading,
  error,
  portal,
  onChange,
  onClick,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  
  useEffect(() => {
    setIsLoading(loading)
  }, [loading])
  
  useEffect(() => {
    setHasError(error)
  }, [error])
  
  useEffect(() => {
    setIsValid(valid)
  }, [valid])
  
  useEffect(() => {
    setIsInvalid(invalid)
  }, [invalid])
  
  const TriggerIcons = () => {
    if (isLoading) {
      return (<Spinner />)
    } else if (hasError){
      return (<Icon icon="errorOutline" color="jn-text-theme-error" />)
    } else if (isValid) {
      return (<><Icon icon="checkCircle" color="jn-text-theme-success" className={`${noPointerEvents}`}/><Icon icon="expandMore"/></>)
    } else if (isInvalid) {
      return (<><Icon icon="dangerous" color="jn-text-theme-error" className={`${noPointerEvents}`}/><Icon icon="expandMore"/></>)
    } else {
      return (<Icon icon="expandMore" />)
    }
  }
  
  return (
    <RadixSelect.Root disabled={ disabled || isLoading || hasError} {...props} >
      <RadixSelect.Trigger className={`juno-select-trigger ${triggerStyles} ${ hasError || isInvalid ? triggerErrorStyles : "" } ${ isValid ? triggerValidStyles : "" } ${ disabled ? reduceOpacity : "" } ${ isLoading || hasError ? justifyCenter : justifyBetween }`} aria-label={ariaLabel}>
        { isLoading || hasError ?
          ""
          :
          <RadixSelect.Value placeholder={placeholder} />
        }
        <RadixSelect.Icon>
          <TriggerIcons />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Content>
        <RadixSelect.ScrollUpButton>
          <Icon icon="expandLess"/>
        </RadixSelect.ScrollUpButton>
        Menu goes here
        <RadixSelect.ScrollUpButton>
          <Icon icon="expandMore"/>
        </RadixSelect.ScrollUpButton>
      </RadixSelect.Content>
    </RadixSelect.Root>
  )
}

Select.propTypes = {
  /** The current value of the Select, i.e. the value of the selected option. Using value will result in a controlled Select . */
  value: PropTypes.string,
  /** The current value of the Select, i.e. the value of the selected option. Using defaultValue will result in an uncontrolled Select. */
  defaultValue: PropTypes.string,
  /** Pass a custom className */
  className: PropTypes.string,
  /** Placeholder to show when no option is selected */
  placeholder: PropTypes.string,
  /** Whether the Select is currently busy loading options. Will display a Spinner Icon. */
  loading: PropTypes.bool,
  /** Whether the Select has an error, e.g. when loading option data failed. When the Select has been negatively validated, use invalid instead. */
  error: PropTypes.bool,
  /** Whether the Select has been positively validated */
  valid: PropTypes.bool,
  /** Whether the Select has been negatively validated */
  invalid: PropTypes.bool,
  /** Whether the Select is disabled */
  disabled: PropTypes.bool,
  /** The aria-label of the Select */
  ariaLabel: PropTypes.string,
}

Select.defaultProps = {
  value: "",
  defaultValue: "",
  className: "",
  placeholder: "Select…",
  loading: false,
  error: false,
  valid: false,
  invalid: false,
  disabled: false,
  ariaLabel: "",
}


