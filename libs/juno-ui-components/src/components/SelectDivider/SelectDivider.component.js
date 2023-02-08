import React from "react"
import * as RadixSelect from "@radix-ui/react-select"
import PropTypes from "prop-types"

const dividerStyles = `
  jn-h-px 
  jn-w-full
  jn-bg-theme-background-lvl-3
`

export const SelectDivider = React.forwardRef(
  ({className, ...props}, forwardedRef) => {
    return (
      <div className={`juno-select-divider ${dividerStyles}`}></div>
    )
  }
)

SelectDivider.propTypes = {
  /** add a custom className */
  className: PropTypes.string,
}

SelectDivider.defaultProps = {
  className: "",
}