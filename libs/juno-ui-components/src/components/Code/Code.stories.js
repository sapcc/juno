import React from "react"

import { Code } from "./index.js"

export default {
  title: "Components/Code",
  component: Code,
  argTypes: {
    children: {
      control: false
    },
  },
}

const Template = (args) => <Code {...args} />

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: {
      story: "Default inline code",
    },
  },
}
Default.args = {
  content: "<span>Some code passed as content prop.</span>"
}

export const WithChildren = Template.bind({})
WithChildren.parameters = {
  docs: {
    description: {
      story: "Inline code with children"
    }
  }
}
WithChildren.args = {
  children: "<Code>Some code with children</Code>"
}