import React from "react"
import PropTypes from "prop-types"

const introStyles = `
  pt-16
  pb-14
  text-xl
  pr-[45%]
`

/**
 * OBSOLETE: Will be deleted!
 */
export const AppIntro = ({ className, children, ...props }) => {
  return (
    <div className={`juno-app-intro ${introStyles} ${className}`} {...props}>
      {children}
    </div>
  )
}

AppIntro.propTypes = {
  /** Add custom class name */
  className: PropTypes.string,
}

AppIntro.defaultProps = {
  className: "",
}
