import React from "react"

import { PageHeader } from "./index.js"

export default {
  title: "Design System/Layout/PageHeader",
  component: PageHeader,
  argTypes: {
    gap: {
      options: [0,"px",0.5,1,1.5,2,2.5,3,3.5,4,5,6,7,8,9,10,11,12,14,16,20,24,28,32,36,40,44,48,52,56,60,64,72,80,96],
    }
  },
}

const Template = (args) => <PageHeader {...args}></PageHeader>

export const Simple = Template.bind({})
Simple.parameters = {
  docs: {
    description: { story: 'Default PageHeader.'}
  },
}
Simple.args = {}

export const WithHeading = Template.bind({})
WithHeading.parameters = {
  docs: {
    description: { story: 'PageHeader with Heading.'}
  },
}
WithHeading.args = {
  heading: "My Awesome App"
}

// export const Vertical = Template.bind({})
// Vertical.parameters = {
//   docs: {
//     description: { story: 'Children can also be PageHeadered vertically.'}
//   },
// }
// Vertical.args = {
//   direction: "vertical",
//   children: [<div>1</div>, <div>2</div>, <div>3</div>]
// }

// export const GapHorizontal = Template.bind({})
// GapHorizontal.parameters = {
//   docs: {
//     description: { story: 'By specifying a gap, the child elements will have the specified margin from one another. It is the same for horizontal and vertical PageHeaders.'}
//   },
// }
// GapHorizontal.args = {
//   gap: 4,
//   children: [<div>1</div>, <div>2</div>, <div>3</div>, <div>4</div>, <div>5</div>]
// }

// export const GapVertical = Template.bind({})
// GapVertical.parameters = {
//   docs: {
//     description: { story: 'By specifying a gap, the child elements will have the specified margin from one another. It is the same for horizontal and vertical PageHeaders.'}
//   },
// }
// GapVertical.args = {
//   direction: "vertical",
//   gap: 3,
//   children: [<div>1</div>, <div>2</div>, <div>3</div>]
// }
