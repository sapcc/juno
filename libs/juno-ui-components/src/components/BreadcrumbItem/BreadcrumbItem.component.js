import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"
import { knownIcons } from "../Icon/Icon.component.js"

const breadcrumbitemstyles = `

`

export const BreadcrumbItem = ({
  icon,
  href,
  label,
  ariaLabel,
  active,
  children,
  className,
  ...props
}) => {
  return (
    <span className={`juno-breadcrumb-item ${breadcrumbitemstyles} ${className}`}>
      { children || label }
    </span>
  )
}

BreadcrumbItem.propTypes = {
  icon: PropTypes.oneOf(knownIcons),
  href: PropTypes.string,
  label: PropTypes.string,
  ariaLabel: PropTypes.string,
  active: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
}

BreadcrumbItem.defaultProps = {
  icon: null,
  href: "#",
  label: "Item",
  ariaLabel: "",
  active: false,
  className: "",
  children: null,
}