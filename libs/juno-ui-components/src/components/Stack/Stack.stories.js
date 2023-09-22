import React from "react"
import DummyComponent from "../../dummyComponents/DummyComponent"

import { Stack } from "./index.js"

export default {
  title: "Layout/Stack",
  component: Stack,
  argTypes: {
    children: {
      control: false
    },
    gap: {
      options: [
        "0",
        "px",
        "0.5",
        "1",
        "1.5",
        "2",
        "2.5",
        "3",
        "3.5",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "14",
        "16",
        "20",
        "24",
        "28",
        "32",
        "36",
        "40",
        "44",
        "48",
        "52",
        "56",
        "60",
        "64",
        "72",
        "80",
        "96",
      ],
    },
  },
}

const docuClassnames = (direction) => {
  return `
    bg-theme-background-lvl-3
    ${direction === "vertical" ? "jn-w-full jn-h-80" : "jn-h-24"}
    `
}

const Template = (args) => (
  <Stack className={docuClassnames(args.direction)} {...args}>
    {[...Array(5)].map((_, i) => {
        return (
          <DummyComponent
            key={i}
            label={i}
          />
        )
      })
    }  
  </Stack>
)
const TemplateManyChildren = (args) => (
  <Stack className="jn-bg-theme-background-lvl-3" {...args}>
        {[...Array(15)].map((_, i) => {
        return (
          <DummyComponent
            key={i}
            label={i}
          />
        )
      })
    }  
  </Stack>
)

export const Horizontal = Template.bind({})
Horizontal.parameters = {
  docs: {
    description: { story: "Default stack direction." },
  },
}
Horizontal.args = {}

export const Vertical = Template.bind({})
Vertical.parameters = {
  docs: {
    description: { story: "Children can also be stacked vertically." },
  },
}
Vertical.args = {
  direction: "vertical",
}

export const GapHorizontal = Template.bind({})
GapHorizontal.parameters = {
  docs: {
    description: {
      story:
        "By specifying a gap, the child elements will have the specified margin from one another. It is the same for horizontal and vertical stacks.",
    },
  },
}
GapHorizontal.args = {
  gap: "4",
}

export const GapVertical = Template.bind({})
GapVertical.parameters = {
  docs: {
    description: {
      story:
        "By specifying a gap, the child elements will have the specified margin from one another. It is the same for horizontal and vertical stacks.",
    },
  },
}
GapVertical.args = {
  direction: "vertical",
  gap: "3",
}

export const HorizontalAlignmentCenter = Template.bind({})
HorizontalAlignmentCenter.parameters = {
  docs: {
    description: {
      story:
        "By specifying an alignment you can control how items are aligned vertically in a horizontal Stack. By default they will stretch to take up the full height. Another very useful alignmen ist 'center', this will not stretch the children but make sure they are all aligned around the center axis. This is particularly useful when it doesn't make sense to stretch the items to the full height.",
    },
  },
}
HorizontalAlignmentCenter.args = {
  alignment: "center",
}

export const VerticalAlignmentCenter = Template.bind({})
VerticalAlignmentCenter.parameters = {
  docs: {
    description: {
      story:
        "The same as above is true for vertical Stacks. But in this case the alignment property controls the alignment along the horizontal axis. By default items are stretched to the full width. Using 'center' alignment causes the items to be aligned around the central axis.",
    },
  },
}
VerticalAlignmentCenter.args = {
  direction: "vertical",
  alignment: "center",
}

export const HorizontalAlignmentStart = Template.bind({})
HorizontalAlignmentStart.parameters = {
  docs: {
    description: {
      story:
        "Setting the alignment to 'start' will cause the items to be aligned to the top in a horizontal Stack.",
    },
  },
}
HorizontalAlignmentStart.args = {
  alignment: "start",
}

export const VerticalAlignmentStart = Template.bind({})
VerticalAlignmentStart.parameters = {
  docs: {
    description: {
      story:
        "Setting the alignment to 'start' will cause the items to be aligned to the left in a vertical Stack.",
    },
  },
}
VerticalAlignmentStart.args = {
  direction: "vertical",
  alignment: "start",
}

export const HorizontalDistributionCenter = Template.bind({})
HorizontalDistributionCenter.parameters = {
  docs: {
    description: {
      story:
        "The distribution along the horizontal axis in a horizontal Stack can be controlled via the 'distribution' property. Setting it to 'center' will cause the items to be aligned to the center of the horizontal axis.",
    },
  },
}
HorizontalDistributionCenter.args = {
  distribution: "center",
}

export const VerticalDistributionCenter = Template.bind({})
VerticalDistributionCenter.parameters = {
  docs: {
    description: {
      story:
        "Setting the distribution to 'center' in a vertical Stack will cause the items to be aligned to the center of the vertical axis.",
    },
  },
}
VerticalDistributionCenter.args = {
  direction: "vertical",
  distribution: "center",
}

export const Centered = Template.bind({})
Centered.parameters = {
  docs: {
    description: {
      story:
        "To center a Stack's children both horizontally and vertically at the same time simple set both the alignment and distribution props to 'center'. This works for horizontal and vertical Stacks.",
    },
  },
}
Centered.args = {
  alignment: "center",
  distribution: "center",
}

export const Wrap = TemplateManyChildren.bind({})
Wrap.parameters = {
  docs: {
    description: {
      story:
        "If there are too many children to fit in the available horizontal space, set the 'wrap' property to true to allow children to wrap to the next row (also works for vertical Stacks with restricted height).",
    },
  },
}
Wrap.args = {
  wrap: true,
  gap: "4",
}
