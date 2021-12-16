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

export const PrimaryDanger = Template.bind({})
PrimaryDanger.parameters = {
  docs: {
    description: { story: 'Use this button sparingly and only for dangerous or destructive actions'}
  },
}
PrimaryDanger.args = {
  variant: "primary-danger",
  label: "Primary Danger",
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
    description: { story: 'Disable any button by adding `disabled` to it.'}
  },
}
Disabled.args = {
  ...Default.args,
  label: "Default Disabled",
  disabled: true,
}

export const SubduedDisabled = Template.bind({})
SubduedDisabled.parameters = {
  docs: {
    description: { story: 'Disable any button by adding `disabled` to it.'}
  },
}
SubduedDisabled.args = {
  ...Subdued.args,
  label: "Subdued Disabled",
  disabled: true,
}

export const PrimaryDisabled = Template.bind({})
PrimaryDisabled.parameters = {
  docs: {
    description: { story: 'Disable any button by adding `disabled` to it.'}
  },
}
PrimaryDisabled.args = {
  ...Primary.args,
  label: "Primary Disabled",
  disabled: true,
}

export const PrimaryWithIcon = Template.bind({})
PrimaryWithIcon.parameters = {
  docs: {
    story: 'Primary Button with icon'
  }
}
PrimaryWithIcon.args = {
  ...Primary.args,
  label: "Primary with Icon",
  icon: "warning",
}

export const DefaultWithIcon = Template.bind({})
DefaultWithIcon.parameters = {
  docs: {
    story: 'Default Button with icon'
  }
}

DefaultWithIcon.args = {
  ...Default.args,
  label: "Default with Icon",
  icon: "warning",
}



export const LinkAsButton = Template.bind({})
LinkAsButton.parameters = {
  docs: {
    description: { story: 'If you want to render a link that looks like a button pass an "href" to the Button. All other props work the same as for regular buttons'}
  },
}
LinkAsButton.args = {
  ...Primary.args,
  label: "Link as button",
  href: "#link",
}

export const LinkAsButtonWithIcon = Template.bind({})
LinkAsButtonWithIcon.parameters = {
  docs: {
    description: {
      story: 'Link styled as a button including an icon.'
    }
  }
}
LinkAsButtonWithIcon.args = {
  ...Primary.args,
  icon: "warning",
  label: "Link as button with Icon",
  href: "#link"
}