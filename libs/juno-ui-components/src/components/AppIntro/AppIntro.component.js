import React from "react"
import PropTypes from "prop-types"

const introStyles = `
  pt-16
  pb-14
  text-xl
  pr-[45%]
`

/**
 * App intro section. Typically contains an introductory lead text explaining what the app is about.
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
