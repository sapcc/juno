/*
 * SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Juno contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { NavigationContext } from "../Navigation/Navigation.component"
import { Icon } from "../Icon/index.js"
import { knownIcons } from "../Icon/Icon.component.js"

const activeStyles = `
  jn-font-bold
`

const disabledStyles = `
  jn-opacity-50
  jn-cursor-not-allowed
`

/** A generic Navigation Item component. For internal use only. */
export const NavigationItem = ({
  active,
  ariaLabel,
  children,
  className,
  disabled,
  icon,
  label,
  href,
  onClick,
  value,
  wrapperClassName,
  ...props
}) => {
  const navigationContext = useContext(NavigationContext)

  // Create a unique Identifier to a) identify the active item with the parent, b) as a key in the map of items with the parent, and c) to be returned by interested event handlers.
  const theKey = value || children || label

  const {
    activeItem: activeItem,
    addItem: addItem,
    handleActiveItemChange: handleActiveItemChange,
    navigationDisabled: navigationDisabled,
    navigationRole: navigationRole,
  } = navigationContext || {}

  // Determine whether the item is initially set to active via the parent navigation component or by its own devices:
  const initialActive = () => {
    if (navigationContext?.activeItem?.length > 0) {
      return activeItem === theKey
    } else {
      return active
    }
  }

  const [isActive, setIsActive] = useState(() => initialActive())

  useEffect(() => {
    // only add the item to the parent if we are in a context and addItem method exists:
    addItem ? addItem(theKey, children, label, value) : undefined
  }, [children, label, value])

  useEffect(() => {
    if (activeItem) {
      activeItem === theKey ? setIsActive(true) : setIsActive(false)
      return
    }
    setIsActive(active)
  }, [activeItem, active])

  const handleClick = (event) => {
    if (disabled) {
      event.preventDefault()
    } else {
      if (
        !isActive &&
        handleActiveItemChange &&
        typeof handleActiveItemChange === "function"
      ) {
        handleActiveItemChange(theKey)
      }
      onClick && onClick(event)
    }
  }

  return (
    <li className={`juno-navigation-item-wrapper ${wrapperClassName}`}>
      {href && href.length ? (
        <a
          aria-disabled={navigationDisabled || disabled ? true : null}
          aria-label={ariaLabel && ariaLabel.length ? ariaLabel : null}
          aria-selected={isActive ? true : null}
          className={`
            juno-navigation-item 
            ${
              navigationRole
                ? "juno-" + navigationRole.toLowerCase() + "-item"
                : ""
            }
            ${isActive ? "juno-navigation-item-active " + activeStyles : ""}
            ${
              navigationDisabled || disabled
                ? "juno-navigation-item-disabled " + disabledStyles
                : ""
            }
            ${className}`}
          data-value={value && value.length ? value : null}
          disabled={navigationDisabled || disabled}
          href={href}
          onClick={handleClick}
          {...props}
        >
          {children || label || value}
        </a>
      ) : (
        <button
          aria-disabled={navigationDisabled || disabled ? true : null}
          aria-label={ariaLabel && ariaLabel.length ? ariaLabel : null}
          aria-selected={isActive ? true : null}
          className={`
            juno-navigation-item 
            ${
              navigationRole
                ? "juno-" + navigationRole.toLowerCase() + "-item"
                : ""
            }
            ${isActive ? "juno-navigation-item-active " + activeStyles : ""}
            ${
              navigationDisabled || disabled
                ? "juno-navigation-item-disabled " + disabledStyles
                : ""
            }
            ${className}`}
          data-value={value && value.length ? value : null}
          disabled={navigationDisabled || disabled}
          onClick={handleClick}
          {...props}
        >
          {children || label || value}
        </button>
      )}
    </li>
  )
}

NavigationItem.propTypes = {
  active: PropTypes.bool,
  arialabel: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOf(knownIcons),
  label: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.string,
  wrapperClassName: PropTypes.string,
}

NavigationItem.defaultProps = {
  active: false,
  arialabel: "",
  className: "",
  children: null,
  disabled: false,
  icon: null,
  label: "",
  href: "",
  onClick: undefined,
  value: "",
  wrapperClassName: "",
}
