import React from "react"
import { CodeBlock } from "./index.js"
import { Tabs } from "../Tabs/index.js"
import { TabList } from "../TabList/index.js"
import { Tab } from "../Tab/index.js"
import { Default as TabStory } from "../Tab/Tab.stories.js"
import { TabPanel } from "../TabPanel/index.js"

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

const TabsTemplate = ({tabs, codeBlocks, ...args}) => (
  <Tabs variant="codeblocks">
    <TabList>
      {tabs.map((tab, t) => (
        <Tab {...tab} key={`t-${t}`} ></Tab>
      ))}
    </TabList>
    {codeBlocks.map((codeBlock, c) => (
      <TabPanel>
        <CodeBlock {...codeBlock} key={`c-${c}`}/>
      </TabPanel>
    ))}
  </Tabs>
)

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
      story: "Code Block with Heading WIP"
    }
  }
}
DefaultWithHeading.args = {
  children: `<CodeBlock>
  <p>some code here</p>
</CodeBlock>`,
  heading: "CodeBlock.jsx"
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
  heading: "Json CodeBlock",
  content: {
    someKey: "some value",
    someOtherKey: "some other value",
    nestedKeys: {
      firstNestedKey: "first nested value"
    }
  }
}

export const CodeBlocksWithTabs = TabsTemplate.bind({})
CodeBlocksWithTabs.parameters = {
  docs: {
    description: {
      story: "Tabbed CodeBlocks can be composed using the `<Tabs>`, `<Tab>`, `<TabList>`, and `<TabPanel>` components. Make sure to pass `variant='codeblocks' to the `<Tabs>` component."
    }
  }
}
CodeBlocksWithTabs.args = {
  tabs: [
    { ...TabStory.args, children: "UserData.jsx"},
    { ...TabStory.args, children: "data.json"},
    { ...TabStory.args, children: "UserData.html"},
  ],
  codeBlocks: [
    { content: "<UserData name='User' data={data.json} />"},
    { lang:"json", content: {firstName: "Joan", lastName: "Clarke", placeOfBirth: "West Norwood, London, England"}},
    { content: `<div>
  <dl>
    <dt>First Name</dt>
    <dd>Joan</dd>
    <dt>Last Name</dt>
    <dd>Clarke</dd>
    <dt>Place of Birth</dt>
    <dd>West Norwood, London, England</dd>
  </dl>
</div>`},
  ]
}


