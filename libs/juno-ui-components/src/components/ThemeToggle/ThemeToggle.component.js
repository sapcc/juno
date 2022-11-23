import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "../Icon/index.js";

/**
*  A Toggle to switch between Light and Dark UI themes. The ThemeToggle relies on a `theme` and an onClick handler to toggle the theme to be passed as a prop. There are several ways to approach this as described below.
*/

export const ThemeToggle = ({
  theme,
  className,
  onClick,
  ...props
}) => {
  
  const handleClick = (event) => {
    onClick && onClick(event)
  }
  
  return (
    <Icon 
      icon={`${theme === "dark" ? "lightMode" : "darkMode" }`}
      className={`juno-theme-toggle ${className}`} 
      onClick={handleClick} 
      {...props}
    />
  )
}

ThemeToggle.propTypes = {
  /** The current theme */
  theme: PropTypes.oneOf(["light", "dark"]),
  /** Pass a click handler that takes care of the actual toggling of the theme */
  onClick: PropTypes.func,
  /** Pass a custom className */
  className: PropTypes.string,
}

ThemeToggle.defaultProps = {
  theme: "dark",
  onClick: undefined,
  className: "",
}