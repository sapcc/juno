import React from "react"
import { Panel } from "./index.js"
import { PanelBody } from "../PanelBody/index.js"
import { ContentAreaWrapper } from "../ContentAreaWrapper/index.js"
import { ContentArea } from "../ContentArea/index.js"


export default {
  title: "Design System/Layout/Panel",
  component: Panel,
  argTypes: {},
}

const Template = (args) => 
  <ContentAreaWrapper>
    <Panel {...args}>
      <PanelBody>Panel Body Content</PanelBody>
    </Panel>
    <ContentArea className="dummy-css-ignore h-[150px]">
      Content Area
    </ContentArea>
  </ContentAreaWrapper>


export const WithHeading = Template.bind({})
WithHeading.parameters = {
  docs: {
    description: { story: 'The panel component slides into view from the right. It is to be used as a drawer containing forms for actions on the current view, like "new item" etc. Panels should have a heading.'}
  },
}
WithHeading.args = {
  heading: "Panel Heading",
  opened: true
}

export const Plain = Template.bind({})
Plain.args = {
  opened: true
}

