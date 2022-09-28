import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"
import { knownIcons } from "../Icon/Icon.component.js"

const breadcrumbitemstyles = `
  jn-text-sm
  jn-text-theme-high
  jn-flex
  jn-gap-1
  jn-items-center
`

const breadcrumblinkstyles = `
  jn-text-theme-high
`

const disabledstyles = `
  jn-text-theme-disabled
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
  
  const icn = icon ? <Icon icon={icon} size="18" color="jn-text-theme-default" className={ label && label.length ? "jn-mr-1" : "" } /> : null
  
  return (
    
      children ?
          { children }
        : 
          <span className={`juno-breadcrumb-item ${breadcrumbitemstyles} ${ disabled ? disabledstyles : "" } ${className}`} {...props} >
            { active || disabled ? 
                <>
                  { icn }
                  { label }
                </>
              : 
                <a href={href} className={`${breadcrumblinkstyles}`} >
                  { icn }
                  { label }
                </a> 
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