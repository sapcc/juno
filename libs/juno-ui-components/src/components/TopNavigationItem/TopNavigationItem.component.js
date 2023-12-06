import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { NavigationContext } from "../TopNavigation/TopNavigation.component"
import { Icon } from "../Icon/index.js";
import { knownIcons } from "../Icon/Icon.component.js"

const itemStyles = `
  jn-flex
  jn-items-center
  jn-text-theme-default
  jn-font-bold
  focus-visible:jn-outline-none
  focus-visible:jn-ring-2
  focus-visible:jn-ring-theme-focus
`

const disabledItemStyles = `
  jn-opacity-50
  jn-cursor-not-allowed
`

const activeItemStyles = `
  jn-text-theme-high
`

/**
An individual item of a top level navigation. Place inside TopNavigation.
*/
export const TopNavigationItem = ({
  active,
  ariaLabel,
  disabled,
  href,
  icon,
  label,
  onClick,
  className,
  ...props
}) => {
  
  const navigationContext = useContext(NavigationContext)
  
  const {
    activeItem: activeItem,
    updateActiveItem: updateActiveItem,
    handleActiveItemChange: handleActiveItemChange,
    disabled: groupDisabled,
  } = navigationContext || {}
  
  const initialActive = () => {
    if (navigationContext) {
      activeItem === label ? true : false
    } else {
      return active
    }
  }
  
  const [isActive, setIsActive] = useState( () => initialActive() )
  
  // Set the parent state once if not set on the parent, but a navigation item has been set to active via its own prop:
  useEffect(() => {
    if (active && navigationContext && !activeItem) {
      updateActiveItem(label)
    }
  }, [])
  
  // Update the parent state when in a navigation context, otherwise update item state directly:
  useEffect(() => {
    if (activeItem) {
      activeItem === label ? setIsActive(true) : setIsActive(false)
    } else {
      setIsActive(active)
    }
  }, [activeItem, active])
  
  
  const handleItemClick = (event) => {
    if (!isActive) {
      handleActiveItemChange(label)
    }
    onClick && onClick(event)
  }
  
  return (
    <ul
      className="jn-flex"
    >
      { href ?
          <a
            className={`
              juno-topnavigation-item
              ${itemStyles}
              ${ isActive ? "juno-topnavigation-item-active" : ""}
              ${ isActive ? activeItemStyles : ""}
              ${ disabled || groupDisabled ? disabledItemStyles : ""}
              ${ disabled || groupDisabled ? "juno-topnavigation-item-disabled" : ""}
              ${ className }
            `}
            href={href}
            aria-label={ariaLabel}
            aria-disabled={ disabled || groupDisabled ? true : false}
            aria-selected={isActive}
            {...props}
          >
            { icon ? <Icon icon={icon} size="18" className={"jn-mr-2"} /> : null }
            <span>{label}</span>
          </a>
        :
          <button
            className={`
              juno-topnavigation-item
              ${itemStyles}
              ${ isActive ? "juno-topnavigation-item-active" : ""}
              ${ isActive ? activeItemStyles : ""}
              ${ disabled || groupDisabled ? disabledItemStyles : ""}
              ${ disabled || groupDisabled ? "juno-topnavigation-item-disabled" : ""}
              ${ className }
            `}
            aria-label={ariaLabel}
            aria-disabled={ disabled || groupDisabled ? true : false}
            aria-selected={isActive}
            disabled={disabled || groupDisabled ? true : false }
            onClick={handleItemClick}
            {...props}
          >
            { icon ? <Icon icon={icon} size="18" className={"jn-mr-2"} /> : null }
            <span>{label}</span>
          </button>
      }
    </ul>
    
  )
  
  // const icn = icon ? <Icon icon={icon} size="24" color="jn-text-theme-default" className={ label && label.length ? "jn-mr-1" : "" } /> : null
  // 
  // const content = label || children
  // 
  // const handleButtonClick = (event) => {
  //   onClick && onClick(event)
  // }
  // 
  // const anchor = (
  //   <a className={`juno-topnavigation-item ${ active ? "juno-topnavigation-item-active" : ""} ${className}`} 
  //     href={href} 
  //     aria-label={ariaLabel}
  //     {...props}
  //   >
  //     { icn }
  //     { content }
  //   </a>
  // )
  // 
  // const button = (
  //   <button 
  //     className={`juno-topnavigation-item ${ active ? "juno-topnavigation-item-active" : ""} ${className}`} 
  //     onClick={handleButtonClick}
  //     aria-label={ariaLabel}
  //     {...props}
  //   >
  //     { icn }
  //     { content }
  //   </button>
  // )
  // 
  // const plain = (
  //   <div className={`juno-topnavigation-item ${ active ? "juno-topnavigation-item-active" : ""} ${className}`}
  //     aria-label={ariaLabel}
  //     {...props}
  //   >
  //     { icn }
  //     { label || children }
  //   </div>
  // )
  // 
  // return href ? anchor : onClick ? button : plain
}

TopNavigationItem.propTypes = {
  /** Whether the item is the currently active item */
  active: PropTypes.bool,
  /** The aria label of the item */
  ariaLabel: PropTypes.string,
  /** Whether the item is disabled */
  disabled: PropTypes.bool,
  /** pass an icon name */
  icon: PropTypes.oneOf(knownIcons),
  /** The label of the item */
  label: PropTypes.string,
  /** Pass a custom className */
  className: PropTypes.string,
  /** The link the item should point to. Will render the item as an anchor if passed */
  href: PropTypes.string,
  /** A handler to execute once the item is clicked. Will render the item as a button element if passed */
  onClick: PropTypes.func,
}

TopNavigationItem.defaultProps = {
  active: false,
  ariaLabel: "",
  disabled: false,
  icon: null,
  label: "",
  className: "",
  href: "",
  onClick: undefined,
}