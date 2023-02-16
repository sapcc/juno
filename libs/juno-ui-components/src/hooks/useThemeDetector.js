import React, { useState, useEffect } from 'react'

/* Hook to detect user UI theme setting and to detect when it changes.
 * From Kacper Kula: https://medium.com/hypersphere-codes/detecting-system-theme-in-javascript-css-react-f6b961916d48
 * Using this hook, any component can test wether the user is currently using dark theme:
 *
 * const MyComponent = () => {
 *  const isDarkTheme = useThemeDetector()
 *  return (
 *   <p>{ isDarkTheme ? "Dark" : "Light" } Theme</p>
 *  )
 * }
*/


export const useThemeDetector = () => {
  const getUserTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches
  const [ isDarkTheme, setIsDarkTheme ] = useState(getUserTheme())
  const mqListener = (e) => {
    setIsDarkTheme(e.matches)
  }
  
  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)")
    darkThemeMq.addListener(mqListener)
    return () => darkThemeMq.removeListener(mqListener)
  }, [])
  
  return isDarkTheme
  
}
