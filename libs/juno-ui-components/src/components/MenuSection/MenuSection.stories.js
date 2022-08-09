import React from "react"
import { MenuSection } from "./index.js"


export default {
  title: "WiP/Menu/MenuSection",
  component: MenuSection,
  argTypes: {},
}

const Template = (args) => (<MenuSection {...args} />)

export const Default = Template.bind({})
Default.args = {
	title: "Menu Section"
}