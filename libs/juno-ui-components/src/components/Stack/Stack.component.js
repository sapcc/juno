import React from "react"
import PropTypes from "prop-types"


export const Stack = ({
  direction,
  ...props
}) => {

  return (
    <></>
  )
}

Stack.propTypes = {
  variant: PropTypes.oneOf(["primary", "danger", "default"]),
  size: PropTypes.oneOf(["small", "default", "large"]),
  label: PropTypes.string,
  title: PropTypes.string,
  // Optional click handler
  onClick: PropTypes.func,
}

Stack.defaultProps = {
  variant: "default",
  title: null,
  size: "default",
  onClick: undefined,
}