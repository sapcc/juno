import React from "react"
import { Icon } from "./index.js"

export default {
  title: "Design System/Icon",
  component: Icon,
  argTypes: {},
  parameters: {
    docs: {
      description: {
      component: 'A generic icon component. Accepts any string as a color for now.',
      },
    },
  },
}

const Template = (args) => <Icon {...args} />

export const Default = Template.bind({})
Default.args = {
	icon: "help"
}

export const Info_Colored = Template.bind({})
Info_Colored.args = {
  icon: "info",
  color: "text-info",
}

export const Danger_Colored = Template.bind({})
Danger_Colored.args = {
  icon: "danger",
  color: "text-danger",
}

export const Success_Colored = Template.bind({})
Success_Colored.args = {
  icon: "success",
  color: "text-success",
}

export const Warning_Colored = Template.bind({})
Warning_Colored.args = {
  icon: "warning",
  color: "text-warning",
}

export const ThemeColor = Template.bind({})
ThemeColor.args = {
  icon: "help",
  color: "global-text",
}

export const Smaller = Template.bind({})
Smaller.args = {
  icon: "help",
  size: "18",
}

export const Larger = Template.bind({})
Larger.args = {
  icon: "help",
  size: "64",
}

export const Auto_Awesome_Mosaic = Template.bind({})
Auto_Awesome_Mosaic.args = {
  icon: "autoAwesomeMosaic"
}

export const Auto_Awesome_Motion = Template.bind({})
Auto_Awesome_Motion.args = {
  icon: "autoAwesomeMotion"
}

export const Cancel = Template.bind({})
Cancel.args = {
  icon: "cancel"
}

export const Close = Template.bind({})
Close.args = {
  icon: "close"
}

export const Danger = Template.bind({})
Danger.args = {
  icon: "danger"
}

export const Dangerous = Template.bind({})
Dangerous.args = {
  icon: "dangerous"
}

export const Description = Template.bind({})
Description.args = {
  icon: "description"
}

export const Error = Template.bind({})
Error.args = {
  icon: "dangerous"
}

export const Exit_To_App = Template.bind({})
Exit_To_App.args = {
  icon: "exitToApp"
}

export const Expand_Less = Template.bind({})
Expand_Less.args = {
  icon: "expandLess"
}

export const Expand_More = Template.bind({})
Expand_More.args = {
  icon: "expandMore"
}

export const Forum = Template.bind({})
Forum.args = {
  icon: "forum"
}

export const Help = Template.bind({})
Help.args = {
  icon: "help"
}

export const Info = Template.bind({})
Info.args = {
  icon: "info"
}

export const Insert_Comment = Template.bind({})
Insert_Comment.args = {
  icon: "insertComment"
}

export const Manage_Accounts = Template.bind({})
Manage_Accounts.args = {
  icon: "manageAccounts"
}

export const Open_In_Browser = Template.bind({})
Open_In_Browser.args = {
  icon: "openInBrowser"
}

export const Open_In_New = Template.bind({})
Open_In_New.args = {
  icon: "openInNew"
}

export const Place = Template.bind({})
Place.args = {
  icon: "place"
}

export const Search = Template.bind({})
Search.args = {
  icon: "search"
}

export const Warning = Template.bind({})
Warning.args = {
  icon: "warning"
}
