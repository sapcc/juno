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
  jn-w-full
  focus:jn-outline-none
  focus:jn-ring-2
  focus:jn-ring-theme-focus
`


/** A Select component for selecting a single item. Can be used controlled or uncontrolled. 
    Used in Pagination, Filters, SelectRow.  
    TODO: menu theming, Many options / align-items mode, tests
*/
export const Select = React.forwardRef(
  ({
    ariaLabel,
    children,
    className,
    defaultOpen,
    disabled,
    name,
    onOpenChange,
    onValueChange,
    open,
    placeholder, 
    position,
    value,
    ...props
  }, 
  forwardedRef ) => {
    return (
      <RadixSelect.Root 
        defaultOpen={defaultOpen}
        disabled={disabled} 
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
            ${ disabled ? "juno-select-trigger-disabled jn-opacity-50 jn-cursor-not-allowed" : "" }
            ${ className }
          `}
          ref={forwardedRef}
        >
          <RadixSelect.Value placeholder={placeholder}/>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content position={position} sideOffset={2}>
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
  /** The value of the Select (controlled mode) */
  value: PropTypes.string,
}

Select.defaultProps = {
  ariaLabel: "",
  className: "",
  children: null,
  defaultOpen: undefined,
  disabled: false,
  name: "",
  onOpenChange: undefined,
  onValueChange: undefined,
  open: undefined,
  placeholder: "Select…",
  position: "popper",
  value: undefined,
}





