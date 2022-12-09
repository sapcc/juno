import React from "react"
import { CodeBlock } from "./index.js"

export default {
  title: "Components/CodeBlock",
  component: CodeBlock,
  argTypes: {
    size: {
      options: ["auto", "small", "medium", "large"],
      control: {type: "select"}
    }
  },
}

const Template = (args) => <CodeBlock {...args} />

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: {
      story: "Default code block",
    },
  },
}
Default.args = {
  content: "Some code goes here"
}

export const WithChildren = Template.bind({})
WithChildren.parameters = {
  docs: {
    description: {
      story: "Code Block with children",
    },
  },
}
WithChildren.args = {
  lang: "html",
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

