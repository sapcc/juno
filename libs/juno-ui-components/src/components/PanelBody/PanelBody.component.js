import React from "react"
import PropTypes from "prop-types"

const panelBodyClasses = `
  px-8
  py-4
  overflow-auto
`

/**
 * The panel body component. The main (form) content for the panel goes here.
 */
export const PanelBody = ({ className, children, ...props }) => {
  return (
    <div 
      className={`juno-panel-body ${panelBodyClasses}  ${className}`}
      {...props}  
    >
      {children}
    </div>
  )
}

PanelBody.propTypes = {
  /** Add custom class name */
  className: PropTypes.string,
}

PanelBody.defaultProps = {
  className: "",
}
