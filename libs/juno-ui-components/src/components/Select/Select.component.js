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
`

const triggerErrorStyles = `
  jn-border
  jn-border-theme-error
`

const triggerValidStyles = `
  jn-border
  jn-border-theme-success
`

const contentStyles = `
  jn-flex
  jn-flex-col
  jn-rounded
  jn-bg-theme-background-lvl-1
  jn-z-50
  jn-w-[var(--radix-select-trigger-width)]
`

/** A Select component that can be used controlled or uncontrolled. Based on Radix Select. */
export const Select = React.forwardRef(
  ({ 
    children,
    placeholder,
    loading,
    error,
    valid,
    invalid,
    disabled,
    name,
    open,
    onOpenChange,
    defaultOpen,
    value,
    defaultValue,
    onValueChange,
    position,
    ...props
    }, 
  forwardedRef) => {
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
        return (<Spinner className="jn-mr-0"/>)
      } else if (hasError){
        return (<Icon icon="errorOutline" color="jn-text-theme-error" />)
      } else if (isValid) {
        return (<><Icon icon="checkCircle" color="jn-text-theme-success" className="jn-pointer-events-none"/><Icon icon="expandMore"/></>)
      } else if (isInvalid) {
        return (<><Icon icon="dangerous" color="jn-text-theme-error" className="jn-pointer-events-none"/><Icon icon="expandMore"/></>)
      } else {
        return (<Icon icon="expandMore" />)
      }
    }
    
    return (
      <RadixSelect.Root
        disabled={disabled}
        open={open}
        defaultOpen={defaultOpen}
        value={value}
        defaultValue={defaultValue}
        onOpenChange={onOpenChange}
        onValueChange={onValueChange}
        {...props}
      >
        <RadixSelect.Trigger 
          ref={forwardedRef}
          className={
            `
              juno-select-trigger 
              ${triggerStyles}
              ${ hasError || isInvalid ? triggerErrorStyles : "" } 
              ${ isValid ? triggerValidStyles : "" } 
              ${ disabled ? "jn-opacity-50 jn-cursor-not-allowed" : "" } 
              ${ isLoading || hasError ? "jn-justify-center" : "jn-justify-between" }
            `
          } 
        >
          {
            isLoading || hasError ?
              ""
            :
              <RadixSelect.Value placeholder={placeholder} />
          }
          <RadixSelect.Icon>
            <TriggerIcons />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className={`juno-select-content ${contentStyles}`} position={position} sideOffset={2}>
            <RadixSelect.ScrollUpButton>
              <Icon icon="expandLess"/>
            </RadixSelect.ScrollUpButton>
            <RadixSelect.Viewport>
              { children }
            </RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton>
              <Icon icon="expandMore"/>
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    )
  }
)


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
  /** The name of the Select */
  name: PropTypes.string,
  /** The aria-label of the Select */
  ariaLabel: PropTypes.string,
  /** Whether the Select is open (triggers Controlled mode, needs to be used in conjunction with onOpenChange) */
  open: PropTypes.bool,
  /** Handler to execute when open state changes (controlled mode) */
  onOpenChange: PropTypes.func,
  /** Whether the Select is open (Uncontrolled) */
  defaultOpen: PropTypes.bool,
  /** Change position mode to popper. Default is item-aligned */
  position: PropTypes.oneOf(["popper", "item-aligned"]),
  /** A handler to execute when the selected value changes. Mandatory when using as a controlled component. */
  onValueChange: PropTypes.func,
  /** A handler to execute when the selects open state changes. */
  onOpenChange: PropTypes.func,
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
  name: "",
  ariaLabel: "",
  open: false,
  onOpenChange: undefined,
  defaultOpen: false,
  position: "item-aligned",
  onValueChange: undefined,
  onOpenChange: undefined,
}


