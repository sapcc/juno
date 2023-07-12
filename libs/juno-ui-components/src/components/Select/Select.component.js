import React, { useState, useEffect, useMemo, useId, createContext } from "react"
import * as RadixSelect from "@radix-ui/react-select"
import { Label } from "../Label/index"
import { Icon } from "../Icon/index.js"
import { Spinner } from "../Spinner/index.js"
import { usePortalRef } from "../PortalProvider/PortalProvider.component"
import PropTypes from "prop-types"
import { FormHint } from "../FormHint/"
import "./select.scss"

const wrapperStyles = `
  jn-relative
`

const labelStyles = `
  jn-pointer-events-none
  jn-top-2
  jn-left-4
`

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

const triggerLabelStyles = `
  jn-text-left
  jn-pt-[0.4rem]
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

const hintStyles = `
  jn-mt-0
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

export const SelectContext = createContext()


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
    label,
    labelClassName,
    loading,
    name,
    onOpenChange,
    onValueChange,
    open,
    placeholder, 
    portal,
    position,
    required,
    valid,
    value,
    variant,
    width,
    helptext,
    errortext,
    successtext,
    truncateOptions,
    ...props
  }, 
  forwardedRef ) => {
    
    const isNotEmptyString = (str) => {
      return !(typeof str === 'string' && str.trim().length === 0)
    }
    
    const uniqueId = () => (
      "juno-select-" + useId()
    )
    
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
    
    useEffect(() => {
      setIsLoading(loading)
    }, [loading])
    
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
    
    const theId = id || uniqueId()
    
    return (
      <SelectContext.Provider value={
        {
          truncateOptions: truncateOptions
        }
      }>
        <div>
          <span 
            className={
              `juno-select-wrapper 
              ${wrapperStyles}
              ${ width == "auto" ? "jn-inline-block" : "jn-block" }
              ${ width == "auto" ? "jn-w-auto" : "jn-w-full" }
              `
            } 
          >
            {
              label && isNotEmptyString(label) ?
                <Label 
                  text={label}
                  htmlFor={theId}
                  className={`${labelStyles}`}
                  disabled={disabled}
                  required={required}
                  floating
                  minimized
                />
              :
                ""
            }
            <RadixSelect.Root 
              defaultOpen={defaultOpen}
              disabled={disabled || hasError || isLoading} 
              name={name}
              onOpenChange={handleOpenChange}
              onValueChange={onValueChange}
              value={value}
              open={isOpen}
              defaultValue={defaultValue}
            >
              <RadixSelect.Trigger 
                id={theId}
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
                  <span className={`
                    ${labelClassName}
                    ${ label ? triggerLabelStyles : "" }
                  `}>
                    <RadixSelect.Value placeholder={placeholder} style={{ overflow: "hidden"}} /> 
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
          </span>
          { errortext && isNotEmptyString(errortext) ?
              <FormHint text={errortext} variant="error" className={`${hintStyles}`} />
            :
              ""
          }
          { successtext && isNotEmptyString(successtext) ?
              <FormHint text={successtext} variant="success" className={`${hintStyles}`} />
            :
              ""
          }
          { helptext && isNotEmptyString(helptext) ?
              <FormHint text={helptext} className={`${hintStyles}`} />
            :
              ""
           }
        </div>
      </SelectContext.Provider>
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
  /** Pass a label */
  label: PropTypes.string,
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
  /** Whether the Select is required */
  required: PropTypes.bool,
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
  /** A helptext to render to explain meaning and significance of the Select */
  helptext: PropTypes.node,
  /** A text to render when the Select was successfully validated */
  errortext: PropTypes.node,
  /** A text to render when the Select has an error or could not be validated */
  successtext: PropTypes.node,
  /** Whether the option labels should be truncated in case they are longer/wider than the available space in an option or not. Default is FALSE. */
  truncateOptions: PropTypes.bool,
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
  label: undefined,
  labelClassName: "",
  loading: false,
  name: "",
  onOpenChange: undefined,
  onValueChange: undefined,
  open: undefined,
  placeholder: "Select…",
  portal: true,
  position: "popper",
  required: false,
  valid: false,
  defaultValue: undefined,
  value: undefined,
  width: "full",
  variant: undefined,
  helptext: "",
  errortext: "",
  successtext: "",
  truncateOptions: false,
}
