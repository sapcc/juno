import React, { useState, useEffect, useContext } from "react"
import PropTypes from "prop-types"
import { TabNavigationContext } from "../TabNavigation/TabNavigation.component"
import { Icon } from "../Icon/index.js"
import { knownIcons } from "../Icon/Icon.component.js"

const tabStyles = `
  jn-flex
  jn-font-bold
  jn-px-[1.5625rem]
  jn-items-center
  jn-cursor-pointer
  focus:jn-outline-none 
`

const disabledTabStyles = `
  jn-pointer-events-none
  jn-opacity-50
`

const activeTabStyles = `
  jn-border-b-[3px]
  jn-border-theme-tab-active-bottom
`

/** An individual Tab Navigation Item. Use wrapped in a `<TabNavigation>` parent component. */
export const TabNavigationItem = ({
  active,
  disabled,
  icon,
  label,
  onClick,
  ...props
}) => {
  
  const tabNavigationContext = useContext(TabNavigationContext)
  const {
    activeTab: activeTab,
    updateActiveTab: updateActiveTab,
    handleTabChange: handleTabChange,
    disabled: groupDisabled,
  } = tabNavigationContext || {}
  
  // Lazily init depending on parent context or tab's own prop:
  const initialActive = () => {
    if (tabNavigationContext) {
      activeTab === label ? true : false
    } else {
      return active
    }
  }
  
  const [ isActive, setIsActive] = useState( () => initialActive() )
  
  // Set the parent state once if not set on the parent, but a tab navigation item has been set to active via its own prop:
  useEffect(() => {
    if (active && tabNavigationContext && !activeTab) {
      updateActiveTab(label)
    }
  }, [])
  
  useEffect(() => {
    if (activeTab) {
      activeTab === label ? setIsActive(true) : setIsActive(false)
    } else {
      setIsActive(active)
    }
  }, [activeTab, active])

  const handleTabClick = (event) => {
    if (!isActive) {
      handleTabChange(label)
    }
    onClick && onClick(event)
  }
  
  return (
    <li 
      className={`
        juno-tabnavigation-item
         ${tabStyles} 
         ${ disabled || groupDisabled ? disabledTabStyles : ""}
         ${ isActive ? activeTabStyles : ""}
      `} 
      role="tab" 
      onClick={handleTabClick}
    >
      { icon ? <Icon icon={icon} size="18" className={`jn-mr-2`} /> : null }
      <span>
        { label }
      </span>
    </li>
  )
}

TabNavigationItem.propTypes = {
  /** Whether the tab navigation item is active */
  active: PropTypes.bool,
  /** Whether the tab navigation item is disabled */
  disabled: PropTypes.bool,
  /** Pass the name of an icon to render in the Tab. Can be any icon included with Juno. */
  icon: PropTypes.oneOf(knownIcons),
  /** The label of the tab navigation item */
  label: PropTypes.string,
  /** Pass a custom handler to execute when the tab is clicked */
  onClick: PropTypes.func,
}

TabNavigationItem.defaultProps = {
  active: false,
  disabled: false,
  icon: undefined,
  label: "",
  onClick: undefined,
}