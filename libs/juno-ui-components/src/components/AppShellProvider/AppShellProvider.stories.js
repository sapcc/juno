import React from "react"
import { AppShellProvider } from "."
import { CodeBlock } from "../CodeBlock/index.js"
import { Message } from "../Message"

export default {
  title: "Layout/AppShellProvider",
  component: AppShellProvider,
  argTypes: {},
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
<ShadowRoot>
  <StyleProvider>
    <style>{/* styles */}</style>
    <PortalProvider>
      {/* App */}
    </PortalProvider>
  </StyleProvider>
</ShadowRoot>`}
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
<StyleProvider>
  <style>{/* styles */}</style>
  <PortalProvider>
    {/* App */}
  </PortalProvider>
</StyleProvider>`}
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
<StyleProvider>
  <PortalProvider>
    {/* App */}
  </PortalProvider>
</StyleProvider>`}
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
<StyleProvider>
  <style>{/* styles */}</style>
  <PortalProvider>
    {/* App */}
  </PortalProvider>
</StyleProvider>`}
    </CodeBlock>,
  ],
}
