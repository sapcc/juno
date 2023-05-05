import React, { useState, useEffect } from "react"
import * as RadixSelect from "@radix-ui/react-select"
import { Icon } from "../Icon/index.js"
import { Spinner } from "../Spinner/index.js"
import { usePortalRef } from "../PortalProvider/PortalProvider.component"
import PropTypes from "prop-types"
import "./select.scss"

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
  jn-max-h-[var(--radix-select-content-available-height)]
  jn-z-[9999]
`

const scrollButtonStyles = `
  jn-text-center
  jn-py-1
`

/** Wrap children in a Portal if portal option is set to true  */
const PortalWrapper = ({ withPortal, children }) => {
  
  if (withPortal) {
    const portalContainer = usePortalRef()
    return (
      <RadixSelect.Portal container={portalContainer}>
        {children}
      </RadixSelect.Portal>
    )
  } else {
    return (
      children
    )
  }
  
}


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
    defaultValue,
    disabled,
    error,
    id,
    invalid,
    labelClassName,
    loading,
    name,
    onOpenChange,
    onValueChange,
    open,
    placeholder, 
    portal,
    position,
    valid,
    value,
    variant,
    width,
    ...props
  }, 
  forwardedRef ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [isInvalid, setIsInvalid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isValid, setIsValid] = useState(false)
    
    useEffect(() => {
      setIsOpen(open)
    }, [open])
    
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
    
    const handleOpenChange = (event) => {
      // change only when open state is uncontrolled:
      if ( open === undefined ) {
        setIsOpen(!isOpen)
      }
      onOpenChange && onOpenChange(event)
    }
    
    const theVariant = variant || "default"
    
    const TriggerIcons = () => {
      if (isLoading) {
        return (<Spinner className="jn-mr-0"/>)
      } else if (hasError){
        return (<Icon icon="errorOutline" color="jn-text-theme-error" />)
      } else if (isValid) {
        return (<>
          <Icon icon="checkCircle" color="jn-text-theme-success" className="jn-pointer-events-none"/>
          { isOpen ? <Icon icon="expandLess" /> : <Icon icon="expandMore" /> }
        </>)
      } else if (isInvalid) {
        return (<>
          <Icon icon="dangerous" color="jn-text-theme-error" className="jn-pointer-events-none"/>
          { isOpen ? <Icon icon="expandLess" /> : <Icon icon="expandMore" /> }
        </>)
      } else {
        return (isOpen ? <Icon icon="expandLess" /> : <Icon icon="expandMore" />)
      }
    }
    
    return (
      <RadixSelect.Root 
        defaultOpen={defaultOpen}
        disabled={disabled || hasError || isLoading} 
        name={name}
        onOpenChange={handleOpenChange}
        onValueChange={onValueChange}
        value={value}
        open={open}
        defaultValue={defaultValue}
      >
        <RadixSelect.Trigger 
          id={id}
          aria-label={ariaLabel}
          className={`
            juno-select
            juno-select-trigger
            ${ triggerStyles }
            ${ width == "auto" ? "jn-w-auto" : "jn-w-full" }
            ${ hasError || isInvalid || isValid || isLoading ? "" : "juno-select-" + theVariant}
            ${ hasError || isInvalid ? triggerErrorStyles : "" }
            ${ hasError ? "juno-select-error jn-cursor-not-allowed" : "" }
            ${ isValid ? "juno-select-valid " + triggerValidStyles : "" } 
            ${ disabled ? "juno-select-disabled jn-opacity-50 jn-cursor-not-allowed" : "" }
            ${ isLoading || hasError ? "jn-justify-center" : "jn-justify-between" }
            ${ isLoading ? "juno-select-loading jn-cursor-not-allowed" : "" }
            ${ isInvalid ? "juno-select-invalid" : "" }
            ${ className }
          `}
          ref={forwardedRef}
          {...props}
        >
          { 
            isLoading || hasError ?
              ""
            :
            <span className={`${labelClassName}`}>
              <RadixSelect.Value placeholder={placeholder}/> 
            </span>
          }
          <RadixSelect.Icon className="jn-inline-flex">
            <TriggerIcons />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <PortalWrapper withPortal={portal}>
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
        </PortalWrapper>
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
  /** Pass an id to the Select */
  id: PropTypes.string,
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
  /** Whether the select options should be rendered in a portal. Default: true. If using the portal you must also wrap your app in an AppShellProvider (recommended) or PortalProvider! */
  portal: PropTypes.bool,
  /** The positioning mode of the Select menu. Defaults to 'popper' (below the trigger).  */
  position: PropTypes.oneOf(["popper", "align-items"]),
  /** Whether the Select has been positively validated */
  valid: PropTypes.bool,
  /** The default value of the uncontrolled Select */
  defaultValue: PropTypes.string,
  /** The value of the Select (controlled mode) */
  value: PropTypes.string,
  /** The semantic variant of the Select */
  variant: PropTypes.oneOf(["", "primary", "primary-danger", "default", "subdued"]),
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
  id: "",
  invalid: false,
  labelClassName: "",
  loading: false,
  name: "",
  onOpenChange: undefined,
  onValueChange: undefined,
  open: undefined,
  placeholder: "Select…",
  portal: true,
  position: "popper",
  valid: false,
  defaultValue: undefined,
  value: undefined,
  width: "full",
  variant: undefined,
}
