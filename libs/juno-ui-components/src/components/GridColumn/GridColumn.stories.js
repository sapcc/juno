import React from "react"
import { GridColumn } from "./index.js"

export default {
  title: "Layout/Grid/GridColumn",
  component: GridColumn,
  argTypes: {
    children: {
      control: false
    },
  },
  decorators: [
    (Story) => (
      <Story className="jn-bg-juno-blue-3 jn-text-juno-grey-blue" />
    ),
  ],
}

// for the decorator to work like this (passing props to the story) we have to access the passed props from the decorator
// from the context. This might be storybook 6.x-specific. Double check when we upgrade to storybook 7.x
const Template = (args, context) => (
  <GridColumn
    {...args}
    className={context.className}
  ></GridColumn>
)

export const Default = Template.bind({})
Default.args = {
  children: "Column",
}

export const AutoColumn = Template.bind({})
AutoColumn.args = {
  auto: true,
  children: "Auto Column",
}

export const WidthColumn = Template.bind({})
WidthColumn.args = {
  width: 50,
  children: "Column 50%",
}
