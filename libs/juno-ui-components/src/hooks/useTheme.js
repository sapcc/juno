import { useEffect, useState } from "react"
import useLocalStorageState from 'use-local-storage-state'
import useDarkTheme from "./useDarkTheme"

/**
Juno Theming hook.
Can be used globally in an App, or inside a StyleProvider. All children can use currentTheme and toggleTheme as provided by this hook.
*/
export default function useTheme(theme) {
  
  const DEFAULT_THEME = "dark"
  const initialTheme = theme || DEFAULT_THEME
  // let initialTheme = ""
  // 
  // if (theme) {
  //   if (theme === "auto") {
  //     initialTheme = useDarkTheme() ? "dark" : "light" // TODO: error handling in case hook fails
  //   } else {
  //     initialTheme = theme
  //   }
  // } else {
  //   initialTheme = DEFAULT_THEME
  // }
  
  const [currentTheme, setCurrentTheme] = useLocalStorageState("currentTheme", initialTheme)
  
  // Do we have to set useEffect ourselves or is this done by useLocalStorageState?
  
  const toggleTheme = () => {
    if (currentTheme === "dark") {
      setCurrentTheme("light")
    } else {
      setCurrentTheme("dark")
    }
  }
  
  return [currentTheme, toggleTheme];
  
}