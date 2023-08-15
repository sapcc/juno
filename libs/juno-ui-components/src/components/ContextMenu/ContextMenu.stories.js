import React from "react"
import { ContextMenu } from "./index.js"
import { MenuItem } from "../MenuItem/"
import { Button } from "../Button/index.js"
import { Default as MenuItemDefaultStory } from "../MenuItem/MenuItem.stories"
import { PortalProvider } from "../PortalProvider/PortalProvider.component.js"


export default {
  title: "WiP/ContextMenu/ContextMenu",
  component: ContextMenu,
  argTypes: {},
}

const Template = ({ children, ...args }) => (
  <ContextMenu {...args}>
    { children }
  </ContextMenu>
)

const PortalTemplate = ({ children, ...args }) => (
  <PortalProvider>
    <PortalProvider.Portal>
      <ContextMenu {...args}>
        { children }
      </ContextMenu>
    </PortalProvider.Portal>
  </PortalProvider>
)

export const Default = Template.bind({})
Default.args = {
  children: [
    <MenuItem key="1" label="Juno on Github" href="https://github.com/sapcc/juno"/>,
    <MenuItem key="2" label="This item does nothing" />,
    <MenuItem key="3" label="Disabled Item" disabled />,
    <MenuItem key="4" >
        <Button
        key={0}
        label="Button as Child of MenuItem"
        variant="subdued"
        size="small"
        className="jn-w-full"
      />
    </MenuItem>
  ],
}

export const InsidePortal = PortalTemplate.bind({})
InsidePortal.args = {
  children: [
    <MenuItem key="1" label="Juno on Github" href="https://github.com/sapcc/juno"/>,
    <MenuItem key="2" label="This item does nothing" />,
    <MenuItem key="3" label="Disabled Item" disabled />,
    <MenuItem key="4" >
        <Button
        key={0}
        label="Button as Child of MenuItem"
        variant="subdued"
        size="small"
        className="jn-w-full"
      />
    </MenuItem>
  ]
}
