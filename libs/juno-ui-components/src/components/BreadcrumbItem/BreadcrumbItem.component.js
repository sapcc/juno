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
  onClick,
  disabled,
  className,
  ...props
}) => {
  return (
    <span className={`juno-breadcrumb-item ${breadcrumbitemstyles} ${className}`}>
      { children ?
          children
        : 
          <>
            { icon ? <Icon icon={icon} /> : null}
            { active || disabled ? 
                label
              : 
                <a href={href}>{label}</a> 
            }
          </>
      }
    </span>
  )
}

BreadcrumbItem.propTypes = {
  icon: PropTypes.oneOf(knownIcons),
  href: PropTypes.string,
  label: PropTypes.string,
  ariaLabel: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
}

BreadcrumbItem.defaultProps = {
  icon: null,
  href: "#",
  label: "Item",
  ariaLabel: "",
  active: false,
  onClick: undefined,
  disabled: false,
  className: "",
  children: null,
}