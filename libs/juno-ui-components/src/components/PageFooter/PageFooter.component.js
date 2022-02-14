import React from "react"
import PropTypes from "prop-types"

const basePageFooter = `
  flex
  bg-theme-background-lvl-1
  bg-[url('img/ccloud_shape.svg')]
  bg-right-bottom
  bg-no-repeat
  min-h-[4rem]
  sticky
  bottom-0
  px-6
  py-5
  z-50
`

const logoStyles = `
  h-6
`

const headingStyles = `
  uppercase
  text-white
`

/**
 * The page footer component renders a footer at the bottom of the website. Place as last child of AppBody.
 */
export const PageFooter = ({ className, children, ...props }) => {
  return (
    <div
      className={`juno-pagefooter ${basePageFooter} ${className}`}
      role="contentinfo"
      {...props}
    >
      {children}
    </div>
  )
}

PageFooter.propTypes = {
  /** Add custom class name */
  className: PropTypes.string,
}

PageFooter.defaultProps = {
  className: "",
}
