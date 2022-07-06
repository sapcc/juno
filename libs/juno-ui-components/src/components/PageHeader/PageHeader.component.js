import React from "react"
import PropTypes from "prop-types"
import SAPLogo from "../../img/sap_logo.svg"

const basePageHeader = `
  jn-flex
  jn-items-center
  jn-bg-juno-grey-blue-11
  jn-sticky
  jn-top-0
  jn-px-6
  jn-py-3
  jn-z-50
`

const logoStyles = `
  jn-h-6
  jn-mr-3
`

const headingStyles = `
  jn-text-lg
  jn-text-theme-high
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
      className={`juno-pageheader theme-dark ${basePageHeader} ${className}`}
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