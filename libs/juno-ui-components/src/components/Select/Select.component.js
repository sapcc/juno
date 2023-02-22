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
    disabled,
    placeholder, 
    position,
    ...props
  }, 
  forwardedRef ) => {
    return (
      <RadixSelect.Root 
        disabled={disabled} 
        {...props}
      >
        <RadixSelect.Trigger 
          aria-label={ariaLabel}
          className={`
            juno-select-trigger
            ${ disabled ? "jn-opacity-50 jn-cursor-not-allowed" : "" }
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
  ariaLabel: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  position: PropTypes.oneOf(["popper", "align-items"])
}

Select.defaultProps = {
  ariaLabel: "",
  children: null,
  disabled: false,
  placeholder: "Select…",
  position: "popper",
}





