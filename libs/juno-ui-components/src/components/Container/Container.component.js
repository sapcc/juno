import React from "react"
import PropTypes from "prop-types"

const containerStyles = (px) => {
  return `
    ${px ? "p-6" : "py-6"}
  `
}

/**
 * A very basic layout element with padding.
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
