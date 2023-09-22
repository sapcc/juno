import React from "react"
import { AppShellProvider } from "."
import { CodeBlock } from "../CodeBlock/index.js"
import { Message } from "../Message"

export default {
  title: "Layout/AppShellProvider",
  component: AppShellProvider,
  argTypes: {
    children: {
      control: false
    },
  },
}

const Template = (args) => (
  <AppShellProvider {...args}>{args.children}</AppShellProvider>
)

/** By default the app is rendered inside of a ShadowRoot */
export const Default = Template.bind({})
Default.args = {
  children: [
    <Message key={0}>Juno styles are added inline</Message>,
    <CodeBlock key={1}>
      {`
export default (props) => {
  return (
    <AppShellProvider>
      <style>{/* app styles */}</style>
      <App {...props} />
    </AppShellProvider>
  )
}`}
    </CodeBlock>,
  ],
}

export const NoShadowRoot = Template.bind({})
NoShadowRoot.args = {
  shadowRoot: false,
  children: [
    <Message key={0}>
      No ShadowRoot, but the styles are still inline (default)
    </Message>,
    <CodeBlock key={1}>
      {`
export default (props) => {
  return (
    <AppShellProvider shadowRoot={false}>
      <style>{/* app styles */}</style>
      <App {...props} />
    </AppShellProvider>
  )
}`}
    </CodeBlock>,
  ],
}

export const StylesInHead = Template.bind({})
StylesInHead.args = {
  shadowRoot: false,
  stylesWrapper: "head",
  children: [
    <Message key={0}>Juno styles are added to the head tag</Message>,
    <CodeBlock key={1}>
      {`
export default (props) => {
  return (
    <AppShellProvider shadowRoot={false} stylesWrapper="head">
      <style>{/* app styles */}</style>
      <App {...props} />
    </AppShellProvider>
  )
}`}
    </CodeBlock>,
  ],
}

export const StylesInline = Template.bind({})
StylesInline.args = {
  shadowRoot: false,
  stylesWrapper: "inline",
  children: [
    <Message key={0}>Juno style are added inline</Message>,
    <CodeBlock key={1}>
      {`
export default (props) => {
  return (
    <AppShellProvider shadowRoot={false} stylesWrapper="inline">
      <style>{/* app styles */}</style>
      <App {...props} />
    </AppShellProvider>
  )
}`}
    </CodeBlock>,
  ],
}

export const ThemeLight = Template.bind({})
ThemeLight.args = {
  theme: "theme-light",
  children: [
    <Message key={0}>Light Theme</Message>,
    <CodeBlock key={1}>{`
<AppShellProvider theme="theme-light">
  <style>{/* app styles */}</style>
  <App>
    {/* App Body */}
  </App>
</AppShellProvider>`}</CodeBlock>,
  ],
}
