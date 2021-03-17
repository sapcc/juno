import React from "react"
import { GlobalStyles, theme } from "twin.macro"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  (Story) => (
    <div>
      {/* */}
      <GlobalStyles />
      <Story />
    </div>
  ),
]
