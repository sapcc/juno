import React from "react"
import PropTypes from "prop-types"

const panelBodyClasses = `
  overflow-auto
`

const bodyContentClasses = `
  px-8
  py-4
`

/**
 * The panel body component. The main (form) content for the panel goes here.
 */
export const PanelBody = ({ className, footer, children, ...props }) => {
  return (
    <div 
      className={`juno-panel-body ${panelBodyClasses}  ${className}`}
      {...props}  
    >
      <div className={`juno-panel-body-content ${bodyContentClasses}`}>
        {children}
      </div>
      
      {footer}
    </div>
  )
}

PanelBody.propTypes = {
  /** Add custom class name */
  className: PropTypes.string,
  /** optional footer component */
  footer: PropTypes.element
}

PanelBody.defaultProps = {
  className: "",
  footer: undefined
}
