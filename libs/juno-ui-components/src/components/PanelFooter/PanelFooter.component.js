import React from "react"
import PropTypes from "prop-types"

const panelFooterClasses = `
  border-t
  border-t-theme-panel
  px-8
  py-4
  flex
  items-center
  justify-end
  gap-3
  w-full
`

/**
 * The panel footer component. You can drop buttons in here and they will automatically be aligned correctly to the right.
 */
export const PanelFooter = ({ className, children, ...props }) => {
  return (
    <div
      className={`juno-panel-footer ${panelFooterClasses}  ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

PanelFooter.propTypes = {
  /** Add custom class name */
  className: PropTypes.string,
}

PanelFooter.defaultProps = {
  className: "",
}
