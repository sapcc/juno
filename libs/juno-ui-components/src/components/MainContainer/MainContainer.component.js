import React from "react"
import PropTypes from "prop-types"

const mainClasses = `
  jn-flex
  jn-flex-col
  jn-grow
  jn-bg-theme-global-bg
`

/**
 * Only needed if you want to build your app's scaffold manually. In most cases it is better to use the AppShell component instead.
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
  className: PropTypes.string,
  children: PropTypes.node,
}

MainContainer.defaultProps = {
  className: "",
  children: null,
}