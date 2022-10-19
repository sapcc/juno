import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "../Icon/index.js";
import { knownIcons } from "../Icon/Icon.component.js"

const topNavigationItemStyles = `

`

export const TopNavigationItem = ({
  icon,
  label,
  ariaLabel,
  href,
  active,
  onClick,
  disabled,
  children,
  className,
  ...props
}) => {
  
  const icn = icon ? <Icon icon={icon} size="18" color="jn-text-theme-default" className={ label && label.length ? "jn-mr-1" : "" } /> : null
  
  const content = label || children
  
  const handleButtonClick = (event) => {
    onClick && onClick(event)
  }
  
  const anchor = (
    <a href={href} >
      { icn }
      { content }
    </a>
  )
  
  const button = (
    <button onClick={handleButtonClick}>
      { icn }
      { content }
    </button>
  )
  
  const plain = (
    <div className={`juno-topnavigation-item ${topNavigationItemStyles} ${className}`}>
      { icn }
      { label || children }
    </div>
  )
  
  return href ? anchor : onClick ? button : plain
}

TopNavigationItem.propTypes = {
  /** pass an icon name */
  icon: PropTypes.oneOf(knownIcons),
  label: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
}

TopNavigationItem.defaultProps = {
  icon: null,
  children: null,
  className: "",
}