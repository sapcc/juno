import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "../Icon/index.js";
import { useThemeDetector } from '../../hooks/useThemeDetector'

const togglestyles = `
`

/** A Toggle to switch between Light and Dark UI themes.
* Pass `theme="auto"` to auto-detect and apply current system/user agent theme. The current theme will be written to `localStorage.currentTheme`.
*/
export const ThemeToggle = ({
  theme,
  className,
  ...props
}) => {
  const [currentTheme, setCurrentTheme] = useState(undefined)
  
  let theTheme = ""
  
  switch (theme) {
    case "auto":
      theTheme = useThemeDetector() ? "dark" : "light"
    case "light":
      theTheme = "light"
    case "dark": 
      theTheme = "dark"
    default:
      const storedTheme = localStorage.getItem("currentTheme")
      storedTheme ? theTheme = storedTheme : "dark"
  }
  
  React.useEffect(() => {
    setCurrentTheme(theTheme)
  }, [theTheme])
  
  const handleThemeToggleClick = () => {
    if (currentTheme === "dark") {
      setCurrentTheme("light")
      localStorage.setItem("currentTheme", "light")
    } else {
      setCurrentTheme("dark")
      localStorage.setItem("currentTheme", "dark")
    }
    window.dispatchEvent(new Event('storage'))
  }
  
  const titleText = () => {
    if (currentTheme === "dark") {
      return "Change theme to Light mode"
    } else {
      return "Change theme to Dark mode"
    }
  }
  
  return (
    <Icon icon={`${currentTheme === "dark" ? "lightMode" : "darkMode" }`} onClick={handleThemeToggleClick} title={titleText()} className={`juno-theme-toggle ${togglestyles} ${className}`}/>
  )
}

ThemeToggle.propTypes = {
  /** The theme to show, either 'dark' or 'light'. */
  theme: PropTypes.oneOf(["auto", "dark", "light"]),
  /** Pass custom className */
  className: PropTypes.string,
}

ThemeToggle.defaultProps = {
  theme: "dark",
  className: "",
}