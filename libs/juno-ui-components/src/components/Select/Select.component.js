import React, { createContext, useEffect, useId, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Listbox } from "@headlessui/react"
import { Label } from "../Label/Label.component"
import { Icon } from "../Icon/Icon.component"
import { Spinner } from "../Spinner/Spinner.component"
import { FormHint } from "../FormHint/FormHint.component"
import { Float } from "@headlessui-float/react"
import { offset, shift, size } from '@floating-ui/react-dom'

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
  jn-w-full
  jn-overflow-y-auto
`

const truncateStyles = `
  jn-block
  jn-h-6
  jn-overflow-hidden
  jn-text-ellipsis
  jn-whitespace-nowrap
`

export const SelectContext = createContext()

/** 
  A Select component to allow selecting a single item (multi-select TBD).
  Pass a `defaultValue` to render as an uncontrolled component that tracks its open state etc internally.
  Also TBD: semantic variants.
*/
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
  onValueChange,
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

  const recursivelyFindFirstChildrenArray = (children) => {
    if (!children) { return [] }

    if (Array.isArray(children)) {
      return children
    } else {
      return recursivelyFindFirstChildrenArray(children.props?.children)
    }
  }

  // iterate over children to get option values and labels by reading the value and the label prop of each child and saving them in a map
  const buildOptionValuesAndLabelMap = (options) => {
    const optionMap = new Map()
    if (!options) { return optionMap }

    // recursively find the first children that is an array (in case people wrap their options in a div or Fragment something)
    const selectOptions = recursivelyFindFirstChildrenArray(options) //.filter((option) => React.isValidElement(option) && option.type?.name === "SelectOption")

    if (selectOptions) {
      // iterate over the children and if they are of type "SelectOption" save the value and label props in a map
      selectOptions.map((option) => {
        if (option && React.isValidElement(option) && option.type?.name === "SelectOption") {
          optionMap.set(option.props?.value || option.props?.children, {
            val: option.props?.value,
            label: option.props?.label,
            children: option.props?.children
          })
        } else {
          console.warn("Select: at least one of the options is not a valid SelectOption component:")
          console.info(option)
        }
      })
    }
    return optionMap
  }
  
  const theId = id || uniqueId()
  const helptextId = "juno-select-helptext-" + useId()
  
  const [optionValuesAndLabels, setOptionValuesAndLabels] = useState(new Map())
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
    setOptionValuesAndLabels(buildOptionValuesAndLabelMap(children))
  }, [children])
  
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
    onChange && onChange(value || "")
    onValueChange && onValueChange(value || "")
  }
  
  // Headless-UI-Float Middleware
  const middleware = [
    offset(4),
    shift(),
    size({
      apply({availableWidth, availableHeight, elements}) {
        Object.assign(elements.floating.style, {
          maxWidth: `${availableWidth}px`,
          maxHeight: `${availableHeight}px`,
          overflowY: "auto"
        })
      }
    })
  ]
  
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
          value={ value }
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
          
          <Float 
            adaptiveWidth
            middleware={middleware}
          >
          
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
              {({ open, value }) => (
                
                (!hasError && !isLoading) ?
                  <>
                    <span className={`${truncateStyles}`}>
                      <>
                        { optionValuesAndLabels.get(value)?.children || optionValuesAndLabels.get(value)?.label || optionValuesAndLabels.get(value)?.val || placeholder }
                      </>
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
          
          </Float>
          
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
  /** Pass an aria-label to the Select toggle button */
  ariaLabel: PropTypes.string,
  /** The children to render as options. Use the SelectOption component, and SelectDivider if needed. */
  children: PropTypes.node,
  /** Pass a custom className to the Select toggle button */
  className: PropTypes.string,
  /** Pass a defaultValue to use as an uncontrolled component that handles its state internally */
  defaultValue: PropTypes.string,
  /** Whether the Select is disabled */
  disabled: PropTypes.bool,
  /** Whether the Select has an error, e.g. when loading options. When validated negatively, use `invalid` instead. */
  error: PropTypes.bool,
  /** A small message rendered in red text below the Select toggle. */
  errortext: PropTypes.node,
  /** A small, neutral text rendered below the Select toggle to explain meaning and significance of the Select element */
  helptext: PropTypes.node,
  /** Pass an id to the Select toggle */
  id: PropTypes.string,
  /** Whether the Select has been validated unsuccessfully / negatively */
  invalid: PropTypes.bool,
  /** Pass a label to render in the Select toggle button */
  label: PropTypes.string,
  /** Whether the Select is busy loading options. Will show a Spinner in the Select toggle. */
  loading: PropTypes.bool,
  /** Pass a name attribute to the Select to be transmitted when used in a form. */
  name: PropTypes.string,
  /** Handler to be executed when the selected value changes */
  onChange: PropTypes.func,
  /** LEGACY: Handler to be executed when the Select value changes. Here for backwards compatibility with apps based on older versions of Select. Use onChange instead. */
  onValueChange: PropTypes.func,
  /** A placeholder to render when no value has been selected. Default is "Select…". */
  placeholder: PropTypes.string,
  /** Whether a selection is required. Will show a small required marker next to the label. If no label is used, no marker will be visible. */
  required: PropTypes.bool,
  /** A note to render below the Select toggle in case the selected value has been positively validated. Will set the visible state of the Select toggle to `valid`. */
  successtext: PropTypes.node,
  /** Whether long texts in options will be truncated with "…" or not. Default is false. The Select toggle label will always be truncated. */
  truncateOptions: PropTypes.bool,
  /** Whether the Select was positively validated. Will show a green checkmark icon inside the Select toggle. */
  valid: PropTypes.bool,
  /** The currently (pre-)selected value of the Select. Will trigger controlled mode. */
  value: PropTypes.string,
  /** TBD: The semantic variant of the Select toggle button. Not implemented yet. */
  variant: PropTypes.oneOf(["", "primary", "primary-danger", "default", "subdued"]),
  /** Whether the Select toggle should consume the available width of its parent container (default), or render its "natural" width depending on the content and the currently selected value or state. */
  width: PropTypes.oneOf(["full", "auto"])
}

Select.defaultProps = {
  ariaLabel: "",
  children: null,
  className: "",
  defaultValue: undefined,
  disabled: false,
  error: false,
  errortext: "",
  helptext: "",
  id: "",
  invalid: false,
  label: undefined,
  loading: false,
  name: undefined,
  onChange: undefined,
  onValueChange: undefined,
  placeholder: "Select…",
  required: false,
  successtext: "",
  truncateOptions: false,
  valid: false,
  value: undefined,
  variant: undefined,
  width: "full"
}