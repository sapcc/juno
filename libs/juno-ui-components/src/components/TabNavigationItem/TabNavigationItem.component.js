import React, { useState, useEffect, useContext } from "react"
import PropTypes from "prop-types"
import { NavigationContext } from "../TabNavigation/TabNavigation.component"
import { Icon } from "../Icon/index.js"
import { knownIcons } from "../Icon/Icon.component.js"

const itemStyles = `
  jn-flex
  jn-items-center
  jn-text-theme-default
  jn-font-bold
  jn-px-[1.5625rem]
  jn-items-center
  focus-visible:jn-outline-none
  focus-visible:jn-ring-2
  focus-visible:jn-ring-theme-focus
`

const disabledItemStyles = `
  jn-pointer-events-none
  jn-opacity-50
  jn-cursor-not-allowed
`

const activeItemStyles = `
  jn-text-theme-high
  jn-border-b-[3px]
  jn-border-theme-tab-active-bottom
`

/** An individual Tab Navigation Item. Use wrapped in a `<TabNavigation>` parent component. */
export const TabNavigationItem = ({
  active,
  className,
  disabled,
  href,
  icon,
  label,
  onClick,
  ...props
}) => {
  
  const navigationContext = useContext(NavigationContext)
  const {
    activeItem: activeItem,
    updateActiveItem: updateActiveItem,
    handleActiveItemChange: handleActiveItemChange,
    disabled: groupDisabled,
  } = navigationContext || {}
  
  // Lazily init depending on parent context or tab's own prop:
  const initialActive = () => {
    if (navigationContext) {
      activeItem === label ? true : false
    } else {
      return active
    }
  }
  
  const [ isActive, setIsActive] = useState( () => initialActive() )
  
  // Set the parent state once if not set on the parent, but a tab navigation item has been set to active via its own prop:
  useEffect(() => {
    if (active && navigationContext && !activeItem) {
      updateActiveItem(label)
    }
  }, [])
  
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
    <li className={`jn-flex`}>
    
    { href ? 
        <a 
          className={`
            juno-tabnavigation-item
            ${ itemStyles } 
            ${ disabled || groupDisabled ? disabledItemStyles : "" }
            ${ disabled || groupDisabled ? "juno-tabnavigation-item-disabled" : ""}
            ${ isActive ? activeItemStyles : ""}
            ${ isActive ? "juno-tabnavigation-item-active" : "" }
            ${ className }
          `}
          href={ href }
          aria-selected={isActive}
          aria-disabled={ disabled || groupDisabled ? true : false}
          {...props}
        >
          { icon ? <Icon icon={icon} size="18" className={"jn-mr-2"} /> : null }
          <span>{ label }</span>
        </a>
      :
        <button className={`
            juno-tabnavigation-item
            ${ itemStyles } 
            ${ disabled || groupDisabled ? disabledItemStyles : ""}
            ${ disabled || groupDisabled ? "juno-tabnavigation-item-disabled" : ""}
            ${ isActive ? activeItemStyles : ""}
            ${ isActive ? "juno-tabnavigation-item-active" : "" }
            ${ className } 
          `}
          onClick={handleItemClick}
          aria-selected={isActive}
          disabled={disabled || groupDisabled ? true : false }
          aria-disabled={ disabled || groupDisabled ? true : false}
          {...props}
        >
          { icon ? <Icon icon={icon} size="18" className={"jn-mr-2"} /> : null }
          <span>{ label }</span>
        </button>
    }
      
    </li>
  )
}

TabNavigationItem.propTypes = {
  /** Whether the tab navigation item is active */
  active: PropTypes.bool,
  /** Pass a custom className */
  className: PropTypes.string,
  /** Whether the tab navigation item is disabled */
  disabled: PropTypes.bool,
  /*+ Pass a href to render the item as an `<a>` */
  href: PropTypes.string,
  /** Pass the name of an icon to render in the Tab. Can be any icon included with Juno. */
  icon: PropTypes.oneOf(knownIcons),
  /** The label of the tab navigation item. Must be unique within any given `<TabNavigation>` group. */
  label: PropTypes.string,
  /** Pass a custom handler to execute when the tab is clicked */
  onClick: PropTypes.func,
}

TabNavigationItem.defaultProps = {
  active: false,
  className: "",
  disabled: false,
  href: undefined,
  icon: undefined,
  label: "",
  onClick: undefined,
}