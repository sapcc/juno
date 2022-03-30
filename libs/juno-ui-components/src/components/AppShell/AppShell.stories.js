import React from "react"

import { AppShell } from "./index.js"
import { PageHeader } from "../PageHeader/index"
import { PageFooter } from "../PageFooter/index"

export default {
  title: "Layout/AppShell",
  component: AppShell,
  argTypes: {},
}

const Template = (args) => <AppShell {...args}>Content goes here</AppShell>

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: {
      story:
        "Responsive shell for your application with content heading and default header and footer.",
    },
  },
}
Default.args = {
  contentHeading: "Content Heading",
}

export const NoContentHeading = Template.bind({})
NoContentHeading.parameters = {
  docs: {
    description: {
      story: "Responsive shell for your application without content heading.",
    },
  },
}
NoContentHeading.args = {}

export const AppName = Template.bind({})
AppName.parameters = {
  docs: {
    description: {
      story:
        "Responsive shell for your application with provided app name for the header and default footer.",
    },
  },
}
AppName.args = {
  ...Default.args,
  pageHeader: "My App",
}

export const CustomPageHeader = Template.bind({})
CustomPageHeader.parameters = {
  docs: {
    description: {
      story:
        "Responsive shell for your application with custom page header and default footer.",
    },
  },
}
CustomPageHeader.args = {
  ...Default.args,
  pageHeader: <PageHeader heading="My Custom Header" />,
}

export const CustomPageFooter = Template.bind({})
CustomPageFooter.parameters = {
  docs: {
    description: {
      story:
        "Responsive shell for your application with default header and custom footer.",
    },
  },
}
CustomPageFooter.args = {
  ...Default.args,
  pageFooter: <PageFooter>My custom footer</PageFooter>,
}
