import React from "react"
import { ButtonRow } from "./index.js"
import { Button } from "../Button/index.js"
// import Button stories:
import { Default as ButtonStory } from "../Button/Button.stories"

export default {
  title: "Forms/ButtonRow",
  component: ButtonRow,
  argTypes: {
    items: {
      table: {
        disable: true
      }
    },
    children: {
      control: false
    },
  }
}

const Template = ({ items, ...args }) => (
  <ButtonRow {...args}>
    {items.map((item, i) => (
      <Button {...item} key={`${i}`} />
    ))}
  </ButtonRow>
)

export const Default = Template.bind({})
Default.args = {
  name: "Default ButtonRow",
  items: [
    {
      ...ButtonStory.args,
      label: "Cancel",
      title: "Cancel whatever you're doing",
    },
    {
      ...ButtonStory.args,
      label: "Save",
      title: "Save whatever you've been doing",
      variant: "primary",
    },
  ],
}
