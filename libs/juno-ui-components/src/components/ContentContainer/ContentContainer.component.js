import React from "react"
import PropTypes from "prop-types"


const containerStyles = `
  ml-8
  2xl:container
  2xl:mx-auto
`

/**
 * A container for app content. Will be centered on the screen when browser window is wider than the max breakpoint width.
 */
export const ContentContainer = ({ className, children, ...props }) => {
  return (
    <main className={`juno-content-container ${containerStyles} ${className}`} {...props}>
      {children}
    </main>
  )
}

ContentContainer.propTypes = {
  /** Add custom class name */
  className: PropTypes.string,
}

ContentContainer.defaultProps = {
  className: null,
}
