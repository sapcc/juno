import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "../Icon/index.js";

const togglestyles = `
`

/** A Toggle to switch between Light and Dark UI themes */
export const ThemeToggle = ({
  theme,
  className,
  ...props
}) => {
  const [currentTheme, setCurrentTheme] = useState(null)
  
  React.useEffect(() => {
    setCurrentTheme(theme)
  }, [theme])
  
  const toggleTheme = () => {
    if (currentTheme === "dark") {
      setCurrentTheme("light")
    } else {
      setCurrentTheme("dark")
    }
  }
  
  const titleText = () => {
    if (currentTheme === "dark") {
      return "Change theme to Light mode"
    } else {
      return "Change theme to Dark mode"
    }
  }
  
  return (
    <Icon icon={`${currentTheme}Mode`} onClick={toggleTheme} title={titleText()} className={`juno-theme-toggle ${togglestyles} ${className}`}/>
  )
}

ThemeToggle.propTypes = {
  /** The theme to show, either 'dark' or 'light'. */
  theme: PropTypes.oneOf(["dark", "light"]),
  /** Pass custom className */
  className: PropTypes.string,
}

ThemeToggle.defaultProps = {
  theme: "dark",
  className: "",
}