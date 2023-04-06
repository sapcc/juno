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
    {children.map((item, i) => (
      <MenuItem {...item} key={i} />
    ))}
  </ContextMenu>
)

const PortalTemplate = ({ children, ...args }) => (
  <PortalProvider>
    <PortalProvider.Portal>
      <ContextMenu {...args}>
        {children.map((item, i) => (
          <MenuItem {...item} key={i} />
        ))}
      </ContextMenu>
    </PortalProvider.Portal>
  </PortalProvider>
)

export const Default = Template.bind({})
Default.args = {
  children: [
    {
      ...MenuItemDefaultStory.args,
      label: "Juno on Github",
      href: "https://github.com/sapcc/juno",
    },
    { ...MenuItemDefaultStory.args, label: "Item 2" },
    {
      ...MenuItemDefaultStory.args,
      label: "Item 3",
      icon: "deleteForever",
    },
    {
      ...MenuItemDefaultStory.args,
      label: null,
      children: [
        <Button
          key={0}
          label="Child"
          variant="subdued"
          size="small"
          className="jn-w-full"
        />,
      ],
    },
  ],
}

export const InsidePortal = PortalTemplate.bind({})
InsidePortal.args = {
  children: [
    {
      ...MenuItemDefaultStory.args,
      label: "Juno on Github",
      href: "https://github.com/sapcc/juno",
    },
    { ...MenuItemDefaultStory.args, label: "Item 2" },
    {
      ...MenuItemDefaultStory.args,
      label: "Item 3",
      icon: "deleteForever",
    },
    {
      ...MenuItemDefaultStory.args,
      label: null,
      children: [
        <Button
          key={0}
          label="Child"
          variant="subdued"
          size="small"
          className="jn-w-full"
        />,
      ],
    },
  ],
}
