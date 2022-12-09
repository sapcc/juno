import React from "react"
import PropTypes from "prop-types"

/** A basic inline <code> component.
*   Accepts "content" prop or renders children as passed.
*/
export const Code = ({
  content,
  children,
  className,
  ...props
}) => {
  return (
    <code className={`juno-code ${className}`} {...props}>
      { content || children }
    </code>
  )
}

Code.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
}

Code.defaultProps = {
  content: "",
  className: "",
  children: null,
}

