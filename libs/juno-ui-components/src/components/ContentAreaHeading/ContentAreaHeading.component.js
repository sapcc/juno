import React from "react"
import PropTypes from "prop-types"

const toolbarStyles = `
  font-bold
  text-lg
  text-theme-high
  pb-2
  pt-6
`

/**
 * Only needed if you want to build your app's scaffold manually. In most cases it is better to use the AppShell component instead.
 * This is the title of the content displayed in the content area.
 */
export const ContentAreaHeading = ({ heading, className, children, ...props }) => {
  return (
    <h1
      className={`juno-content-area-heading ${toolbarStyles} ${className}`}
      {...props}
    >
      {heading}
      {children}
    </h1>
  )
}

ContentAreaHeading.propTypes = {
  /** Text to use as a title */
  heading: PropTypes.string,
  /** Add custom class name */
  className: PropTypes.string,
}

ContentAreaHeading.defaultProps = {
  heading: "",
  className: "",
}
