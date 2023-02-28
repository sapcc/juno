import React, { useState, useEffect } from "react"
import * as RadixSelect from "@radix-ui/react-select"
import { Icon } from "../Icon/index.js"
import { Spinner } from "../Spinner/index.js"
import PropTypes from "prop-types"

const triggerStyles = `
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

const triggerErrorStyles = `
  jn-border
  jn-border-theme-error
`

const triggerValidStyles = `
  jn-border
  jn-border-theme-success
`

const contentStyles = `
  jn-rounded
  jn-bg-theme-background-lvl-1
  jn-w-[var(--radix-select-trigger-width)]
  jn-max-h-[var(radix-select-content-available-height)]
`

const scrollButtonStyles = `
  jn-text-center
  jn-py-1
`


/** A Select component for selecting a single item. Can be used controlled or uncontrolled. 
    Used in Pagination, Filters, SelectRow.  
    TODO: trigger active state styles (invert chevron?), menu theming, z-index, iframe / shadow dom, menu scrolling in popper mode -> make align-items default?, tests
*/
export const Select = React.forwardRef(
  ({
    ariaLabel,
    children,
    className,
    defaultOpen,
    disabled,
    error,
    invalid,
    labelClassName,
    loading,
    name,
    onOpenChange,
    onValueChange,
    open,
    placeholder, 
    position,
    valid,
    value,
    width,
    ...props
  }, 
  forwardedRef ) => {
    const [hasError, setHasError] = useState(false)
    const [isInvalid, setIsInvalid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isValid, setIsValid] = useState(false)
    
    useEffect(() => {
      setHasError(error)
    }, [error])
    
    useEffect(() => {
      setIsInvalid(invalid)
    }, [invalid])
    
    useEffect(() => {
      setIsLoading(loading)
    }, [loading])
    
    useEffect(() => {
      setIsValid(valid)
    }, [valid])
    
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
        defaultOpen={defaultOpen}
        disabled={disabled || hasError || isLoading} 
        name={name}
        onOpenChange={onOpenChange}
        onValueChange={onValueChange}
        value={value}
        open={open}
        {...props}
      >
        <RadixSelect.Trigger 
          aria-label={ariaLabel}
          className={`
            juno-select-trigger
            ${ triggerStyles }
            ${ width == "auto" ? "jn-w-auto" : "jn-w-full" }
            ${ hasError || isInvalid ? triggerErrorStyles : "" }
            ${ hasError ? "juno-select-trigger-error jn-cursor-not-allowed" : "" }
            ${ isValid ? "juno-select-trigger-valid " + triggerValidStyles : "" } 
            ${ disabled ? "juno-select-trigger-disabled jn-opacity-50 jn-cursor-not-allowed" : "" }
            ${ isLoading || hasError ? "jn-justify-center" : "jn-justify-between" }
            ${ isLoading ? "juno-select-trigger-loading jn-cursor-not-allowed" : "" }
            ${ isInvalid ? "juno-select-trigger-invalid" : "" }
            ${ className }
          `}
          ref={forwardedRef}
        >
          { 
            isLoading || hasError ?
              ""
            :
            <span className={`${labelClassName}`}>
              <RadixSelect.Value placeholder={placeholder}/> 
            </span>
          }
          <RadixSelect.Icon>
            <TriggerIcons />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className={`juno-select-content ${contentStyles}`} position={position} sideOffset={2}>
            <RadixSelect.ScrollUpButton className={`${scrollButtonStyles}`}>
              <Icon icon="expandLess"/>
            </RadixSelect.ScrollUpButton>
            <RadixSelect.Viewport>
              { children }
            </RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton className={`${scrollButtonStyles}`}>
              <Icon icon="expandMore"/>
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    )
  }
)

Select.propTypes = {
  /** Pass an aria-label to the Select trigger */
  ariaLabel: PropTypes.string,
  /** Pass a custom className */
  className: PropTypes.string,
  /** The children to render in the Menu. Should be SelectOption, SelectGroup, or SelectDivider. */
  children: PropTypes.node,
  /** Whether the Select is open. Triggers uncontrolled mode. For controlled mode use `open` instead */
  defaultOpen: PropTypes.bool,
  /** Disable the Select */
  disabled: PropTypes.bool,
  /** Whether the Select has an error, e.g. when loading necessary option data failed. When the Select has been negatively validated, use `invalid` instead. */
  error: PropTypes.bool,
  /** Whether the Select has been negatively validated */
  invalid: PropTypes.bool,
  /** Pass custom classNames to the Select label and placeholder */
  labelClassName: PropTypes.string,
  /** Whether the Select is currently busy loading options. Will display a Spinner Icon. */
  loading: PropTypes.bool,
  /** The name of the Select. When a form is submitted, this will be posted as name:value. */
  name: PropTypes.string,
  /** Handler to be executed when the open state a controlled Select changes */
  onOpenChange: PropTypes.func,
  /** Handler to be executed when the selected value changes. */
  onValueChange: PropTypes.func,
  /** Whether the Select is open. Triggers controlled mode, to be used with onOpenChange. */
  open: PropTypes.bool,
  /** Placeholder to display when no option is selected */
  placeholder: PropTypes.string,
  /** The positioning mode of the Select menu. Defaults to 'popper' (below the trigger).  */
  position: PropTypes.oneOf(["popper", "align-items"]),
  /** Whether the Select has been positively validated */
  valid: PropTypes.bool,
  /** The value of the Select (controlled mode) */
  value: PropTypes.string,
  /** The width of the select. Either 'full' (default) or 'auto'. */
  width: PropTypes.oneOf(["full", "auto"]),
}

Select.defaultProps = {
  ariaLabel: "",
  className: "",
  children: null,
  defaultOpen: undefined,
  disabled: false,
  error: false,
  invalid: false,
  labelClassName: "",
  loading: false,
  name: "",
  onOpenChange: undefined,
  onValueChange: undefined,
  open: undefined,
  placeholder: "Select…",
  position: "popper",
  valid: false,
  value: undefined,
  width: "full",
}
