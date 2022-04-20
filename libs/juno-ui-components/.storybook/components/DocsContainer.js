import React from "react"
import { DocsContainer as BaseContainer } from "@storybook/addon-docs"
import { useDarkMode } from "storybook-dark-mode"
import { themes } from "@storybook/theming"

export const DocsContainer = ({ children, context }) => {
  const dark = useDarkMode()

  // DocsContainer dark mode magic from here: https://github.com/hipstersmoothie/storybook-dark-mode/issues/127#issuecomment-983056445
  // without this hack, the docs container theme will always be the light theme, even if dark mode is active
  return (
    <BaseContainer
      context={{
        ...context,
        storyById: (id) => {
          const storyContext = context.storyById(id)
          return {
            ...storyContext,
            parameters: {
              ...storyContext?.parameters,
              docs: {
                ...storyContext?.parameters?.docs,
                // magic happens here. Without this the docs container won't heed the theme set via storybook-dark-mode addon
                theme: dark ? themes.dark : themes.light,
              },
            },
          }
        },
      }}
    >
      {children}
    </BaseContainer>
  )
}
