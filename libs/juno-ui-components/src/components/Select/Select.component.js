import React, { useState, useEffect } from "react"
import * as RadixSelect from "@radix-ui/react-select"
import { Icon } from "../Icon/index.js"
import { Spinner } from "../Spinner/index.js"
import PropTypes from "prop-types"

/** A Select component for selecting a single item. Can be used controlled or uncontrolled. */
export const Select = React.forwardRef(
  ({
    children,
    placeholder, 
    position,
    ...props
  }, 
  forwardedRef ) => {
    return (
      <RadixSelect.Root {...props}>
        <RadixSelect.Trigger ref={forwardedRef}>
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
  children: PropTypes.node,
  placeholder: PropTypes.string,
  position: PropTypes.oneOf(["popper", "align-items"])
}

Select.defaultProps = {
  children: null,
  placeholder: "Select…",
  position: "popper",
}





