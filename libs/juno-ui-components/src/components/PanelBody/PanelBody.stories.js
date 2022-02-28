import React from "react"

import { PanelBody } from "./index.js"
import { ContentAreaWrapper } from "../ContentAreaWrapper/index.js"
import { ContentArea } from "../ContentArea/index.js"
import { Panel } from "../Panel/index.js"

export default {
  title: "Design System/Layout/PanelBody",
  component: PanelBody,
  argTypes: {},
}

const Template = (args) => 
  <ContentAreaWrapper>
    <Panel heading="My Panel" opened>
      <PanelBody {...args}>This is the panel body</PanelBody>
    </Panel>
    <ContentArea className="dummy-css-ignore h-[150px]">
      Content Area
    </ContentArea>
  </ContentAreaWrapper>

export const Body = Template.bind({})
Body.parameters = {
  docs: {
    description: {
      story:
        "A container for panel content.",
    },
  },
}
Body.args = {}
