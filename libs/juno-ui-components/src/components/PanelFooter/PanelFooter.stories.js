import React from "react"

import { PanelFooter } from "./index.js"
import { ContentAreaWrapper } from "../ContentAreaWrapper/index.js"
import { ContentArea } from "../ContentArea/index.js"
import { Button } from "../Button/index.js"
import { Panel } from "../Panel/index.js"
import { PanelBody } from "../PanelBody/index.js"

export default {
  title: "Design System/Layout/PanelFooter",
  component: PanelFooter,
  argTypes: {},
}

const Template = (args) => (
  <ContentAreaWrapper>
    <Panel heading="My Panel" opened>
      <PanelBody>This is the panel body</PanelBody>
      <PanelFooter {...args}>
        <Button>Do it</Button>
      </PanelFooter>
    </Panel>
    <ContentArea className="dummy-css-ignore h-[250px]">
      Content Area
    </ContentArea>
  </ContentAreaWrapper>
)

export const Footer = Template.bind({})
Footer.parameters = {
  docs: {
    description: {
      story: "A container for panel footer elements, typically buttons.",
    },
  },
}
Footer.args = {}
