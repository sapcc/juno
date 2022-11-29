import React, { useState, useEffect } from 'react';
import { ThemeToggle } from './index.js';
import { StyleProvider } from "../StyleProvider/index"
import useTheme from "../../hooks/useTheme.js"

export default {
  title: 'WiP/ThemeToggle',
  component: ThemeToggle,
  argTypes: {},
};

const customContainerStyles = `
  jn-p-10
  jn-text-center
`

const Template = (args) => <ThemeToggle {...args} />

const CustomTemplate = ({theme, ...args}) => {
  const [ theTheme, setTheTheme ] = useState(theme)
  
  useEffect(() => {
    setTheTheme(theme)
  }, [theme])
  
  const handleClick = () => {
    theTheme === "light" ? setTheTheme("dark") : setTheTheme("light")
  }
  
  return (
    <div className={"custom-container theme-" + (theTheme || "dark") + customContainerStyles }>
      <ThemeToggle  theme={theTheme} onClick={handleClick} />
    </div>
  )
}


const HookTemplate = ({theme, ...args}) => {
  const [currentTheme, toggleCurrentTheme] = useTheme("auto")
  return (
    <div className={"custom-container theme-" + currentTheme + customContainerStyles}>
      <ThemeToggle theme={currentTheme} onClick={toggleCurrentTheme} />
    </div>
  )
}

const StyleProviderTemplate = ({theme, ...args}) => {
  return (
    <StyleProvider>
      <div className={`${customContainerStyles}`} >
        <ThemeToggle />
      </div>
    </StyleProvider>
  )
}

export const Default = Template.bind({})
Default.args = {}
Default.parameters = {
  docs: {
    description: {
      story: "A sole ThemeToggle will default to showing it's 'dark' state and otherwise won't do much."
    },
  },
}


export const WithCustomContainer = CustomTemplate.bind({});
WithCustomContainer.args = {}
WithCustomContainer.parameters = {
  docs: {
    description: {
      story: "A `<ThemeToggle/>` component inside a custom container you manage yourself. You will have to take care of handling theme state, and pass the current theme as well as a method to toggle the theme to `<ThemeToggle/>`."
    },
    source: {
      code: 'const MyApp({ theme, ...props }) => {\n  const [ theTheme, setTheTheme ] = useState(theme)\n\n  useEffect(() => {\n    setTheTheme(theme)\n  ), [theme]}\n\n  const handleClick() => {\n    theTheme === "light" ? setTheTheme("dark") : setTheTheme("light")  \n  }\n\n  <ThemeToggle theme={theTheme} onClick={handleClick}/>\n}',
      language: "jsx",
      type: "code",
    }
  }
}

export const WithHookInCustomContainer = HookTemplate.bind({})
WithHookInCustomContainer.args = {}
WithHookInCustomContainer.parameters = {
  docs: {
    description: {
      story: "A `<ThemeToggle/>` component inside a custom container that use the `useTheme` hook from Juno. This hook provides acces to `currentTheme` and a `toggleTheme` method. This hook will also store the currently selected theme in localStorage so it will persist across reloads. It can also be used to apply the current user system stetting when passed `theme={'auto'}`."
    },
    source: {
      code: 'import useTheme from "juno-ui-components"\n\n const MyApp({ theme, ...props }) => {\n  const [ currentTheme, toggleCurrentTheme ] = useTheme("auto")\n\n  <div className={"container theme-" + currentTheme}\n    <ThemeToggle theme={currentTheme} onClick={toggleCurrentTheme} />\n  </div>\n\n}',
      language: "jsx",
      type: "code",
    }
  }
}

export const WithStyleProvider = StyleProviderTemplate.bind({})
WithStyleProvider.storyName = "WIP: With StyleProvider (Recommended)"
WithStyleProvider.args = {}
WithStyleProvider.parameters = {
  docs: {
    description: {
      story: "WIP, not implemented yet"
    },
    source: {
      code: 'import { StyleProvider } from "juno-ui-components"\n\n  <StyleProvider theme={"auto"} >\n    <ThemeToggle />\n  </StyleProvider>',
      language: "jsx",
      type: "code",
    }
  },
}

