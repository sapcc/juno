import React from "react"
import * as RadixSelect from "@radix-ui/react-select"
import PropTypes from "prop-types"

const optionStyles = `
  jn-text-theme-default
  jn-flex
  jn-items-center
  jn-w-full
  jn-pt-[0.6875rem]
  jn-pb-[0.5rem]
  jn-px-[0.875rem]
  jn-cursor-pointer
  jn-select-none
  jn-bg-clip-padding
  jn-truncate
  jn-text-left
  jn-bg-theme-background-lvl-1
  focus:jn-outline-none
  focus:jn-ring-2
  focus:jn-ring-theme-focus
  hover:jn-bg-theme-background-lvl-3
  disabled:jn-cursor-not-allowed
`

/** An individual select option. Use as child of Select. */

export const SelectOption = React.forwardRef(
  ({ 
    children, 
    value, 
    label, 
    disabled,
    className, 
    ...props}, 
  forwardedRef) => {
    return (
      <RadixSelect.Item className={`juno-select-option ${optionStyles} ${className}`} ref={forwardedRef} value={value} disabled={disabled} {...props} >
        <RadixSelect.ItemText>
          {children || label || value }
        </RadixSelect.ItemText>
      </RadixSelect.Item>
    )
  }
)

SelectOption.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

SelectOption.defaultProps = {
  children: null,
  value: "",
  label: "",
  disabled: false,
  className: "",
}
