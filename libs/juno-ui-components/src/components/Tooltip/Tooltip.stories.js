import React from "react"
import { Tooltip } from "./index.js"

export default {
  title: "WiP/Tooltip",
  component: Tooltip,
  argTypes: {},
}

const Template = (args) => <Tooltip {...args} />

export const Default = Template.bind({})
Default.args = {
  text: "A default tooltip",
}

export const InfoTooltip = Template.bind({})
InfoTooltip.args = {
  variant: "info",
  text: "An Info Tooltip"
}

export const WarningTooltip = Template.bind({})
WarningTooltip.args = {
  variant: "warning",
  text: "A Warning Tooltip"
}

export const ErrorTooltip = Template.bind({})
ErrorTooltip.args = {
  variant: "error",
  text: "An Error Tooltip"
}

export const DangerTooltip = Template.bind({});
DangerTooltip.args = {
  variant: 'danger',
  text: 'A Danger Tooltip.',
};

export const SuccessTooltip = Template.bind({});
SuccessTooltip.args = {
  variant: 'success',
  text: 'A Success Tooltip',
};

export const Disabled = Template.bind({})
Disabled.args = {
  text: "A disabled tooltip",
  disabled: true,
}
