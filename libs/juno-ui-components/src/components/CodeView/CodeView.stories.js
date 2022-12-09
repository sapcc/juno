import React from "react"
import { CodeView } from "./index.js"
import { CodeBlock } from "../CodeBlock/index.js"
import { Default as DefaultCodeBlockStory } from "../CodeBlock/CodeBlock.stories.js"
import { WithChildren as WithChildrenCodeBlockStory } from "../CodeBlock/CodeBlock.stories.js"

export default {
  title: "Components/CodeView",
  component: CodeView,
  argTypes: {},
}

const Template = (args) => <CodeView {...args} />

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: {
      story: "Default code View",
    },
  },
}
Default.args = {
  content: "Simple code view"
}

