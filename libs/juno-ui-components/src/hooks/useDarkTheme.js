import React, { useState, useEffect } from 'react'

/* A React hook to detect user UI dark theme setting and detect when it changes.
 * From Kacper Kula: https://medium.com/hypersphere-codes/detecting-system-theme-in-javascript-css-react-f6b961916d48
 * Using this hook, any component can test wether the user is currently using dark theme on their system:
 *
 * const MyComponent = () => {
 *  const isDarkTheme = useDarkTheme()
 *  return (
 *   <p>{ isDarkTheme ? "Dark" : "Light" } Theme</p>
 *  )
 * }
*/


export const useDarkTheme = () => {
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