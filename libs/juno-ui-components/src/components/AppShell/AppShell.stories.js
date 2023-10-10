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
// TODO: remove
Default.args = {

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
  pageFooter: <PageFooter>My custom footer</PageFooter>,
}

export const WithSideNavigation = Template.bind({})
WithSideNavigation.parameters = {
  docs: {
    description: {
      story:
        "Responsive shell for your application with a side navigation.",
    },
  },
}
WithSideNavigation.args = {
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
WithSideAndTopNavigation.parameters = {
  docs: {
    description: {
      story:
        "Responsive shell for your application with both a top navigation and side navigation.",
    },
  },
}
WithSideAndTopNavigation.args = {
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
