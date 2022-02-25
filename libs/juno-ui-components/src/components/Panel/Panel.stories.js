import React from "react"
import { Panel } from "./index.js"
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
      Panel Content
    </Panel>
    <ContentArea className="dummy-css-ignore h-[150px]">
      Content Area
    </ContentArea>
  </ContentAreaWrapper>


export const WithHeading = Template.bind({})
WithHeading.args = {
  heading: "Panel Heading",
  opened: true
}

export const Plain = Template.bind({})
Plain.args = {
  opened: true
}

