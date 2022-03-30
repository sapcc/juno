import React from "react"
import { SearchInput } from "./index.js"

export default {
  title: "Components/SearchInput",
  component: SearchInput,
  argTypes: {},
}

const Template = (args) => <SearchInput {...args} />

export const Default = Template.bind({})
Default.args = {}

export const Hero = Template.bind({})
Hero.args = {
  variant: "hero",
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}
