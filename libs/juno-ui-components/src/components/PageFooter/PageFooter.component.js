import React from "react"
import PropTypes from "prop-types"
import CCloudShape from "../../img/ccloud_shape.svg"

const basePageFooter = `
  flex
  relative
  bg-theme-background-lvl-1
  min-h-[3.25rem]
  pl-6
  pr-24
  py-5
  z-50
`

const logoStyles = `
  h-[2.625rem]
  absolute
  right-0
  bottom-0
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
      <CCloudShape className={logoStyles} alt="cloud shape" />
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
