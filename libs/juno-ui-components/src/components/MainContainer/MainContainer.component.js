import React from "react"
import PropTypes from "prop-types"



/**
 * The main container for app content.
 */
export const MainContainer = ({
  className,
  children,
  ...props
}) => {

  return (
    <main
      className={`juno-main ${className}`}
      {...props}
    >
      {children}
    </main>
  )
}

MainContainer.propTypes = {
  /** Add custom class name */
  className: PropTypes.string
}

MainContainer.defaultProps = {
  className: null
}