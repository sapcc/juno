import React from "react"
import PropTypes from "prop-types"

const containerStyles = (px, py) => {
  return `
    ${ px ? "jn-px-6 " : " " } 
    ${ py ? " jn-py-6" : "" }
  `
}

/**
 * A very basic layout container with padding.
 */
export const Container = ({
  px,
  py,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={`juno-container ${containerStyles(px, py)} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

Container.propTypes = {
  /** Choose false if you don't want horizontal padding to be added. */
  px: PropTypes.bool,
  /** Set to true to add vertical padding. */
  py: PropTypes.bool,
  /** Add custom class name */
  className: PropTypes.string,
}

Container.defaultProps = {
  px: true,
  py: false,
  className: "",
}
