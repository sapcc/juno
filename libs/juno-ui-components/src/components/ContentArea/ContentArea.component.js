import React from "react"
import PropTypes from "prop-types"

const containerStyles = `
  jn-bg-theme-content-area-bg
  jn-relative
  jn-grow
  jn-overflow-hidden
`



/**
 * Only needed if you want to build your app's scaffold manually. In most cases it is better to use the AppShell component instead.
 * This is the area in which the actual content of each page should be injected. 
 */
export const ContentArea = ({ className, children, ...props }) => {

  return (
    <div
      className={`juno-content-area ${containerStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

ContentArea.propTypes = {
  /** Add custom class name */
  className: PropTypes.string,
  children: PropTypes.node,
}

ContentArea.defaultProps = {
  className: "",
  children: null,
}
