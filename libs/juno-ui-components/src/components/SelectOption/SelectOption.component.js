import React, { useContext } from "react"
import * as RadixSelect from "@radix-ui/react-select"
import PropTypes from "prop-types"
import {SelectContext} from "../Select/Select.component.js"
import "./selectOption.scss"

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
  jn-text-left
  jn-bg-theme-background-lvl-1
  focus:jn-outline-none
  focus:jn-ring-2
  focus:jn-ring-inset
  focus:jn-ring-theme-focus
  hover:jn-bg-theme-background-lvl-3
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
    
    const selectContext = useContext(SelectContext)
    const {
      truncateOptions: truncateOptions,
    } = selectContext || {}
    
    console.log(truncateOptions.toString())
    
    return (
      <RadixSelect.Item className={`juno-select-option ${optionStyles} ${disabled ? "jn-opacity-50 jn-cursor-not-allowed" : ""} ${ truncateOptions === true ? "juno-select-option-truncate" : "" } ${className}`} ref={forwardedRef} value={value} disabled={disabled} {...props} >
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
