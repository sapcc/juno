import React from "react"
import { Tooltip } from "../Tooltip/index.js"
import { TooltipContent } from "../TooltipContent/index.js"
import { TooltipTrigger } from "./index.js"
import { Icon } from "../Icon/index.js"
import { Button } from "../Button/index.js"

export default {
  title: "WiP/Tooltip/TooltipTrigger",
  component: TooltipTrigger,
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="jn-my-6 jn-flex jn-justify-center">
        <Tooltip initialOpen={true}>
          <Story />
          <TooltipContent>This is a tooltip</TooltipContent>
        </Tooltip>
      </div>
    ),
  ],
}

const Template = ({
  ...args
}) => {

  return (
    <TooltipTrigger {...args}>clickMe</TooltipTrigger>  
  )
}


const TemplateAsChildAnchor = ({
  ...args
}) => {

  return (
      <TooltipTrigger asChild={true} {...args}>
        <Icon />
      </TooltipTrigger>
  )
}

export const Default = Template.bind({})
Default.args = {}


export const AsChildTooltipTrigger = TemplateAsChildAnchor.bind({})
AsChildTooltipTrigger.args = {
}
AsChildTooltipTrigger.parameters = {
  docs: {
    description: { story: "If the asChild option is set on the TooltipTrigger the passed child element is used as the tooltip trigger. This is useful for when you want to use e.g. an Icon or Button as the trigger" },
  },
}
