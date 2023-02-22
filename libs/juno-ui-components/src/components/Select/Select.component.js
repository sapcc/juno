import React, { useState, useEffect } from "react"
import * as RadixSelect from "@radix-ui/react-select"
import { Icon } from "../Icon/index.js"
import { Spinner } from "../Spinner/index.js"
import PropTypes from "prop-types"

/** A Select component for selecting a single item. Can be used controlled or uncontrolled. 
    Used in Pagination, Filters, SelectRow.
    Based on Radix Select.    
*/
export const Select = React.forwardRef(
  ({
    ariaLabel,
    children,
    className,
    disabled,
    name,
    placeholder, 
    position,
    ...props
  }, 
  forwardedRef ) => {
    return (
      <RadixSelect.Root 
        disabled={disabled} 
        name={name}
        {...props}
      >
        <RadixSelect.Trigger 
          aria-label={ariaLabel}
          className={`
            juno-select-trigger
            ${ disabled ? "juno-select-trigger-disabled jn-opacity-50 jn-cursor-not-allowed" : "" }
            ${ className }
          `}
          ref={forwardedRef}
        >
          <RadixSelect.Value placeholder={placeholder}/>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content position={position}>
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
  /** Disbale the Select */
  disabled: PropTypes.bool,
  /** The name of the Select. When a form is submitted, this will be posted as name:value. */
  name: PropTypes.string,
  /** Placeholder to display when no option is selected */
  placeholder: PropTypes.string,
  /** The positioning mode of the Select menu. Defaults to 'popper' (below the trigger).  */
  position: PropTypes.oneOf(["popper", "align-items"])
}

Select.defaultProps = {
  ariaLabel: "",
  className: "",
  children: null,
  disabled: false,
  name: "",
  placeholder: "Select…",
  position: "popper",
}





