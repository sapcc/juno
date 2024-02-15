import React, { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { NavigationContext } from "../SideNavigation/SideNavigation.component"
import { Icon } from "../Icon/index.js"
import { knownIcons } from "../Icon/Icon.component.js"

const itemStyles = `
  jn-flex
  jn-items-center
  jn-w-full
  jn-py-1.5
  jn-px-8
  jn-text-theme-default
  jn-font-bold
  jn-cursor-pointer
  focus-visible:jn-outline-none
  focus-visible:jn-ring-2
  focus-visible:jn-ring-theme-focus
`

const activeItemStyles = `
  jn-text-theme-sidenavigation-item-active
  jn-bg-theme-sidenavigation-item-active
`

const disabledItemStyles = `
  jn-pointer-events-none
  jn-opacity-50
  jn-cursor-not-allowed
`

/**
A SideNavigation item. To be used inside SideNavigation.
*/
export const SideNavigationItem = ({
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
  ...props
}) => {
  const navigationContext = useContext(NavigationContext)

  const {
    activeItem: activeItem,
    updateActiveItem: updateActiveItem,
    handleActiveItemChange: handleActiveItemChange,
    disabled: groupDisabled,
  } = navigationContext || {}

  const theKey = value || label

  const initialActive = () => {
    if (navigationContext?.activeItem?.length > 0) {
      return activeItem === theKey
    } else {
      return active
    }
  }

  const [isActive, setIsActive] = useState(() => initialActive())

  // Update the parent state when in a navigation context, otherwise update item state directly:
  useEffect(() => {
    if (activeItem) {
      activeItem === theKey ? setIsActive(true) : setIsActive(false)
      return
    }
    setIsActive(active)
  }, [activeItem, active])

  const handleItemClick = (event) => {
    if (!isActive) {
      handleActiveItemChange(theKey)
    }
    onClick && onClick(event)
  }

  return (
    <li className="jn-flex">
      {href ? (
        <a
          className={`
              juno-sidenavigation-item
              ${itemStyles}
              ${isActive ? "juno-sidenavigation-item-active" : ""}
              ${isActive ? activeItemStyles : ""}
              ${disabled || groupDisabled ? disabledItemStyles : ""}
              ${
                disabled || groupDisabled
                  ? "juno-sidenavigation-item-disabled"
                  : ""
              }
              ${className}
            `}
          href={href}
          aria-label={ariaLabel}
          aria-disabled={disabled || groupDisabled ? true : false}
          aria-selected={isActive}
          onClick={handleItemClick}
          {...props}
        >
          {icon ? (
            <Icon
              icon={icon}
              size="18"
              className={label && label.length ? "jn-mr-2" : ""}
            />
          ) : (
            ""
          )}
          <span>{children || label || theKey}</span>
        </a>
      ) : (
        <button
          className={`
              juno-sidenavigation-item
              ${itemStyles}
              ${isActive ? "juno-sidenavigation-item-active" : ""}
              ${isActive ? activeItemStyles : ""}
              ${disabled || groupDisabled ? disabledItemStyles : ""}
              ${
                disabled || groupDisabled
                  ? "juno-sidenavigation-item-disabled"
                  : ""
              }
              ${className}
            `}
          aria-label={ariaLabel}
          aria-disabled={disabled || groupDisabled ? true : false}
          aria-selected={isActive}
          disabled={disabled || groupDisabled ? true : false}
          onClick={handleItemClick}
          {...props}
        >
          {icon ? (
            <Icon
              icon={icon}
              size="18"
              className={label && label.length ? "jn-mr-2" : ""}
            />
          ) : (
            ""
          )}
          <span>{children || label || theKey}</span>
        </button>
      )}
    </li>
  )
}

SideNavigationItem.propTypes = {
  /** Whether the item is the currently active item */
  active: PropTypes.bool,
  /** The aria label of the item */
  ariaLabel: PropTypes.string,
  /** The children to render. In order to make the navigation work, you also need to pass a `value` or `label` prop, or both. */
  children: PropTypes.node,
  /** Whether the item is disabled */
  disabled: PropTypes.bool,
  /** pass an icon name */
  icon: PropTypes.oneOf(knownIcons),
  /** The label of the item */
  label: PropTypes.string,
  /** Pass a custom className */
  className: PropTypes.string,
  /** The aria label of the item */
  ariaLabel: PropTypes.string,
  /** The link the item should point to. Will render the item as an anchor if passed */
  href: PropTypes.string,
  /** A handler to execute once the item is clicked. Will render the item as a button element if passed */
  onClick: PropTypes.func,
  /** An optional technical identifier fort the tab. If not passed, the label will be used to identify the tab. NOTE: If value is passed, the value of the active tab MUST be used when setting the activeItem prop on the parent SideNavigation.*/
  value: PropTypes.string,
}

SideNavigationItem.defaultProps = {
  active: false,
  ariaLabel: undefined,
  children: null,
  disabled: false,
  icon: null,
  label: "",
  className: "",
  ariaLabel: "",
  href: "",
  onClick: undefined,
  value: "",
}
