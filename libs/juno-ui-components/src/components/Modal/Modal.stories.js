import React, { useState } from "react"
import { Modal } from "./index.js"
import { ModalFooter } from "../ModalFooter/index.js"
import { Button } from "../Button/index.js"
import { Form } from "../Form/index.js"
import { TextInputRow } from "../TextInputRow"
import { CheckboxRow } from "../CheckboxRow"


const Template = ({closeOnConfirm, ...args}) => {

  const [isOpen, setOpen] = useState(false)
  
  const open = () => { setOpen(true) }
  const close = () => { setOpen(false) }

  return (
    <>
      <Button 
        label="Open Modal" 
        variant="primary" 
        onClick={open} 
      />
      <Modal  
          open={isOpen}
          onCancel={close}
          onConfirm={ closeOnConfirm ? close : null } 
          {...args}
      />
    </>
  )
}
 
export default {
  title: "WiP/Modal/Modal",
  component: Modal,
  argTypes: {},
  parameters: { actions: { argTypesRegex: null } },
}

export const Default = Template.bind({})
Default.args = {
  children: [
    <p>A default modal.</p>
  ]
}

export const LargeWithTitle = Template.bind({})
LargeWithTitle.args = {
  size: "large",
  title: "Large Modal",
  confirmButtonLabel: "OK",
  closeOnConfirm: true, /* Only relevant for storybook, this is not a native prop of the component! */
  children: [
    <p>A large modal with a title</p>
  ]
}

export const NonCloseable = Template.bind({})
NonCloseable.args = {
  title: "Non-Closeable Modal",
  children: "Use only if all else fails. If you need to inform users about something, in 99.9% of cases <Message> is the better choice.",
  closeable: false
}

export const Login = Template.bind({})
Login.args = {
  title: "Log In",
  children:
    <>
      <TextInputRow label="Username" name="username" id="username" />
      <TextInputRow type="password" label="Password" name="password" id="password" />
      <CheckboxRow label="Remember Me" id="remember-me" />
    </>
  ,
  modalFooter:  <ModalFooter confirmButtonLabel="Log In" confirmButtonIcon="accountCircle" cancelButtonLabel="Never Mind" />,
}