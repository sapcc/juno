import React from "react"
import PropTypes from "prop-types"

const mainClasses = `
  flex
  flex-col
  grow
`

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
      className={`juno-main ${mainClasses} ${className}`}
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
  className: ""
}