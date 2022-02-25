import React from "react"
import PropTypes from "prop-types"

const containerStyles = `
  relative
  grow
  flex
  flex-col
  overflow-hidden
`

/**
 * This is a wrapper for content area and toolbar.
 */
export const ContentAreaWrapper = ({ className, children, ...props }) => {
  return (
    <div
      className={`juno-content-area-wrapper ${containerStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

ContentAreaWrapper.propTypes = {
  /** Add custom class name */
  className: PropTypes.string,
}

ContentAreaWrapper.defaultProps = {
  className: "",
}
