import React from "react"
import PropTypes from "prop-types"
import SAPLogo from "../../img/sap_logo.svg"

const basePageHeader = `
  flex
  items-center
  bg-juno-grey-blue-11
  sticky
  top-0
  px-6
  py-3
  z-50
`

const logoStyles = `
  h-6
  mr-3
`

const headingStyles = `
  text-lg
  text-theme-high
`

/**
 * The page header component renders a header at the top of the website. Place as first child of AppBody.
 */
export const PageHeader = ({
  heading,
  className,
  children,
  ...props
}) => {

  return (
    <div 
      className={`juno-pageheader ${basePageHeader} ${className}`}
      role="banner"
      {...props}
    >
      <SAPLogo className={logoStyles} alt="SAP" />
      {heading && <div className={headingStyles}>{heading}</div>}
      {children}
    </div>
  )
}

PageHeader.propTypes = {
  /** Heading (typically the name of the application) */
  heading: PropTypes.string,
  /** Add custom class name */
  className: PropTypes.string
}

PageHeader.defaultProps = {
  heading: null,
  className: ""
}