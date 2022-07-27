import React from "react"
import { Button } from "./index"
import { knownIcons } from "../Icon/Icon.component.js"
import { ContentArea } from "../ContentArea/index"
import { Container } from "../Container/index"

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: ['default', ...knownIcons],
      }
    },
    variant: {
      control: {
        type: 'select',
        options: [ 'default', 'primary', 'primary-danger', 'subdued' ],
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          "The basic button component. Use this for onClick interactions.",
      },
    },
  },
  decorators: [
    (story) => (
      <ContentArea>
        <Container>{story()}</Container>
      </ContentArea>
    ),
  ],
}

const Template = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.parameters = {
  docs: {
    description: {
      story:
        "Only use the primary button **maximum once per page** for the preferred user action",
    },
  },
}
Primary.args = {
  variant: "primary",
  label: "Primary",
}

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: {
      story:
        "The default button is a neutral button that can be used multiple times on a page",
    },
  },
}
Default.args = {
  label: "Default",
}

export const Subdued = Template.bind({})
Subdued.parameters = {
  docs: {
    description: {
      story:
        "A subdued button variant, mostly used to create contrast to an primary button concerning the same usage context, or when multiple default buttons would be too much.",
    },
  },
}
Subdued.args = {
  variant: "subdued",
  label: "Subdued",
}

export const PrimaryDanger = Template.bind({})
PrimaryDanger.parameters = {
  docs: {
    description: {
      story:
        "Use this button sparingly and only for dangerous or destructive actions",
    },
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
    description: { story: "Disable any button by adding `disabled` to it." },
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
    description: { story: "Disable any button by adding `disabled` to it." },
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
    description: { story: "Disable any button by adding `disabled` to it." },
  },
}
PrimaryDisabled.args = {
  ...Primary.args,
  label: "Primary Disabled",
  disabled: true,
}

export const PrimaryDangerDisabled = Template.bind({})
PrimaryDangerDisabled.parameters = {
  docs: {
    description: {
      story: "Disable a Primary Danger button by adding `disabled` to it.",
    },
  },
}
PrimaryDangerDisabled.args = {
  ...PrimaryDanger.args,
  disabled: true,
}

export const DefaultWithIcon = Template.bind({})
DefaultWithIcon.parameters = {
  docs: {
    story: "Default Button with icon",
  },
}
DefaultWithIcon.args = {
  ...Default.args,
  label: "Default with Icon",
  icon: "warning",
}

export const SubduedWithIcon = Template.bind({})
SubduedWithIcon.parameters = {
  docs: {
    description: {
      story: "Subdued Button with Icon",
    },
  },
}
SubduedWithIcon.args = {
  ...Subdued.args,
  icon: "warning",
  label: "Subdued with Icon",
}

export const SmallWithIcon = Template.bind({})
SmallWithIcon.parameters = {
  docs: {
    description: {
      story: "Small Button with Icon",
    },
  },
}
SmallWithIcon.args = {
  ...Small.args,
  icon: "warning",
}

export const LargeWithIcon = Template.bind({})
LargeWithIcon.parameters = {
  docs: {
    description: {
      story: "Large Button with Icon",
    },
  },
}
LargeWithIcon.args = {
  ...Large.args,
  icon: "warning",
}

export const LinkAsButton = Template.bind({})
LinkAsButton.parameters = {
  docs: {
    description: {
      story:
        'If you want to render a link that looks like a button pass an "href" to the Button. All other props work the same as for regular buttons',
    },
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
      story: "Link styled as a button including an icon.",
    },
  },
}
LinkAsButtonWithIcon.args = {
  ...Primary.args,
  icon: "warning",
  label: "Link as button with Icon",
  href: "#",
}

export const DefaultButtonInProgress = Template.bind({})
DefaultButtonInProgress.parameters = {
  docs: {
    description: {
      story: "Default Button with an action in progress",
    },
  },
}
DefaultButtonInProgress.args = {
  ...Default.args,
  progress: true,
}

export const IconButtonInProgress = Template.bind({})
IconButtonInProgress.parameters = {
  docs: {
    description: {
      story: "Icon Button with an action in progress",
    },
  },
}
IconButtonInProgress.args = {
  ...Default.args,
  label: "Default with Icon",
  icon: "warning",
  progress: true,
}

// with progress label
export const DefaultButtonInProgressWithProgressLabel = Template.bind({})
DefaultButtonInProgressWithProgressLabel.parameters = {
  docs: {
    description: {
      story:
        "Default Button with an action in oprogress and an alternate label while in progress",
    },
  },
}
DefaultButtonInProgressWithProgressLabel.args = {
  ...Default.args,
  label: "Default with Icon",
  icon: "warning",
  progress: true,
  progressLabel: "In Progress…",
}

// subdued in progress
export const SubduedButtonInProgress = Template.bind({})
SubduedButtonInProgress.parameters = {
  docs: {
    description: {
      story: "Subdued Button with an action in progress",
    },
  },
}
SubduedButtonInProgress.args = {
  ...Subdued.args,
  progress: true,
  progressLabel: "Subdued Button in Progress…",
}

// primary in progress
export const PrimaryButtonWithIconInProgress = Template.bind({})
PrimaryButtonWithIconInProgress.parameters = {
  docs: {
    description: {
      story: "Primary Button with action in progress",
    },
  },
}
PrimaryButtonWithIconInProgress.args = {
  ...Primary.args,
  progress: true,
  progressLabel: "Primary Button in Progress…",
}

// primary danger in progress
export const PrimaryDangerButtonInProgress = Template.bind({})
PrimaryDangerButtonInProgress.parameters = {
  docs: {
    description: {
      story: "Primary Danger Button with action in progress",
    },
  },
}
PrimaryDangerButtonInProgress.args = {
  ...PrimaryDanger.args,
  progress: true,
  progressLabel: "Primary Danger Button in Progress…",
}

// Link as button in progress
export const LinkAsButtonInProgress = Template.bind({})
LinkAsButtonInProgress.parameters = {
  docs: {
    description: {
      story:
        "Link as button with action in progress. Should hardly ever be used, just to check consistent styling.",
    },
  },
}
LinkAsButtonInProgress.args = {
  ...LinkAsButton.args,
  progress: true,
  progressLabel: "Link as button in Progress…",
}

// link as button with icon in progress
export const LinkAsButtonWithIconInProgress = Template.bind({})
LinkAsButtonWithIconInProgress.parameters = {
  docs: {
    description: {
      story:
        "Link as button with an icon and action in progress. Should hardly ever be used, just to check consistent styling.",
    },
  },
}
LinkAsButtonWithIconInProgress.args = {
  ...LinkAsButtonWithIcon.args,
  progress: true,
  progressLabel: "Link as button with Icon in Progress…",
}
// disabled in progress -> always disabled in progress? User needs to set disabled himself?
export const DisabledInProgress = Template.bind({})
DisabledInProgress.parameters = {
  docs: {
    description: {
      story: "Disabled Default Button in Progress",
    },
  },
}
DisabledInProgress.args = {
  ...Disabled.args,
  progress: true,
}

// disabled primary in progress
export const PrimaryDisabledInProgress = Template.bind({})
PrimaryDisabledInProgress.parameters = {
  docs: {
    description: {
      story: "Disabled Primnary Button with action in progress",
    },
  },
}
PrimaryDisabledInProgress.args = {
  ...PrimaryDisabled.args,
  progress: true,
  progressLabel: "Disabled Primary Button in Progress…",
}
// disabled primary danger in progress
export const PrimaryDangerDisabledInProgress = Template.bind({})
PrimaryDangerDisabledInProgress.parameters = {
  docs: {
    description: {
      story: "Disabled Primary Danger Button in Progress…",
    },
  },
}
PrimaryDangerDisabledInProgress.args = {
  ...PrimaryDangerDisabled.args,
  progress: true,
  progressLabel: "Disabled Primary Danger Button in Progress…",
}

// small button in progress
export const SmallInProgress = Template.bind({})
SmallInProgress.parameters = {
  docs: {
    description: {
      story: "Small Button in Progress",
    },
  },
}
SmallInProgress.args = {
  ...Small.args,
  progress: true,
  progressLabel: "Small in Progress…",
}

// large button in progress
export const LargeInProgress = Template.bind({})
LargeInProgress.parameters = {
  docs: {
    description: {
      story: "Large Button in Progress",
    },
  },
}
LargeInProgress.args = {
  ...Large.args,
  progress: true,
  progressLabel: "Large in Progress…",
}
