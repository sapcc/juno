import React from "react"
import GlobalStyles from "/src/lib/styling/GlobalStyles"
import { useDarkMode } from 'storybook-dark-mode'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: { disable: true },
  darkMode: {
    stylePreview: true
  }
}


export const decorators = [
  (Story) => {
    const mode = useDarkMode() ? 'theme-dark' : 'theme-light'
    
    return (
      <div className={mode}>
        <GlobalStyles />
        <Story />
      </div>
    )
  },
]
