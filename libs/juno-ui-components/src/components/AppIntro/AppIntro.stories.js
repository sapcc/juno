import React from "react"

import { AppIntro } from "./index.js"

export default {
  title: "Design System/Layout/AppIntro",
  component: AppIntro,
  argTypes: {},
}

const Template = (args) => <AppIntro {...args}>
  Intro text here. Explain what this app is in a short lead text.
  Lorem ipsum dolor sit amet. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est. Lorem ipsum dolor sit amet.
</AppIntro>

export const Intro = Template.bind({})
Intro.parameters = {
  docs: {
    description: {
      story: "App intro section. Typically contains an introductory lead text explaining what the app is about.",
    },
  },
}
Intro.args = {}
