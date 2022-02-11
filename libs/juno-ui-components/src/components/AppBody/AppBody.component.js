import React from "react"
import PropTypes from "prop-types"

const containerStyles = `
  flex
  flex-col
  h-full
`

/**
 * Body of the app. Treat this like the body tag of an html page.
 */
export const AppBody = ({ className, children, ...props }) => {
  return (
    <div
      className={`juno-body ${containerStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

AppBody.propTypes = {
  /** Add custom class name */
  className: PropTypes.string,
}

AppBody.defaultProps = {
  className: "",
}
