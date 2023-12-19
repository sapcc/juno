import React, { createContext, useState, useEffect, useContext } from "react"
import PropTypes from "prop-types"


const tabNavStyles = `
  jn-flex
`

export const NavigationContext = createContext()

/** A Tab Navigation parent component. Use to wrap `<TabNavigationItem>` elements inside. For tabs with corresponding tab panels, use `<Tabs>` instead. */
export const TabNavigation = ({
  activeItem,
  ariaLabel,
  children,
  className,
  disabled,
  onActiveItemChange,
  tabStyle,
  ...props
}) => {
  
  const [ activeItm, setActiveItm ] = useState("")
  
  // Update state whenever activeItem prop on parent changes:
  useEffect(() => {
    if (activeItem) {
      setActiveItm(activeItem)
    }
  }, [activeItem])
  
  // Callback to pass to the child tab navigation items to set the state on the parent. This is used only once when initializing to prevent any onChange handlers to run:
  const updateActiveItem = (label) => {
    setActiveItm(label)
  }
  
  // Callback to pass to child tab navigation items to execute whenever they change:
  const handleActiveItemChange = (label) => {
    setActiveItm(label)
    onActiveItemChange && onActiveItemChange(label)
  }

  return (
    <NavigationContext.Provider 
      value = {{
        activeItem: activeItm,
        updateActiveItem: updateActiveItem,
        handleActiveItemChange: handleActiveItemChange,
        disabled: disabled,
        tabStyle: tabStyle,
      }}
    >
      <ul 
        className={`
          juno-tabnavigation 
          juno-tabnavigation-${tabStyle}
          ${tabNavStyles} 
          ${className}
        `} 
        role="navigation" 
        aria-label={ariaLabel} 
        {...props} 
      >
        { children }
      </ul>
    </NavigationContext.Provider>
  )
}

TabNavigation.propTypes = {
  /** The label of the selected tab. The `activeItem` prop set on the parent will override / take precedence over any `active` prop that may be set on a child. */
  activeItem: PropTypes.string,
  /** The aria-label of the navigation. Specify when there are more than one elements with an implicit or explicit `role="navigation"` on a page/view. */
  ariaLabel: PropTypes.string,
  /** The child `<TabNavigationItem>` elements to render. */
  children: PropTypes.node,
  /** A custom className to be rendered on the tab navigation */
  className: PropTypes.string,
  /** Whether the tab navigation is disabled. If set to `true`, all child tab navigation item elements will be disabled. */
  disabled: PropTypes.bool,
  /** A handler to execute when the active tab changes */
  onActiveItemChange: PropTypes.func,
  /** The stylistic variant of the Tabs: Use `main` as the first child in an `Appshell` (when manually scaffolding, as first child of `juno-content-container`). For tabs inside the page content use "content". `<TabNavigation tabStyle="main">` will have no darkened border on the bottom of inactive tabs, `tabStyle="content"` will.*/
  tabStyle: PropTypes.oneOf(["main", "content"]),
}

TabNavigation.defaultProps = {
  activeItem: "",
  ariaLabel: undefined,
  children: null,
  className: "",
  disabled: false,
  onActiveItemChange: undefined,
  tabStyle: "main",
}