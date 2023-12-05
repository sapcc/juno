import React, { createContext, useState, useEffect, useContext } from "react"
import PropTypes from "prop-types"


const tabListStyles = `
  jn-flex
`

export const TabNavigationContext = createContext()

/** A Tab Navigation parent component. Use to wrap `<TabNavigationItem>` elements inside. */
/** TODO: keyboard accessibility */
export const TabNavigation = ({
  activeTab,
  children,
  className,
  disabled,
  onTabChange,
  ...props
}) => {
  
  const [ activeT, setActiveT ] = useState("")
  
  // Update state whenever activeTab prop on parent changes:
  useEffect(() => {
    if (activeTab) {
      setActiveT(activeTab)
    }
  }, [activeTab])
  
  // Callback to pass to the child tab navigation items to set the state on the parent. This is used only once when initializing to prevent any onChange handlers to run:
  const updateActiveTab = (label) => {
    setActiveT(label)
  }
  
  // Callback to pass to child tab navigation items to execute whenever they change:
  const handleTabChange = (label) => {
    setActiveT(label)
    onTabChange && onTabChange(label)
  }

  return (
    <TabNavigationContext.Provider 
      value = {{
        activeTab: activeT,
        updateActiveTab: updateActiveTab,
        handleTabChange: handleTabChange,
        disabled: disabled,
      }}
    >
      <ul className={`juno-tabnavigation ${tabListStyles} ${className}`} role="tablist" tabindex="0" {...props} >
        { children }
      </ul>
    </TabNavigationContext.Provider>
  )
}

TabNavigation.propTypes = {
  /** The label of the selected tab. The `activeTab` prop set on the parent will override / take precedence over any `active` prop that may be set on a child. */
  activeTab: PropTypes.string,
  /** The child `<TabNavigationItem>` elements to render. */
  children: PropTypes.node,
  /** A custom className to be rendered on the tab navigation */
  className: PropTypes.string,
  /** Whether the tab navigation is disabled. If set to `true`, all child tab navigation item elements will be disabled. */
  disabled: PropTypes.bool,
  /** A handler to execute when the active tab changes */
  onTabChange: PropTypes.func,
}

TabNavigation.defaultProps = {
  activeTab: "",
  children: null,
  className: "",
  disabled: false,
  onTabChange: undefined,
}