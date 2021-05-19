import React from "react"

import { Modal } from "./index.js"
import { Button } from "../Button/index.js"
import { FloatingLabelInput } from "../Form/index.js"

export default {
  title: "Design System/Modal",
  component: Modal,
  argTypes: {
    title: { control: "text" },
    icon: { control: "text" },
  },
}

const Template = ({ isOpen: initOpenStatus, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(initOpenStatus)

  return (
    <>
      <Button mode="primary" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      <Modal
        isOpen={isOpen}
        close={() => {
          setIsOpen(false)
        }}
        {...props}
      />
    </>
  )
}

export const Simple = () =>
  Template({
    title: "Hello World",
    icon: "attention",
    children: "I am a simple modal view.",
    isOpen: true,
  })

export const CustomContent = () => (
  <Template title="Hello World" icon="attention">
    {({ Body, Buttons, close }) => (
      <>
        <Body className="font-red-100">TEST</Body>
        <Buttons>
          <Button onClick={close}>Close</Button>
        </Buttons>
      </>
    )}
  </Template>
)

export const Login = () => (
  <Template title="Hello World" icon="attention">
    {({ Body, Buttons, close }) => (
      <>
        <Body>
          <form className="space-y-3">
            <FloatingLabelInput label="User" />
            <FloatingLabelInput label="Password" type="password" />
          </form>
        </Body>
        <Buttons>
          <div className="space-x-3">
            <Button mode="primary">Login</Button>
            <Button onClick={close}>Cancel</Button>
          </div>
        </Buttons>
      </>
    )}
  </Template>
)
