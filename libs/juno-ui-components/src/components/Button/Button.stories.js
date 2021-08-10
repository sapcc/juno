import React from "react"

import { Button } from "./index"

export default {
  title: "Design System/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'The basic button component. Use this for onClick interactions.',
      },
    },
  },
}

const Template = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.parameters = {
  docs: {
    description: { story: 'Only use the primary button **maximum once per page** for the preferred user action'}
  },
}
Primary.args = {
  variant: "primary",
  label: "Primary",
}

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: { story: 'The default button is a neutral button that can be used multiple times on a page'}
  },
}
Default.args = {
  label: "Default",
}

export const Subdued = Template.bind({})
Subdued.parameters = {
  docs: {
    description: {
      story: 'A subdued button variant, mostly used to create contrast to an primary button concerning the same usage context, or when multiple default buttons would be too much.'
    }
  }
}
Subdued.args = {
  variant: "subdued",
  label: "Subdued",
}

export const Danger = Template.bind({})
Danger.parameters = {
  docs: {
    description: { story: 'Use this button sparingly and only for dangerous or destructive actions'}
  },
}
Danger.args = {
  variant: "danger",
  label: "Danger",
}

export const Large = Template.bind({})
Large.args = {
  size: "large",
  label: "Large",
}

export const DefaultSize = Template.bind({})
DefaultSize.args = {
  label: "Default",
}

export const Small = Template.bind({})
Small.args = {
  size: "small",
  label: "Small",
}

export const Disabled = Template.bind({})
Disabled.parameters = {
  docs: {
    description: { story: 'Disable any button by adding `disabled` to it. Example: Disabled Primary button.'}
  },
}
Disabled.args = {
  ...Primary.args,
  label: "Primary Disabled",
  disabled: true,
}