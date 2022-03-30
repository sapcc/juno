import React from "react"
import { Form } from "./index.js"
import { TextInputRow } from "../TextInputRow/index.js"
import { Default as DefaultTextInputRowStory } from "../TextInputRow/TextInputRow.stories"

export default {
  title: "Forms/Form",
  component: Form,
  argTypes: {},
}

const Template = ({ items, ...args }) => (
  <Form {...args}>
    {items.map((item, i) => (
      <TextInputRow {...item} key={`input-${i}`} />
    ))}
  </Form>
)

export const Default = Template.bind({})
Default.args = {
  items: [
    { ...DefaultTextInputRowStory.args, label: "First Name", id: "d-1" },
    { ...DefaultTextInputRowStory.args, label: "Last Name", id: "d-2" },
  ],
}

export const WithTitle = Template.bind({})
WithTitle.args = {
  title: "Form With A Title",
  items: [
    { ...DefaultTextInputRowStory.args, label: "First Name", id: "wt-1" },
    { ...DefaultTextInputRowStory.args, label: "Last Name", id: "wt-2" },
  ],
}
