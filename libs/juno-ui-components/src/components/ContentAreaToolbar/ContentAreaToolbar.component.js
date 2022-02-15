import React from "react"
import PropTypes from "prop-types"


const toolbarStyles = `
  bg-theme-content-area-toolbar-bg
  py-3
  px-6
  flex
  items-center
  justify-end
`

/**
 * This is the main toolbar of the content area. Add main actions for the current page here.
 */
export const ContentAreaToolbar = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={`juno-content-area-toolbar ${toolbarStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

ContentAreaToolbar.propTypes = {
  /** Add custom class name */
  className: PropTypes.string,
}

ContentAreaToolbar.defaultProps = {
  className: "",
}
