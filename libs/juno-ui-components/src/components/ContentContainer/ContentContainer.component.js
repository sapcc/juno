import React from "react"
import PropTypes from "prop-types"


const containerStyles = `
  flex
  flex-col
  grow
  ml-8
  2xl:container
  2xl:mx-auto
  bg-[right_top_1rem]
  bg-no-repeat
`

/**
 * Only needed if you want to build your app's scaffold manually. In most cases it is better to use the AppShell component instead.
 * A container for app content. Will be centered on the screen when browser window is wider than the max breakpoint width.
 */
export const ContentContainer = ({ className, children, ...props }) => {
  return (
    <div className={`juno-content-container ${containerStyles} ${className}`} {...props}>
      {children}
    </div>
  )
}

ContentContainer.propTypes = {
  /** Add custom class name */
  className: PropTypes.string,
}

ContentContainer.defaultProps = {
  className: "",
}
