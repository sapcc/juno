import React from "react"
import * as RadixSelect from "@radix-ui/react-select"
import PropTypes from "prop-types"

const labelStyles = `
  jn-text-xs
  jn-font-bold
  jn-py-1
  jn-px-3.5
`

export const SelectGroup = React.forwardRef(
  ({children, label, ...props}, forwardedRef) => {
    return (
      <RadixSelect.Group>
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

SelectGroup.propTypes = {
  /** The label of theSelectGroup */
  label: PropTypes.string,
  /** The child SelectOption elements to render in the group */
  children: PropTypes.node,
}

SelectGroup.defaultProps = {
  children: null,
  label: "",
}