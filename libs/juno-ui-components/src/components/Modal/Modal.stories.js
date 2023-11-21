import React, { useState } from "react"
import { Modal } from "./Modal.component"
import { ModalFooter } from "../ModalFooter/index"
import { Button } from "../Button/index"
import { ButtonRow } from "../ButtonRow/index"
import { TextInputRow } from "../TextInputRow/index"
import { CheckboxRow } from "../CheckboxRow/index"
import { Icon } from "../Icon/index"
import { PortalProvider } from "../PortalProvider/index"
import { Select } from "../Select/index"
import { SelectOption } from "../SelectOption/index"
import { ComboBox } from "../ComboBox/index"
import { ComboBoxOption } from "../ComboBoxOption/index"


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
  argTypes: {
    children: {
      control: false
    },
    modalFooter: {
      control: false
    },
  },
  parameters: { actions: { argTypesRegex: null } },
  decorators: [
    (story) => (
      <PortalProvider>
        {story()}
      </PortalProvider>
    ),
  ],
}

export const Default = Template.bind({})
Default.args = {
  children: [
    <p>A default modal.</p>
  ],
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

export const CustomModalFooter = Template.bind({})
CustomModalFooter.args = {
  title: "Modal with Custom ModalFooter",
  size: "large",
  children: 
    <p>
      This Modal renders a custom footer with three buttons and a custom hint.
    </p>
  ,
  modalFooter: 
    <ModalFooter className="jn-justify-between jn-items-center">
      <span><Icon icon="info" className="jn-mr-1" />Have some custom content</span>
      <ButtonRow>
        <Button variant="primary-danger">Button 1</Button>
        <Button variant="primary">Button 2</Button>
        <Button>Button 3</Button>
      </ButtonRow>
    </ModalFooter>
}

export const TestSelectInModal = Template.bind({})
TestSelectInModal.args = {
  title: "Modal with Select inside",
  size: "small",
  children: 
    <>
      <Select>
        <SelectOption value="1" label="Option 1" key="o-1"/>
        <SelectOption value="2" label="Option 2" key="o-2"/>
        <SelectOption value="3" label="Option 3" key="o-3"/>
      </Select>
    </>,
}

export const TestComboBoxInModal = Template.bind({})
TestComboBoxInModal.args = {
  title: "Modal with CombBox inside",
  size: "small",
  children: 
  <>
    <ComboBox>
      <ComboBoxOption value="Rhubarb" key="1">
        Rhubarb
      </ComboBoxOption>
      <ComboBoxOption value="Carrots" key="2">
        Carrots
      </ComboBoxOption>
      <ComboBoxOption value="Spinach" key="3">
        Spinach
      </ComboBoxOption>
      <ComboBoxOption value="Tomatoes" key="4">
        Tomatoes
      </ComboBoxOption>
    </ComboBox>
  </>,
}
