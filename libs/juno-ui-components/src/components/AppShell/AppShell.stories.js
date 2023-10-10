import React from "react"

import { AppShell } from "./index.js"
import { PageHeader } from "../PageHeader/index"
import { PageFooter } from "../PageFooter/index"
import { SideNavigation } from "../SideNavigation/"
import { SideNavigationItem } from "../SideNavigationItem/"
import { TopNavigation } from "../TopNavigation/index"
import { TopNavigationItem } from "../TopNavigationItem/index"

export default {
  title: "Layout/AppShell",
  component: AppShell,
  argTypes: {
    pageHeader: {
      control: false
    },
    pageFooter: {
      control: false
    },
    topNavigation: {
      control: false
    },
    sideNavigation: {
      control: false
    },
    children: {
      control: false
    },
  },
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

export const WithSideNavigation = Template.bind({})
WithSideNavigation.args = {
  ...Default.args,
  sideNavigation: <SideNavigation>
                    <SideNavigationItem>Home</SideNavigationItem>
                    <SideNavigationItem>Item 1</SideNavigationItem>
                    <SideNavigationItem>Item 2</SideNavigationItem>
                  </SideNavigation>
}

export const WithTopNavigation = Template.bind({})
WithTopNavigation.parameters = {
  docs: {
    description: {
      story:
        "Responsive shell for your application with top navigation.",
    },
  },
}
WithTopNavigation.args = {
  ...Default.args,
  topNavigation:  <TopNavigation>
                    <TopNavigationItem
                      icon="home"
                      label="Home"
                    />
                    <TopNavigationItem
                      active
                      label="Navigation Item"
                    />
                  </TopNavigation>,
}

export const WithSideAndTopNavigation = Template.bind({})
WithSideAndTopNavigation.args = {
  ...Default.args,
  topNavigation:  <TopNavigation>
                    <TopNavigationItem
                      icon="home"
                      label="Home"
                    />
                    <TopNavigationItem
                      active
                      label="Navigation Item"
                    />
                  </TopNavigation>,
  sideNavigation: <SideNavigation>
                    <SideNavigationItem>Home</SideNavigationItem>
                    <SideNavigationItem>Item 1</SideNavigationItem>
                    <SideNavigationItem>Item 2</SideNavigationItem>
                  </SideNavigation>
}
