import { useDarkMode } from "storybook-dark-mode"
import { DocsContainer } from "./components/DocsContainer"
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
  Stories,
} from '@storybook/addon-docs/blocks';
import React from "react"
import "../src/global.scss"
import { StyleProvider } from "../src/components/StyleProvider"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: { disable: true },
  darkMode: {
    stylePreview: true,
    darkClass: "theme-dark",
    lightClass: "theme-light",
  },
  docs: {
    container: DocsContainer,
    /**
     * We're using a custom docs page setup here at the moment because by default the storybook docspage renders the first
     * story from the stories file as a special "primary" story that is adjustable with the args table but it does not
     * include the primary story below with the list of other stories. This leads to the description for the primary
     * story not being displayed anywhere on the docspage which is annoying. Therefore I've adjusted the default Docs Page
     * to include the primary story with the story list. There's an open issue that might fix this issue and render the 
     * need for a custom page obsolete: https://github.com/storybookjs/storybook/issues/8093
     * 
     * Also there's still an open issue regarding the descriptions of stories. Ideally it would be possible to write standard
     * jsdoc descriptions for stories but currently this doesn't work. Instead you have to pass the description as a parameter.
     * This issue is here: https://github.com/storybookjs/storybook/issues/8527
     */
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Description />
        <Primary />
        <ArgsTable story={PRIMARY_STORY} />
        <Stories includePrimary={true} title='' />
      </>
    ),
  },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => {
    const mode = useDarkMode() ? "theme-dark" : "theme-light"

    return (
      <StyleProvider stylesWrapper="head" theme={mode}>
        <Story />
      </StyleProvider>
    )
  },
]
