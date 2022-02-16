import React from "react"
import PropTypes from "prop-types"

const containerStyles = `
  bg-theme-content-area-bg
  relative
  grow
  p-6
`



/**
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
}

ContentArea.defaultProps = {
  className: "",
}
