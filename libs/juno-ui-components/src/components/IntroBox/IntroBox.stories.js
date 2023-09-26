import React from "react"
import { IntroBox } from "./index.js"
import heroImage from "../../img/app_bg_example.svg?url"

export default {
  title: "Components/IntroBox",
  component: IntroBox,
  argTypes: {
    children: {
      control: false
    },
  },
}

const Template = (args) => <IntroBox {...args} />

export const Default = Template.bind({})
Default.args = {
  text: "Default IntroBox.",
}

export const WithTitle = Template.bind({})
WithTitle.args = {
  title: "IntroBox",
  text: "IntroBox with title.",
}

export const Hero = Template.bind({})
Hero.args = {
  title: "IntroBox",
  text: "Hero IntroBox has a larger font size and more padding",
  variant: "hero",
}

export const HeroWithBGImage = Template.bind({})
HeroWithBGImage.args = {
  title: "IntroBox",
  text: "Hero IntroBox with background image. Background image must be referenced as a css bg image string. Import svg images with query param ?url.",
  variant: "hero",
  heroImage: `url(${heroImage})`
}
