import React from "react"
import * as RadixSelect from "@radix-ui/react-select"
import PropTypes from "prop-types"

const labelStyles = `
  jn-text-xs
  jn-font-bold
  jn-py-1
  jn-px-3.5
`

/** A group of SelectOptions, can take an optional label. To render a visual border between SelectOptions or SelectGroups, use SelectDivider. */
export const SelectOptionGroup = React.forwardRef(
  ({children, label, className, ...props}, forwardedRef) => {
    return (
      <RadixSelect.Group className={`juno-select-option-group ${className}`} ref={forwardedRef} {...props}>
        { label ? 
            <RadixSelect.Label className={`juno-select-group-label ${labelStyles}`}>{label}</RadixSelect.Label>
          :
            ""
        }
        { children }
      </RadixSelect.Group>
    )
  }
)

SelectOptionGroup.propTypes = {
  /** The label of theSelectGroup */
  label: PropTypes.string,
  /** The child SelectOption elements to render in the group */
  children: PropTypes.node,
  /** Pass a custom className */
  className: PropTypes.string,
}

SelectOptionGroup.defaultProps = {
  children: null,
  label: "",
  className: "",
}