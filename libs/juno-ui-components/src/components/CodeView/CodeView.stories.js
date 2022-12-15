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

export const SimpleWithChildren = Template.bind({})
SimpleWithChildren.parameters = {
  docs: {
    description: {
      story: "Simple CodeView with children"
    }
  }
}
SimpleWithChildren.args = {
  children: `<html lang="en">
    <head>
      <title="Multi-line Html" />
    </head>
      <body>
        <main>
        </main>
      </body>
  </html>`
}
