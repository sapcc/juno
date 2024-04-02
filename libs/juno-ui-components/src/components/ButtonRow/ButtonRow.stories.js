import React from "react"
import { ButtonRow } from "./index.js"
import { Button } from "../Button/index.js"

export default {
  title: "Forms/ButtonRow",
  component: ButtonRow,
  argTypes: {
    items: {
      table: {
        disable: true,
      },
    },
    children: {
      control: false,
    },
  },
}

const Template = ({ children, ...args }) => (
  <ButtonRow {...args}>{children}</ButtonRow>
)

export const Default = {
  render: Template,

  args: {
    name: "Default ButtonRow",
    children: [
      <Button label="Cancel" title="Cancel" />,
      <Button label="Save" title="Save" variant="primary" />,
    ],
  },
}
