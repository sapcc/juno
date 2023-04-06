import React from "react"
import { AppShellProvider } from "."
import { Code } from "../Code/index.js"
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
    <Message>Juno styles are added inline</Message>,
    <Code>
      {`
<ShadowRoot>
  <StyleProvider>
    <style>{/* styles */}</style>
    <PortalProvider>
      {/* App */}
    </PortalProvider>
  </StyleProvider>
</ShadowRoot>`}
    </Code>,
  ],
}

export const NoShadowRoot = Template.bind({})
NoShadowRoot.args = {
  shadowRoot: false,
  children: [
    <Message>No ShadowRoot, but the styles are still inline (default)</Message>,
    <Code>
      {`
<StyleProvider>
  <style>{/* styles */}</style>
  <PortalProvider>
    {/* App */}
  </PortalProvider>
</StyleProvider>`}
    </Code>,
  ],
}

export const StylesInHead = Template.bind({})
StylesInHead.args = {
  shadowRoot: false,
  stylesWrapper: "head",
  children: [
    <Message>Juno styles are added to the head tag</Message>,
    <Code>
      {`
<StyleProvider>
  <PortalProvider>
    {/* App */}
  </PortalProvider>
</StyleProvider>`}
    </Code>,
  ],
}

export const StylesInline = Template.bind({})
StylesInline.args = {
  shadowRoot: false,
  stylesWrapper: "inline",
  children: [
    <Message>Juno style are added inline</Message>,
    <Code>
      {`
<StyleProvider>
  <style>{/* styles */}</style>
  <PortalProvider>
    {/* App */}
  </PortalProvider>
</StyleProvider>`}
    </Code>,
  ],
}
