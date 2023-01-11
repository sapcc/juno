import React from "react"
import { Icon } from "./index.js"

export default {
  title: "Components/Icon",
  component: Icon,
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component:
          "A generic icon component. Accepts text color classes for color. Please note that the 'jn-' prefix for tailwind classes is only necessary within the juno ui design system itself. When using icons in your own applications use the normal tailwing-generated text color classes starting with 'text-'",
      },
    },
  },
}

const Template = (args) => <Icon {...args} />

export const Default = Template.bind({})
Default.args = {
  icon: "help",
  color: "jn-global-text",
}

export const Info_Colored = Template.bind({})
Info_Colored.args = {
  icon: "info",
  color: "jn-text-theme-info",
}

export const Danger_Colored = Template.bind({})
Danger_Colored.args = {
  icon: "danger",
  color: "jn-text-theme-danger",
}

export const Success_Colored = Template.bind({})
Success_Colored.args = {
  icon: "success",
  color: "jn-text-theme-success",
}

export const Warning_Colored = Template.bind({})
Warning_Colored.args = {
  icon: "warning",
  color: "jn-text-theme-warning",
}

export const ThemeColor = Template.bind({})
ThemeColor.args = {
  icon: "help",
  color: "jn-global-text",
}

export const Smaller = Template.bind({})
Smaller.args = {
  ...Default.args,
  icon: "help",
  size: "18",
}

export const Larger = Template.bind({})
Larger.args = {
  ...Default.args,
  icon: "help",
  size: "64",
}

export const IconAsLink = Template.bind({})
IconAsLink.args = {
  ...Default.args,
  href: "#",
  title: "The Icon is a link",
}

export const IconAsButton = Template.bind({})
IconAsButton.args = {
  ...Default.args,
  title: "The Icon is a button",
  onClick: () => {
    console.log("click")
  },
}

export const Account_Circle = Template.bind({})
Account_Circle.args = {
  ...Default.args,
  icon: "accountCircle",
}

export const Add_Circle = Template.bind({})
Add_Circle.args = {
  ...Default.args,
  icon: "addCircle",
}

export const Auto_Awesome_Mosaic = Template.bind({})
Auto_Awesome_Mosaic.args = {
  ...Default.args,
  icon: "autoAwesomeMosaic",
}

export const Auto_Awesome_Motion = Template.bind({})
Auto_Awesome_Motion.args = {
  ...Default.args,
  icon: "autoAwesomeMotion",
}

export const Bolt = Template.bind({})
Bolt.args = {
  ...Default.args,
  icon: "bolt",
}

export const Cancel = Template.bind({})
Cancel.args = {
  ...Default.args,
  icon: "cancel",
}

export const Close = Template.bind({})
Close.args = {
  icon: "close",
}

export const CheckCircle = Template.bind({})
CheckCircle.args = {
  icon: "checkCircle",
}

export const ChevronLeft = Template.bind({})
ChevronLeft.args = {
  icon: "chevronLeft",
}

export const ChevronRight = Template.bind({})
ChevronRight.args = {
  icon: "chevronRight",
}

export const ContentCopy = Template.bind({})
ContentCopy.args = {
  icon: "contentCopy",
}

export const Danger = Template.bind({})
Danger.args = {
  ...Default.args,
  icon: "danger",
}

export const Dangerous = Template.bind({})
Dangerous.args = {
  icon: "dangerous",
}

export const DeleteForever = Template.bind({})
DeleteForever.args = {
  icon: "deleteForever",
}

export const Description = Template.bind({})
Description.args = {
  ...Default.args,
  icon: "description",
}

export const DNS = Template.bind({})
DNS.args = {
  ...Default.args,
  icon: "dns",
}

export const Edit = Template.bind({})
Edit.args = {
  ...Default.args,
  icon: "edit",
}

export const Error = Template.bind({})
Error.args = {
  ...Default.args,
  icon: "dangerous",
}

export const Error_Outline = Template.bind({})
Error_Outline.args = {
  ...Default.args,
  icon: "errorOutline",
}

export const Exit_To_App = Template.bind({})
Exit_To_App.args = {
  ...Default.args,
  icon: "exitToApp",
}

export const Expand_Less = Template.bind({})
Expand_Less.args = {
  ...Default.args,
  icon: "expandLess",
}

export const Expand_More = Template.bind({})
Expand_More.args = {
  ...Default.args,
  icon: "expandMore",
}

export const Filter_Alt = Template.bind({})
Filter_Alt.args = {
  ...Default.args,
  icon: "filterAlt",
}

export const Forum = Template.bind({})
Forum.args = {
  ...Default.args,
  icon: "forum",
}

export const Help = Template.bind({})
Help.args = {
  ...Default.args,
  icon: "help",
}

export const Home = Template.bind({})
Home.args = {
  ...Default.args,
  icon: "home",
}

export const Info = Template.bind({})
Info.args = {
  ...Default.args,
  icon: "info",
}

export const Insert_Comment = Template.bind({})
Insert_Comment.args = {
  ...Default.args,
  icon: "insertComment",
}

export const Manage_Accounts = Template.bind({})
Manage_Accounts.args = {
  ...Default.args,
  icon: "manageAccounts",
}

export const More_Vert = Template.bind({})
More_Vert.args = {
  ...Default.args,
  icon: "moreVert",
}

export const Open_In_Browser = Template.bind({})
Open_In_Browser.args = {
  ...Default.args,
  icon: "openInBrowser",
}

export const Open_In_New = Template.bind({})
Open_In_New.args = {
  ...Default.args,
  icon: "openInNew",
}

export const Place = Template.bind({})
Place.args = {
  ...Default.args,
  icon: "place",
}

export const Search = Template.bind({})
Search.args = {
  ...Default.args,
  icon: "search",
}

export const SeverityLow = Template.bind({})
SeverityLow.args = {
  ...Default.args,
  icon: "severityLow",
}

export const SeverityMedium = Template.bind({})
SeverityMedium.args = {
  ...Default.args,
  icon: "severityMedium",
}

export const SeverityHigh = Template.bind({})
SeverityHigh.args = {
  ...Default.args,
  icon: "severityHigh",
}

export const SeverityCritical = Template.bind({})
SeverityCritical.args = {
  ...Default.args,
  icon: "severityCritical",
}

export const Warning = Template.bind({})
Warning.args = {
  ...Default.args,
  icon: "warning",
}

export const Widgets = Template.bind({})
Widgets.args = {
  ...Default.args,
  icon: "widgets",
}
