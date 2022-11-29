import { useEffect, useState } from "react"
import useDarkTheme from "./useDarkTheme"

/**
Juno Theming hook.
Can be used globally in an App, or inside a StyleProvider. All children can use currentTheme and toggleTheme as provided by this hook.
*/
export default function useTheme(theme) {
  
  const DEFAULT_THEME = "dark"
  const storedTheme = window.localStorage.getItem("juno-theme")
  let initialTheme = ""
  
  if (theme) {
    if (theme === "auto") {
      try {
        initialTheme = useDarkTheme() ? "dark" : "light" 
      } catch (error) {
        console.warn("Could not establish user-preferred color scheme, defaulting.", error)
        initialTheme = DEFAULT_THEME
      }
    } else {
      initialTheme = theme
    }
  } else {
    initialTheme = DEFAULT_THEME
  }
  
  // Init state with stored or established theme. Use hook directly with state initialization to bind state and hook together?
  const [ currentTheme, setCurrentTheme ] = useState( storedTheme || initialTheme )
  
  const setLocalTheme = (theme) => {
    try {
      window.localStorage.setItem("juno-theme", theme)
      //window.dispatchEvent(new Event("storage"))
    } catch (error) {
      console.warn("Could not write juno-theme to local storage", error)
    }
  }
  
  const localTheme = window.localStorage.getItem("juno-theme")
  !localTheme && setLocalTheme( (storedTheme || initialTheme) )
  
  const toggleTheme = () => {
    const newTheme = ( currentTheme === "dark" ? "light" : "dark" )
    setCurrentTheme(newTheme)
    setLocalTheme(newTheme)
  }
  
  return [currentTheme, toggleTheme];
  
}