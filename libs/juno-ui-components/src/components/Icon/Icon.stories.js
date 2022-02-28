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
	icon: "help",
  color: "global-text",
}

export const Info_Colored = Template.bind({})
Info_Colored.args = {
  icon: "info",
  color: "text-theme-info",
}

export const Danger_Colored = Template.bind({})
Danger_Colored.args = {
  icon: "danger",
  color: "text-theme-danger",
}

export const Success_Colored = Template.bind({})
Success_Colored.args = {
  icon: "success",
  color: "text-theme-success",
}

export const Warning_Colored = Template.bind({})
Warning_Colored.args = {
  icon: "warning",
  color: "text-theme-warning",
}

export const ThemeColor = Template.bind({})
ThemeColor.args = {
  icon: "help",
  color: "global-text",
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

export const Add_Circle = Template.bind({})
Add_Circle.args = {
  ...Default.args,
  icon: "addCircle"
}

export const Auto_Awesome_Mosaic = Template.bind({})
Auto_Awesome_Mosaic.args = {
  ...Default.args,
  icon: "autoAwesomeMosaic"
}

export const Auto_Awesome_Motion = Template.bind({})
Auto_Awesome_Motion.args = {
  ...Default.args,
  icon: "autoAwesomeMotion"
}

export const Cancel = Template.bind({})
Cancel.args = {
  ...Default.args,
  icon: "cancel"
}

export const Close = Template.bind({})
Close.args = {
  icon: "close"
}

export const Danger = Template.bind({})
Danger.args = {
  ...Default.args,
  icon: "danger"
}

export const Dangerous = Template.bind({})
Dangerous.args = {
  icon: "dangerous"
}

export const DeleteForever = Template.bind({})
DeleteForever.args = {
  icon: "deleteForever"
}

export const Description = Template.bind({})
Description.args = {
  ...Default.args,
  icon: "description"
}

export const Error = Template.bind({})
Error.args = {
  ...Default.args,
  icon: "dangerous"
}

export const Exit_To_App = Template.bind({})
Exit_To_App.args = {
  ...Default.args,
  icon: "exitToApp"
}

export const Expand_Less = Template.bind({})
Expand_Less.args = {
  ...Default.args,
  icon: "expandLess"
}

export const Expand_More = Template.bind({})
Expand_More.args = {
  ...Default.args,
  icon: "expandMore"
}

export const Forum = Template.bind({})
Forum.args = {
  ...Default.args,
  icon: "forum"
}

export const Help = Template.bind({})
Help.args = {
  ...Default.args,
  icon: "help"
}

export const Info = Template.bind({})
Info.args = {
  ...Default.args,
  icon: "info"
}

export const Insert_Comment = Template.bind({})
Insert_Comment.args = {
  ...Default.args,
  icon: "insertComment"
}

export const Manage_Accounts = Template.bind({})
Manage_Accounts.args = {
  ...Default.args,
  icon: "manageAccounts"
}

export const Open_In_Browser = Template.bind({})
Open_In_Browser.args = {
  ...Default.args,
  icon: "openInBrowser"
}

export const Open_In_New = Template.bind({})
Open_In_New.args = {
  ...Default.args,
  icon: "openInNew"
}

export const Place = Template.bind({})
Place.args = {
  ...Default.args,
  icon: "place"
}

export const Search = Template.bind({})
Search.args = {
  ...Default.args,
  icon: "search"
}

export const Warning = Template.bind({})
Warning.args = {
  ...Default.args,
  icon: "warning"
}
