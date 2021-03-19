import React from "react"

import { Modal } from "../components/Modal/index.js"
import { Button } from "../components/Button/index.js"

export default {
  title: "Example/Modal",
  component: Modal,
  argTypes: {
    title: { control: "text" },
    icon: { control: "text" },
  },
}

const Template = (args) => {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <>
      <Button mode="primary" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} {...args} />
    </>
  )
}

export const Simple = Template.bind({})
Simple.args = {
  title: "Hello World",
  icon: "attention",
  children: "I am a simple modal view.",
}
