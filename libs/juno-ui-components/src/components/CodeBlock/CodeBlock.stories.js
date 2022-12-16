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

export const DefaultWithChildren = Template.bind({})
DefaultWithChildren.parameters = {
  docs: {
    description: {
      story: "Code Block with children",
    },
  },
}
DefaultWithChildren.args = {
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

export const DefaultWithHeading = Template.bind({})
DefaultWithHeading.parameters = {
  docs: {
    description: {
      story: "Code Block with Heading"
    }
  }
}
DefaultWithHeading.args = {
  children: `<CodeBlock>"<p>some code here</p></CodeBlock>`,
  title: "CodeBlock.jsx"
}

export const JSONView = Template.bind({})
JSONView.parameters = {
  docs: {
    description: {
      story: "Json View"
    }
  }
}
JSONView.args = {
  lang: "json",
  content: {
    someKey: "some value",
    someOtherKey: "some other value",
    nestedKeys: {
      firstNestedKey: "first nested value"
    }
  }
}

