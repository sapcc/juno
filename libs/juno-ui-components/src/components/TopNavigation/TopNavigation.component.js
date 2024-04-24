/*
 * SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Juno contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const topNavigationStyles = `
  jn-flex
  jn-bg-theme-global-bg
  jn-gap-6
  jn-px-6
  jn-py-1.5
`

export const NavigationContext = createContext()

/**
A generic horizontal top level navigation component. To be placed below the application header but above application content.
Place `TopNavigationItem` elements as children.
*/
export const TopNavigation = ({
  activeItem,
  ariaLabel,
  children,
  className,
  disabled,
  onActiveItemChange,
  ...props
}) => {
  
  const [activeItm, setActiveItm] = useState("")
  
  useEffect(() => {
    if (activeItem) {
      setActiveItm(activeItem)
    }
  }, [activeItem])
  
  const updateActiveItem = (label) => {
    setActiveItm(label)
  }
    
  const handleActiveItemChange = (label) => {
    setActiveItm(label)
    onActiveItemChange && onActiveItemChange(label)
  }
  
  return (
    <NavigationContext.Provider
    value={{
      activeItem: activeItm,
      updateActiveItem: updateActiveItem,
      handleActiveItemChange: handleActiveItemChange,
      disabled: disabled,
    }}>
      <ul 
        className={`
          juno-topnavigation 
          ${topNavigationStyles} 
          ${className}`
        } 
        role="navigation"
        aria-label={ariaLabel}
        {...props} 
      >
        { children }
      </ul>
    </NavigationContext.Provider>
  )
}

TopNavigation.propTypes = {
  /** The active navigation item by label */
  activeItem: PropTypes.string,
  /** The aria-label of the navigation. Specify when there are more than one elements with an implicit or explicit `role="navigation"` on a page/view. */
  ariaLabel: PropTypes.string,
  /** The children of the Navigation. Typically these should be TopNavigationItem(s) */
  children: PropTypes.node,
  /** Pass a custom classname. */
  className: PropTypes.string,
  /** Whether the navigation is disabled */
  disabled: PropTypes.bool,
  /** Handler to execute when the active item changes */
  onActiveItemChange: PropTypes.func,
}

TopNavigation.defaultProps = {
  activeItem: "",
  ariaLabel: undefined,
  children: null,
  className: "",
  disabled: false,
  onActiveItemChange: undefined,
}