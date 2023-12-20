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
  jn-py-[0.875rem]
  jn-px-[1.5625rem]
  jn-items-center
  focus-visible:jn-outline-none
  focus-visible:jn-ring-2
  focus-visible:jn-ring-theme-focus
  
`
const defaultMainItemStyles = `
  jn-border-b-[3px]
  jn-border-transparent
`

const defaultContentItemStyles = `
  jn-border-b-[3px]
  jn-border-theme-tab-content-inactive-bottom
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
  children,
  className,
  disabled,
  href,
  icon,
  label,
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
    tabStyle: tabStyle,
  } = navigationContext || {}
  
  // Use the value (if passed) or the label as identifying key or the tab:
  const theKey = value || label
  
  // Lazily init depending on parent context or tab's own prop:
  const initialActive = () => {
    if (navigationContext) {
      activeItem === theKey ? true : false
    } else {
      return active
    }
  }
  
  const [ isActive, setIsActive] = useState( () => initialActive() )
  
  // Set the parent state once if not set on the parent, but a tab navigation item has been set to active via its own prop:
  useEffect(() => {
    if (active && navigationContext && !activeItem) {
      updateActiveItem(theKey)
    }
  }, [])
  
  useEffect(() => {
    if (activeItem) {
      activeItem === theKey ? setIsActive(true) : setIsActive(false)
    } else {
      setIsActive(active)
    }
  }, [activeItem, active])

  const handleItemClick = (event) => {
    if (!isActive) {
      handleActiveItemChange(theKey)
    }
    onClick && onClick(event)
  }
  
  return (
    <li className={`jn-flex`}>
    
    { href ? 
        <a 
          className={`
            juno-tabnavigation-item
            juno-tabnavigation-item-${tabStyle}
            ${ itemStyles } 
            ${ disabled || groupDisabled ? disabledItemStyles : "" }
            ${ disabled || groupDisabled ? "juno-tabnavigation-item-disabled" : ""}
            ${ isActive ? activeItemStyles : ( tabStyle === "content" ? defaultContentItemStyles : defaultMainItemStyles) }
            ${ isActive ? "juno-tabnavigation-item-active" : "" }
            ${ className }
          `}
          href={ href }
          aria-selected={isActive}
          aria-disabled={ disabled || groupDisabled ? true : false}
          {...props}
        >
          { icon ? <Icon icon={icon} size="18" className={"jn-mr-2"} /> : null }
          <span>{ children || label || theKey }</span>
        </a>
      :
        <button className={`
            juno-tabnavigation-item
            juno-tabnavigation-item-${tabStyle}
            ${ itemStyles } 
            ${ disabled || groupDisabled ? disabledItemStyles : ""}
            ${ disabled || groupDisabled ? "juno-tabnavigation-item-disabled" : ""}
            ${ isActive ? activeItemStyles : ( tabStyle === "content" ? defaultContentItemStyles : defaultMainItemStyles) }
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
          <span>{ children || label || theKey }</span>
        </button>
    }
      
    </li>
  )
}

TabNavigationItem.propTypes = {
  /** Whether the tab navigation item is active */
  active: PropTypes.bool,
  /** The children to render. In order to make the navigation work, you also need to pass a `value` or `label` prop, or both. */
  children: PropTypes.node,
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
  /** An optional technical identifier fort the tab. If not passed, the label will be used to identify the tab. NOTE: If value is passed, the value of the active tab MUST be used when setting the activeItem prop on the parent TabNavigation.*/ 
  value: PropTypes.string,
}

TabNavigationItem.defaultProps = {
  active: false,
  children: null,
  className: "",
  disabled: false,
  href: undefined,
  icon: undefined,
  label: "",
  onClick: undefined,
  value: "",
}