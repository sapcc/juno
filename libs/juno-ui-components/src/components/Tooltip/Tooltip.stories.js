import React from "react"
import { Tooltip } from "./index.js"
import { TooltipContent } from "../TooltipContent/index.js"
import { TooltipTrigger } from "../TooltipTrigger/index.js"
import { Icon } from "../Icon/index.js"
import { Button } from "../Button/index.js"

export default {
  title: "Components/Tooltip/Tooltip",
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

const Template = ({
  placement,
  variant,
  initialOpen,
  open,
  triggerEvent,
  disabled,
  text,
  triggerText,
  ...args
}) => {

  return (
    <Tooltip initialOpen={initialOpen} placement={placement} variant={variant} open={open} triggerEvent={triggerEvent} disabled={disabled}>
      <TooltipTrigger>{triggerText}</TooltipTrigger>
      <TooltipContent {...args}>{text}</TooltipContent>
    </Tooltip>
  )
}

const TemplateAsChildAnchor = ({
  initialOpen,
  placement,
  variant,
  open,
  triggerEvent,
  disabled,
  text,
  ...args
}) => {

  return (
    <Tooltip initialOpen={initialOpen} placement={placement} variant={variant} open={open} triggerEvent={triggerEvent} disabled={disabled}>
      <TooltipTrigger asChild={true}>
        <Icon />
      </TooltipTrigger>
      <TooltipContent {...args}>{text}</TooltipContent>
    </Tooltip>
  )
}

const TemplateButtonAsChildAnchor = ({
  initialOpen,
  placement,
  variant,
  open,
  triggerEvent,
  disabled,
  text,
  ...args
}) => {

  return (
    <Tooltip initialOpen={initialOpen} placement={placement} variant={variant} open={open} triggerEvent={triggerEvent} disabled={disabled}>
      <TooltipTrigger asChild={true}>
        <Button label="hover me" />
      </TooltipTrigger>
      <TooltipContent {...args}>{text}</TooltipContent>
    </Tooltip>
  )
}

export const Default = Template.bind({})
Default.args = {
  text: "A default tooltip",
  triggerText: "click me",
  initialOpen: true
}

export const Hover = Template.bind({})
Hover.args = {
  text: "A default tooltip opened on hover",
  triggerText: "hover me",
  triggerEvent: "hover"
}


export const AsChildTooltipTrigger = TemplateAsChildAnchor.bind({})
AsChildTooltipTrigger.args = {
  text: "A Tooltip with asChild Icon trigger",
}
AsChildTooltipTrigger.parameters = {
  docs: {
    description: { story: "If the asChild option is set on the TooltipTrigger the passed child element is used as the tooltip trigger. This is useful for when you want to use e.g. an Icon or Button as the trigger" },
  },
}

export const ButtonAsChildTooltipTrigger = TemplateButtonAsChildAnchor.bind({})
ButtonAsChildTooltipTrigger.args = {
  text: "A Tooltip with asChild Button trigger",
  triggerEvent: "hover"
}
ButtonAsChildTooltipTrigger.parameters = {
  docs: {
    description: { story: "If the asChild option is set on the TooltipTrigger the passed child element is used as the tooltip trigger. This is useful for when you want to use e.g. an Icon or Button as the trigger" },
  },
}

export const InfoTooltip = TemplateAsChildAnchor.bind({})
InfoTooltip.args = {
  variant: "info",
  text: "An Info Tooltip",
  open: true,
}

export const WarningTooltip = TemplateAsChildAnchor.bind({})
WarningTooltip.args = {
  variant: "warning",
  text: "A Warning Tooltip",
  open: true,
}

export const ErrorTooltip = TemplateAsChildAnchor.bind({})
ErrorTooltip.args = {
  variant: "error",
  text: "An Error Tooltip",
  open: true,
}

export const DangerTooltip = TemplateAsChildAnchor.bind({})
DangerTooltip.args = {
  variant: "danger",
  text: "A Danger Tooltip.",
  open: true,
}

export const SuccessTooltip = TemplateAsChildAnchor.bind({})
SuccessTooltip.args = {
  variant: "success",
  text: "A Success Tooltip",
  open: true,
}

export const Disabled = TemplateAsChildAnchor.bind({})
Disabled.args = {
  text: "A disabled tooltip",
  disabled: true,
}
