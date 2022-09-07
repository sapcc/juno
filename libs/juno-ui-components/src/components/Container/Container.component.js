import React from "react"
import PropTypes from "prop-types"

const containerStyles = (px) => {
  return `
    ${px ? "jn-p-6" : "jn-py-6"}
  `
}

/**
 * A very basic layout container with padding.
 */
export const Container = ({
  px,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={`juno-container ${containerStyles(px)} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

Container.propTypes = {
  /** Choose false if you don't want horizontal padding to be added. */
  px: PropTypes.bool,
  /** Add custom class name */
  className: PropTypes.string,
}

Container.defaultProps = {
  px: true,
  className: "",
}
