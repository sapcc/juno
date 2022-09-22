import React from "react"
import PropTypes from "prop-types"
import { Stack } from "../Stack/"

const breadcrumbstyles = `

`

export const Breadcrumb = ({
  children,
  className,
  ...props
}) => {
  return (
    <Stack className={`juno-breadcrumb ${breadcrumbstyles} ${className}`}>
      { children }
    </Stack>
  )
}

Breadcrumb.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

Breadcrumb.defaultProps = {
  className: "",
  children: null,
}