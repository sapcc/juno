import React from "react"
import PropTypes from "prop-types"
import SAPLogo from "../../img/sap_logo.svg"

const basePageHeader = (direction, gap) => {
  return (
    `
      flex
      bg-black
      sticky
      top-0
      p-2
      ${direction === "vertical" ? 'flex-col' : 'flex-row'}
      gap-${gap ? gap : '0'}
    `
  )
}

const logoStyles = () => {
  return (
    `
      h-6
      mr-3
    `
  )
}

const headingStyles = `
  uppercase
  text-white
`

/**
 * The page header component renders a header at the top of the website.
 */
export const PageHeader = ({
  heading,
  children,
  ...props
}) => {

  return (
    <div 
      className={basePageHeader()}
      role="banner"
      {...props}
    >
      <SAPLogo className={logoStyles()} alt="SAP" />
      {heading && <div className={headingStyles}>{heading}</div>}
      {children}
    </div>
  )
}

PageHeader.propTypes = {
  /** Heading (typically the name of the application) */
  heading: PropTypes.string
}

PageHeader.defaultProps = {
  heading: null
}