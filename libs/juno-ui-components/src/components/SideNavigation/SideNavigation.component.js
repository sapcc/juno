/*
 * SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Juno contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const sideNavStyles = `
  jn-min-w-[7.5rem]
  jn-max-w-[20rem]
`

export const NavigationContext = createContext()

/**
A generic vertical side navigation component.
Place SideNavigationItem components as children.
*/
export const SideNavigation = ({
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
          juno-sidenavigation 
          ${sideNavStyles} 
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

SideNavigation.propTypes = {
  /** The active navigation item by label */
  activeItem: PropTypes.string,
  /** The aria-label of the navigation. Specify when there are more than one elements with an implicit or explicit `role="navigation"` on a page/view. */
  ariaLabel: PropTypes.string,
  /** The children of the Navigation. Typically these should be SideNavigationItem(s) */
  children: PropTypes.node,
  /** Pass custom classname. */
  className: PropTypes.string,
  /** Whether the navigation is disabled */
  disabled: PropTypes.bool,
  /** Handler to execute when the active item changes */
  onActiveItemChange: PropTypes.func,
}

SideNavigation.defaultProps = {
  activeItem: "",
  ariaLabel: undefined,
  children: null,
  className: "",
  disabled: false,
  onActiveItemChange: undefined,
}