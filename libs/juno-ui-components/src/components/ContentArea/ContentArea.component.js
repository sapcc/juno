import React from "react"
import PropTypes from "prop-types"

const containerStyles = (toolbarVisible) => {
  
  return (
    `
      bg-theme-content-area-bg
      relative
      grow
      p-6
      mt-16
      rounded-l
      ${toolbarVisible && "pt-24"}
    `
  )
}



/**
 * This is the area in which the actual content of each page should be injected.
 */
export const ContentArea = ({ heading, className, children, ...props }) => {

  return (
    <div
      className={`juno-content-area ${containerStyles(true)} ${className}`}
      {...props}
    >
      {(heading.length > 0) && 
        <div className="juno-content-heading absolute left-0 -top-9 text-theme-default text-xl font-bold">
          {heading}
        </div>
      }
      {children}
    </div>
  )
}

ContentArea.propTypes = {
  /** Content heading */
  heading: PropTypes.string,
  /** Add custom class name */
  className: PropTypes.string,
}

ContentArea.defaultProps = {
  heading: "",
  className: "",
}
