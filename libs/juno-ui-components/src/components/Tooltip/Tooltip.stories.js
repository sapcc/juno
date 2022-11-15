import React from "react"
import { Tooltip } from "./index.js"
import { Icon } from "../Icon/index.js"
import { Button } from "../Button/index.js"

export default {
  title: "WiP/Tooltip",
  component: Tooltip,
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="jn-my-6 jn-flex jn-justify-center">
        <Story />
      </div>
    ),
  ],
}

const Template = (args) => <Tooltip triggerElement={<Icon></Icon>}{...args} />

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

export const ButtonTooltip = Template.bind({})
ButtonTooltip.args = {
  text: "Tooltip for a button",
  triggerElement: <Button>Click me</Button>
}
