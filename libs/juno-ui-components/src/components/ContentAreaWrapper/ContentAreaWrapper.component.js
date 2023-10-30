import React from "react"
import PropTypes from "prop-types"

const containerStyles = `
  jn-relative
  jn-grow
  jn-flex
  jn-flex-col
  jn-overflow-hidden
`

/**
 * OBSOLETE: Will be deleted!
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
  children: PropTypes.node,
}

ContentAreaWrapper.defaultProps = {
  className: "",
  children: null,
}
