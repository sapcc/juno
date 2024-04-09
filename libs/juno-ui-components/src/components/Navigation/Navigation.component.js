import React, { createContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { NavigationItem } from "../NavigationItem/"

export const NavigationContext = createContext()

/** A generic Navigation component. For internal use only  – not to be used directly, but to be wrapped by more role-specific navigation components such as TabNavigation, TopNavigation, SideNavigation. */
export const Navigation = ({
  activeItem,
  ariaLabel,
  children,
  className,
  disabled,
  role,
  onActiveItemChange,
  onChange,
  wrapperClassName,
  ...props
}) => {
  const [activeItm, setActiveItm] = useState("")
  const [items, setItems] = useState(new Map())

  useEffect(() => {
    if (activeItem) {
      setActiveItm(activeItem)
    }
  }, [activeItem])

  const addItem = (key, children, label, value) => {
    setItems((oldMap) =>
      new Map(oldMap).set(key, {
        value: value,
        label: label,
        children: children,
        displayName: children || label || value,
      })
    )
  }

  console.log("items: ", items)

  const handleActiveItemChange = (key) => {
    setActiveItm(key)
    onActiveItemChange && onActiveItemChange(key)
  }

  return (
    <NavigationContext.Provider
      value={{
        activeItem: activeItm,
        addItem: addItem,
        handleActiveItemChange: handleActiveItemChange,
        navigationDisabled: disabled,
        navigationRole: role,
      }}
    >
      <div className={wrapperClassName}>
        <ul
          aria-label={ariaLabel && ariaLabel.length ? ariaLabel : null}
          className={`juno-navigation juno-${role.toLowerCase()} ${
            disabled ? "juno-navigation-disabled" : ""
          } ${className}`}
        >
          {children}
        </ul>
      </div>
    </NavigationContext.Provider>
  )
}

// TODO: validate whether children are instances of NavigationItem
Navigation.propTypes = {
  activeItem: PropTypes.string,
  arialLabel: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  role: PropTypes.oneOf(["SideNavigation", "TabNavigation", "TopNavigation"]),
  onActiveItemChange: PropTypes.func,
  onChange: PropTypes.func,
  wrapperClassName: PropTypes.string,
}

Navigation.defaultProps = {
  activeItem: "",
  ariaLabel: "",
  children: null,
  className: "",
  disabled: false,
  role: "TabNavigation",
  onActiveItemChange: undefined,
  onChange: undefined,
  wrapperClassName: "",
}
