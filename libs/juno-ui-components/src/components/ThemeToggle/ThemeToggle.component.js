import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "../Icon/index.js";


export const ThemeToggle = ({
  theme,
  className,
  ...props
}) => {
  
  const handleClick = (event) => {
    console.log(event)
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
  theme: PropTypes.oneOf(["light", "dark"]),
  className: PropTypes.string,
}

ThemeToggle.defaultProps = {
  theme: "dark",
  className: "",
}