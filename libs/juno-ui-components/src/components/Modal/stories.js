import React from "react"

import { Modal } from "./index.js"
import { Button } from "../Button/index.js"

export default {
  title: "Design System/Components/Modal",
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
      <Modal
        isolate={false}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        {...args}
      />
    </>
  )
}

export const Simple = Template.bind({})
Simple.args = {
  title: "Hello World",
  icon: "attention",
  children: "I am a simple modal view.",
}

export const CustomContent = Template.bind({})
CustomContent.args = {
  title: "Hello World",
  icon: "attention",
  children: ({ Body, Buttons }) => (
    <>
      <Body>TEST</Body>
      <Buttons>
        <Button>Close</Button>
      </Buttons>
    </>
  ),
}
